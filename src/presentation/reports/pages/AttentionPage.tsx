import { useMemo, useState } from "react";
import { useHandleError } from "../../../hooks";
import { DatePicker } from "../../components/calendar/DatePicker";
import { getDate } from "../../../helper/functions";
import { ReportService } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/Loader";
import { Button } from "flowbite-react";
import { Table } from "../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../../../interfaces";

export const AttentionPage = () => {

    const columns = useMemo<ColumnDef<Event<string>>[]>(() => [
        { accessorKey: 'DescripcionAlarm', header: 'Alarm description' },
        { accessorKey: 'CodigoCte', header: 'Client' },
        { accessorKey: 'CodigoAlarma', header: 'Alarm' },
        { accessorKey: 'FechaOriginal', header: 'Date' },
        { accessorKey: 'Hora', header: 'Hour' },
        { accessorKey: 'FechaPrimeraToma', header: 'Firts date take' },
        { accessorKey: 'HoraPrimeraToma', header: 'Firts hour take' },
        { accessorKey: 'Minutes', header: 'Minutes' },
        { accessorKey: 'ClaveMonitorista', header: 'Operator' },
    ], []);

    const { showError } = useHandleError();
    const [start, setStart] = useState(getDate());
    const [end, setEnd] = useState(getDate());

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['attention'],
        queryFn: () => ReportService.attention({ start: `${start.date.year}-${String(start.date.month).padStart(2, '0')}-${String(start.date.day).padStart(2, '0')}`, end: `${end.date.year}-${String(end.date.month).padStart(2, '0')}-${String(end.date.day).padStart(2, '0')}` }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (
        <article className="container-page-report">
            <header>
                <div className="flex justify-between px-4">
                    <h1 className="text-4xl font-semibold">Alarm attention</h1>
                    <span className="flex gap-2 items-center">
                        <div className="flex gap-2">
                            <DatePicker date={start} onChange={setStart} label="Start" />
                            <DatePicker date={end} onChange={setEnd} label="End" />
                        </div>
                        <div className="flex gap-2 items-center" >
                            <Button isProcessing={isFetching} onClick={() => refetch()} children="Refresh" />
                        </div>
                    </span>
                </div>
            </header>
            {
                (isLoading)
                    ? <Loader text="Loading ..." />
                    :
                    <section className="content-data" style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
                        <div className="flex-1">
                            <Table {...{
                                key: "attention",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.events ?? [],
                                useInternalPagination: true,
                                header: { title: "Alarm attention" }
                            }} />
                        </div>
                    </section>
            }

        </article >
    )
};