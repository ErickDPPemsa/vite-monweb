import { useRef, useState } from "react";
import { CalendarStart, Spinner } from "../../icons/icons";
import { Portal } from "../../components/modals";
import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { DatePicker } from "../../components/calendar/DatePicker";
import { modDate } from "../../../helper/functions";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../../services";
import { DataTable } from "../../components/DataTable";
import { Key } from "../../interfaces/interfaces";
import { AlarmApplicationSystem, Event } from "../../../interfaces";
import { useHandleError } from "../../../hooks";

const Keys: Array<Key<Event<AlarmApplicationSystem>>> = [
    { key: ['FechaOriginal', 'Hora'], title: 'Date Hour', select: true, style: { textAlign: 'center', fontWeight: '400' } },
    { key: 'CodigoAlarma', title: 'Alarm', style: { textAlign: 'center' }, select: true },
    { key: 'CodigoAbonado', title: 'Subscriber', style: { textAlign: 'center' }, select: true },
    { key: 'CodigoCte', title: 'Client', style: { textAlign: 'center' }, select: true },
];

export const SystemRequestPage = () => {
    const { showError } = useHandleError();
    const [start, setStart] = useState(modDate({}));
    const [end, setEnd] = useState(modDate({}));
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['SrsSta'],
        queryFn: () => ReportService.applicationSystem({ start: start.date.date, end: end.date.date }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    return (
        <article className="container-app-sys">
            <header>
                <div className="top">
                    <h1>Installed systems</h1>

                    <span className="container-buttons">
                        <div className="pickers">
                            <DatePicker start={start.DATE} onChange={(date) => setStart(modDate({ dateI: date }))} label="Start" />
                            <DatePicker start={end.DATE} onChange={(date) => setEnd(modDate({ dateI: date }))} label="End" />
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
                                    <CalendarModalContent dialog={dialog} reference={CalendarPicker} onChenge={date => console.log(date)} />
                                </Portal>
                            </button>
                        </div>
                    </span>
                </div>
            </header>
            <section className="content-data" style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
                <DataTable
                    starFilter="CodigoAlarma"
                    title="Srs"
                    data={data?.srs ?? []}
                    id='CodigoCte'
                    keys={Keys}
                />
                <DataTable
                    starFilter="CodigoAlarma"
                    title="Sta"
                    data={data?.sta ?? []}
                    id='CodigoCte'
                    keys={Keys}
                />
                <DataTable
                    starFilter="CodigoAlarma"
                    title="Pending srs"
                    data={data?.pendingSrs ?? []}
                    id='CodigoCte'
                    keys={Keys}
                />
            </section>
        </article >
    )
};