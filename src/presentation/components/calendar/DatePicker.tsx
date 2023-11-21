import { useCallback, useState, useRef, useEffect } from 'react';
import { CalendarStart, Caret, CheveronLeft } from "../../icons/icons"
import Input from "../Input"
import { modDate } from "../../../helper/functions";
import { Calendar } from "./Calendar";

interface Select {
    label: string | number;
    isShow: boolean;
    onClick: () => void;
    next: () => void;
    previous: () => void;
}

interface DatePicker {
    start: Date;
    onChange: (date: Date) => void;
    locale?: 'es' | 'en',
    label?: string;
    error?: string;
    type?: 'date' | 'datetime-local';
}

export const DatePicker = ({ start, label = 'Date', onChange, locale = 'es', error, type = 'date' }: DatePicker) => {
    const [isView, setIsView] = useState<boolean>(false);
    const [isSelectYear, setIsSelectYear] = useState<boolean>(false);
    const [isSelectedMonth, setIsSelectedMonth] = useState<boolean>(false);
    const InputRef = useRef<HTMLInputElement>(null);

    const intlForShortMonths = new Intl.DateTimeFormat(locale, { month: 'short' });
    const monthShortName = intlForShortMonths.format(new Date(start.getFullYear(), start.getMonth()));

    const close = () => {
        setIsView(false);
        setIsSelectYear(false);
    }

    const setDate = (date: Date) => () => {
        onChange(date);
    }

    useEffect(() => {
        if (InputRef.current) {
            InputRef.current.value = modDate({ dateI: start }).date.date;
        }
    }, [start]);

    const Select = useCallback(
        ({ label, onClick, isShow, next, previous }: Select) => {
            return (
                <div className="select">
                    <button className='btn-icon' onClick={previous} children={<CheveronLeft />} />
                    <span>
                        <p>{label}</p>
                        <button className='btn-icon' onClick={onClick} children={<Caret classname={isShow ? "rotate" : ''} />} />
                    </span>
                    <button className='btn-icon' onClick={next} children={<CheveronLeft classname='rotate' />} />
                </div>
            )
        },
        [setIsSelectedMonth],
    )


    return (
        <div className="input-date-picker">
            <Input
                reference={InputRef}
                labelText={label}
                defaultValue={modDate({ dateI: start }).date.date}
                onChange={({ target: { value } }) => onChange(modDate({ dateI: new Date(value) }).DATE)}
                type={type}
                error={error}
                trailing={
                    <button
                        className="btn-icon"
                        children={<CalendarStart />}
                        onClick={() => setIsView(!isView)}
                    />
                }
            />
            {
                isView &&
                <div className="container-date">
                    <header>
                        <Select
                            next={setDate(modDate({ dateI: start, months: 1 }).DATE)}
                            previous={setDate(modDate({ dateI: start, months: -1 }).DATE)}
                            isShow={isSelectedMonth}
                            label={monthShortName}
                            onClick={() => setIsSelectedMonth(!isSelectedMonth)} />
                        <Select
                            next={setDate(modDate({ dateI: start, months: 12 }).DATE)}
                            previous={setDate(modDate({ dateI: start, months: -12 }).DATE)}
                            isShow={isSelectYear}
                            label={start.getFullYear()}
                            onClick={() => setIsSelectYear(!isSelectYear)} />

                    </header>
                    <section>
                        <Calendar date={start} onChange={onChange} isSelectYear={isSelectYear} />
                    </section>
                    <footer>
                        <button className="button-small" onClick={() => setIsView(false)}>Cancel</button>
                        <button className="button-small" onClick={close}>OK</button>
                    </footer>
                </div>
            }
        </div>
    )
}
