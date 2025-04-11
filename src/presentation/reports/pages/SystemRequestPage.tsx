import { useMemo, useState } from "react";
import { DatePicker } from "../../components/calendar/DatePicker";
import { getDate } from "../../../helper/functions";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../../services";
import { AlarmApplicationSystem, Event } from "../../../interfaces";
import { useHandleError } from "../../../hooks";
import { Loader } from "../../components/Loader";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../components/Table";
import { Button } from "flowbite-react";

export const SystemRequestPage = () => {
    const { showError } = useHandleError();
    const [start, setStart] = useState(getDate());
    const [end, setEnd] = useState(getDate());

    const columns = useMemo<ColumnDef<Event<AlarmApplicationSystem>>[]>(() => [
        { accessorFn: row => `${row.FechaOriginal}  ${row.Hora}`, id: 'Date Hour', },
        { accessorKey: 'CodigoAlarma', header: 'Alarm' },
        { accessorKey: 'CodigoAbonado', header: "Subscriber" },
        { accessorKey: 'CodigoCte', header: "Client" },
    ], []);

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['SrsSta'],
        queryFn: () => ReportService.applicationSystem({ start: `${start.date.year}-${String(start.date.month).padStart(2, '0')}-${String(start.date.day).padStart(2, '0')}`, end: `${end.date.year}-${String(end.date.month).padStart(2, '0')}-${String(end.date.day).padStart(2, '0')}` }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (
        <article className="container-page-report">
            <header>
                <div className="flex justify-between px-4">
                    <h1 className="text-4xl font-semibold" >System request</h1>
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
                    <section className="flex flex-col gap-4 mt-4 lg:flex-row flex-wrap">
                        <div className="flex-1">
                            <Table {...{
                                key: "with-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.srs ?? [],
                                useInternalPagination: true,
                                header: { title: "Srs" }
                            }} />
                        </div>
                        <div className="flex-1">
                            <Table {...{
                                key: "with-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.sta ?? [],
                                useInternalPagination: true,
                                header: { title: "Sta" }
                            }} />
                        </div>
                        <div className="flex-1">
                            <Table {...{
                                key: "with-panel",
                                columns,
                                maxHeight: 500,
                                shadow: true,
                                data: data?.pendingSrs ?? [],
                                useInternalPagination: true,
                                header: { title: "Pending srs" }
                            }} />
                        </div>

                    </section>
            }
        </article >
    )
};