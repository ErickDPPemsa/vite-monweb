import { useRef, useState } from "react";
import { useHandleError } from "../../../hooks";
import { Event } from "../../../interfaces";
import { DataTable } from "../../components/DataTable";
import { DatePicker } from "../../components/calendar/DatePicker";
import { Portal } from "../../components/modals";
import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { CalendarStart, Spinner } from "../../icons/icons";
import { Key } from "../../interfaces/interfaces";
import { modDate } from "../../../helper/functions";
import { ReportService } from "../../../services";
import { useQuery } from "@tanstack/react-query";

const Keys: Array<Key<Event<string>>> = [
    { key: 'DescripcionAlarm', title: 'Alarm description', style: { textAlign: 'center' }, select: true },
    { key: 'CodigoCte', title: 'Client', style: { textAlign: 'center' }, select: true },
    { key: 'CodigoAlarma', title: 'Alarm', style: { textAlign: 'center' }, select: true },
    { key: ['FechaOriginal', 'Hora'], title: 'Date Hour', select: true, style: { textAlign: 'center', minWidth: '170px' } },
    { key: ['FechaPrimeraToma', 'HoraPrimeraToma'], title: 'Firts take', select: true, style: { textAlign: 'center', minWidth: '170px' } },
    { key: 'Minutes', title: 'Minutes', select: true, style: { textAlign: 'center', minWidth: '170px' } },
    { key: 'ClaveMonitorista', title: 'Operator', select: true, style: { textAlign: 'center', minWidth: '170px' } },
];

export const AttentionPage = () => {

    const { showError } = useHandleError();
    const [start, setStart] = useState(modDate({}));
    const [end, setEnd] = useState(modDate({}));
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['attention'],
        queryFn: () => ReportService.attention({ start: start.date.date, end: end.date.date }),
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
                                {(isFetching) ? <Spinner classname="icon-spin" /> : 'Consult'}
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
                    title="Tese"
                    data={data?.events ?? []}
                    id='CodigoCte'
                    keys={Keys}
                />
            </section>
        </article >
    )
};