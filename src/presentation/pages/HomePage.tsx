import { useState } from "react";
import { getDate } from "../../helper/functions";
import { DatePicker } from "../components/calendar/DatePicker"
import { CheveronLeft } from "../icons/icons";
import { formatDate } from "../../interfaces";

export const HomePage = () => {
    const [date, setDate] = useState<formatDate>(getDate());

    return (
        <div style={{ color: 'var(--primary)' }}>
            Home-Page

            <DatePicker showIcon type="datetime-local" onChange={setDate} date={date} />
            <DatePicker showIcon onChange={setDate} date={date} />

            <section>
                <div>
                    <div>
                        <button className="btn-icon"><CheveronLeft /></button>
                        <span>00</span>
                        <button className="btn-icon"><CheveronLeft /></button>
                    </div>
                    <span>:</span>
                    <div>
                        <button className="btn-icon"><CheveronLeft /></button>
                        <span>00</span>
                        <button className="btn-icon"><CheveronLeft /></button>
                    </div>
                </div>
                <div>
                    <button className="button-small Body-small">AM</button>
                    <button className="button-small Body-small">PM</button>
                </div>
            </section>
        </div>
    )
}
