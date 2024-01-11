import { useRef, useState } from "react";
import { CalendarStart, Spinner } from "../../icons/icons";
import { Portal } from "../../components/modals";
import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { DatePicker } from "../../components/calendar/DatePicker";
import { getDate } from "../../../helper/functions";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../../services";
import { DataTable } from "../../components/DataTable";
import { Key } from "../../interfaces/interfaces";
import { AlarmApplicationSystem, Event } from "../../../interfaces";
import { useHandleError } from "../../../hooks";
import { Loader } from "../../components/Loader";

const Keys: Array<Key<Event<AlarmApplicationSystem>>> = [
    { wildcard: '--', key: ['FechaOriginal', 'Hora'], title: 'Date Hour', style: { textAlign: 'center', fontWeight: '400' } },
    { wildcard: '--', key: 'CodigoAlarma', title: 'Alarm', style: { textAlign: 'center' } },
    { wildcard: '--', key: 'CodigoAbonado', title: 'Subscriber', style: { textAlign: 'center' } },
    { wildcard: '--', key: 'CodigoCte', title: 'Client', style: { textAlign: 'center' } },
];

export const SystemRequestPage = () => {
    const { showError } = useHandleError();
    const [start, setStart] = useState(getDate());
    const [end, setEnd] = useState(getDate());
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['SrsSta'],
        queryFn: () => ReportService.applicationSystem({ start: start.date.date, end: end.date.date }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (
        <article className="container-page-report">
            <header>
                <div className="top">
                    <h1>System request</h1>

                    <span className="container-buttons">
                        <div className="pickers">
                            <DatePicker showIcon date={start} onChange={setStart} label="Start" />
                            <DatePicker showIcon date={end} onChange={setEnd} label="End" />
                        </div>
                        <div className="buttons" >
                            <button className="button-small" onClick={() => refetch()}>
                                {(isFetching) ? <Spinner classname="icon-spin" /> : 'Refresh'}
                            </button>
                            <button className="btn-icon" onClick={() => dialog.current?.show()}>
                                <CalendarStart />
                                <Portal className="blur-1" refElement={dialog}
                                    onClosed={(close) => close && CalendarPicker.current?.classList.toggle('scale-down-center')}
                                >
                                    <CalendarModalContent dialog={dialog} reference={CalendarPicker} onChenge={date => console.log(date)} title="Select the first day of the month." />
                                </Portal>
                            </button>
                        </div>
                    </span>
                </div>
            </header>
            {
                (isLoading)
                    ? <Loader text="Loading ..." />
                    :
                    <section className="content-data" style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
                        <DataTable
                            title="Srs"
                            data={data?.srs ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        />
                        <DataTable
                            title="Sta"
                            data={data?.sta ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        />
                        <DataTable
                            title="Pending srs"
                            data={data?.pendingSrs ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        />
                    </section>
            }
        </article >
    )
};