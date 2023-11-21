import { modDate } from "../../helper/functions";
import Input from "../components/Input"
import { DatePicker } from "../components/calendar/DatePicker"

export const HomePage = () => {

    console.log(modDate({}));

    return (
        <div>
            Home-Page

            <div style={{ width: '500px' }}>
                <Input type="datetime-local" onChange={({ target: { value } }) => console.log(value)} />
            </div>
            <DatePicker onChange={() => { }} start={new Date()} />
        </div>
    )
}
