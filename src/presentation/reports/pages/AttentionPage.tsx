import { useState } from "react";
import { useHandleError } from "../../../hooks";
// import { DataTable } from "../../components/DataTable";
import { DatePicker } from "../../components/calendar/DatePicker";
// import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { getDate } from "../../../helper/functions";
import { ReportService } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/Loader";
import { Button } from "flowbite-react";

// const Keys: Array<Key<Event<string>>> = [
//     { wildcard: '--', key: 'DescripcionAlarm', title: 'Alarm description', style: { textAlign: 'center' } },
//     { wildcard: '--', key: 'CodigoCte', title: 'Client', style: { textAlign: 'center' } },
//     { wildcard: '--', key: 'CodigoAlarma', title: 'Alarm', style: { textAlign: 'center' } },
//     { wildcard: '--', key: ['FechaOriginal', 'Hora'], title: 'Date Hour', style: { textAlign: 'center', minWidth: '170px' } },
//     { wildcard: '--', key: ['FechaPrimeraToma', 'HoraPrimeraToma'], title: 'Firts take', style: { textAlign: 'center', minWidth: '170px' } },
//     { wildcard: '--', key: 'Minutes', title: 'Minutes', style: { textAlign: 'center', minWidth: '170px' } },
//     { wildcard: '--', key: 'ClaveMonitorista', title: 'Operator', style: { textAlign: 'center', minWidth: '170px' } },
// ];

export const AttentionPage = () => {

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
                        {/* <DataTable
                            title="Alarm attention"
                            data={data?.events ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        /> */}
                    </section>
            }

        </article >
    )
};