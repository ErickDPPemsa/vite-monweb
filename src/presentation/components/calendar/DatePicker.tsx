import { useState } from "react"
import { CalendarStart } from "../../icons/icons"
import Input from "../Input"
import { modDate } from "../../../helper/functions";
import { Calendar } from "./Calendar";

export const DatePicker = ({ start, label = 'Date', onChange }: { start: Date, label?: string, onChange: (date: Date) => void }) => {
    const [isView, setIsView] = useState<boolean>(false);

    const [date, setDate] = useState<Date>(start);
    const [isSelectYear, setIsSelectYear] = useState<boolean>(false);

    return (
        <div className="input-date-picker">
            <Input
                labelText={label}
                defaultValue={modDate({ dateI: date }).date.date}
                type="date"
                trailing={
                    <button
                        className="btn-icon"
                        children={<CalendarStart />}
                        onClick={() => setIsView(true)}
                    />
                }
            />
            {
                isView &&
                <div className="container-date">
                    <Calendar date={start} onChange={onChange} />
                </div>
            }
        </div>
    )
}
