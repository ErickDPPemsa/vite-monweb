import { useRef, useState } from "react";
import { getDate } from "../../helper/functions";
import { DatePicker } from "../components/calendar/DatePicker"
import { CalendarStart } from "../icons/icons";
import { formatDate } from "../../interfaces";
import { Portal } from "../components/modals";
import { CalendarModalContent } from "../components/modals/CalendarModalContent";

export const HomePage = () => {
    const [date, setDate] = useState<formatDate>(getDate());
    const dialog = useRef<HTMLDialogElement>(null);
    const CalendarPicker = useRef<HTMLDivElement>(null);

    return (
        <div className="container-page-report">
            Home-Page
            <button className="btn-icon" onClick={() => dialog.current?.show()}>
                <CalendarStart />
                <Portal className="blur-1" refElement={dialog}
                    onClosed={(close) => close && CalendarPicker.current?.classList.toggle('scale-down-center')}
                >
                    <CalendarModalContent dialog={dialog} reference={CalendarPicker} onChenge={date => console.log(date)} title="Select the first day of the month." />
                </Portal>
            </button>
            <DatePicker showIcon type="datetime-local" onChange={setDate} date={date} />
            <DatePicker showIcon onChange={setDate} date={date} />
        </div>
    )
}
