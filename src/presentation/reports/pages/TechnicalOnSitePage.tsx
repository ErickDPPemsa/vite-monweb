import { useRef, useState } from "react";
import { DataTable } from "../../components/DataTable";
import { DatePicker } from "../../components/calendar/DatePicker";
import { Portal } from "../../components/modals";
import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { CalendarStart, Spinner } from "../../icons/icons";
import { getDate } from "../../../helper/functions";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../../services";
import { Key } from "../../interfaces/interfaces";
import { AlarmTechnicalOnSite, Event } from "../../../interfaces";
import { useHandleError } from "../../../hooks";
import { Loader } from "../../components/Loader";

const Keys: Array<Key<Event<AlarmTechnicalOnSite>>> = [
    { wildcard: '--', key: ['FechaOriginal', 'Hora'], title: 'Date Hour', style: { minWidth: '170px' } },
    { wildcard: '--', key: 'CodigoAlarma', title: 'Alarm', style: { textAlign: 'center' } },
    { wildcard: '--', key: 'CodigoAbonado', title: 'Subscriber', style: { textAlign: 'center' } },
    { wildcard: '--', key: 'CodigoCte', title: 'Client', style: { textAlign: 'center' } },
    { wildcard: '--', key: 'Comment', title: 'Client', style: { fontSize: '12px' }, },
];

export const TechnicalOnSitePage = () => {

    const [start, setStart] = useState(getDate());
    const [end, setEnd] = useState(getDate());
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);
    const { showError } = useHandleError();


    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['TessTese'],
        queryFn: () => ReportService.technicalObSite({ start: start.date.date, end: end.date.date }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });


    return (
        <article className="container-page-report">
            <header>
                <div className="top">
                    <h1>Technical on site</h1>
                    <span className="container-buttons">
                        <div className="pickers">
                            <DatePicker showIcon date={start} onChange={setStart} label="Start" />
                            <DatePicker showIcon date={end} onChange={setEnd} label="End" />
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
            {
                (isLoading)
                    ? <Loader text="Loading ..." />
                    :
                    <section className="content-data" style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
                        <DataTable
                            title="Tese"
                            data={data?.tese ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        />
                        <DataTable
                            title="Tess"
                            data={data?.tess ?? []}
                            id='CodigoCte'
                            keys={Keys}
                        />
                    </section>
            }
        </article >
    )
};
