import { useRef, useState } from "react";
import { CalendarStart } from "../../icons/icons";
import { Portal } from "../../components/modals";
import { CalendarModalContent } from "../../components/modals/CalendarModalContent";
import { DatePicker } from "../../components/calendar/DatePicker";

export const SystemRequestPage = () => {
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);

    return (
        <article className="container-app-sys">
            <header>
                <div className="top">
                    <h1>Installed systems</h1>

                    <span className="container-buttons">
                        <div className="pickers">
                            <DatePicker start={start} onChange={date => setStart(date)} label="Start" />
                            <DatePicker start={end} onChange={setEnd} label="End" />
                        </div>
                        <div className="buttons" >
                            <button className="button-small" onClick={() => { }}>
                                {/* {(isFetching) ? <Spinner classname="icon-spin" /> : 'Refresh'} */}
                                Refresh
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
            <section className="content-data">
            </section>
        </article >
    )
};