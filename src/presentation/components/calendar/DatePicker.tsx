import { useCallback, useState, useRef, useEffect } from 'react';
import { CalendarStart, CalendarTime, Caret, CheveronLeft } from "../../icons/icons"
import Input from "../Input"
import { modDate } from "../../../helper/functions";
import { Calendar } from "./Calendar";
import { formatDate } from '../../../interfaces';

interface Select {
    label: string | number;
    isShow: boolean;
    onClick: () => void;
    next: () => void;
    previous: () => void;
}

interface Digit {
    value: number;
    plus: () => void;
    minus: () => void;
}


interface DatePicker {
    date: formatDate;
    onChange: (date: formatDate) => void;
    locale?: 'es' | 'en',
    label?: string;
    type?: 'date' | 'datetime-local';
    showIcon?: boolean;
    error?: string;
}

export const DatePicker = ({ date, label = 'Date', onChange, locale = 'es', type = 'date', showIcon = false, error }: DatePicker) => {
    const [isView, setIsView] = useState<boolean>(false);
    const [isSelectYear, setIsSelectYear] = useState<boolean>(false);
    const [isSelectedMonth, setIsSelectedMonth] = useState<boolean>(false);
    const InputRef = useRef<HTMLInputElement>(null);

    const intlForShortMonths = new Intl.DateTimeFormat(locale, { month: 'short' });
    const monthShortName = intlForShortMonths.format(new Date(date.DATE.getFullYear(), date.DATE.getMonth()));

    const close = () => {
        setIsView(false);
        setIsSelectYear(false);
        setIsSelectedMonth(false);
    }

    const inputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'date') {
            const [Year, Month, Day] = value.split('-').map(value => +value);
            if (Year >= 1900 && Year <= 2099) {
                onChange(modDate({ dateI: date.DATE, Year, Month: Month - 1, Day }));
            }
        } else {
            const [Date, Time] = value.split('T');
            const [Year, Month, Day] = Date.split('-').map(value => +value);
            const [Hours, Minutes] = Time.split(':').map(value => +value);
            if (Year >= 1900 && Year <= 2099) {
                onChange(modDate({ dateI: date.DATE, Year, Month: Month - 1, Day, Hours, Minutes }));
            }
        }
    }

    const onChangeMonth = (value: number) => () => {
        onChange(modDate({ dateI: date.DATE, addMonth: value }));
    }

    const onChangeTime = (value: number, type: 'hour' | 'minute') => () => type === 'hour' ? onChange(modDate({ dateI: date.DATE, addHour: value })) : onChange(modDate({ dateI: date.DATE, addMinute: value }));

    useEffect(() => {
        if (InputRef.current)
            if (type === 'date') InputRef.current.value = date.date.date;
            else InputRef.current.value = `${date.date.date}T${`${date.time.hour}`.padStart(2, '0')}:${`${date.time.minute}`.padStart(2, '0')}`;
        setIsSelectedMonth(false);
        setIsSelectYear(false);
    }, [date, type, InputRef.current]);

    const Select = useCallback(
        ({ label, onClick, isShow, next, previous }: Select) => {
            return (
                <div className="select">
                    <button className='btn-icon' onClick={previous} children={<CheveronLeft />} />
                    <span>
                        <p>{label}</p>
                        <button className='btn-icon dropdown' onClick={onClick} children={<Caret classname={isShow ? "rotate" : ''} />} />
                    </span>
                    <button className='btn-icon' onClick={next} children={<CheveronLeft classname='rotate' />} />
                </div>
            )
        },
        [],
    );

    const Digit = useCallback(
        ({ minus, plus, value }: Digit) => {
            return (
                <div className='digit'>
                    <button onClick={plus} className="btn-icon up"><CheveronLeft /></button>
                    <span>{`${value}`.padStart(2, '0')}</span>
                    <button onClick={minus} className="btn-icon down"><CheveronLeft /></button>
                </div>
            )
        },
        [],
    );

    return (
        <div className="input-date-picker">
            <Input
                reference={InputRef}
                labelText={label}
                defaultValue={(type === 'date') ? date.date.date : `${date.date.date}T${`${date.time.hour}`.padStart(2, '0')}:${`${date.time.minute}`.padStart(2, '0')}`}
                onChange={inputChange}
                type={type}
                error={error}
                trailing={showIcon ? <button className="btn-icon" children={(type === 'date') ? <CalendarStart /> : <CalendarTime />} onClick={() => setIsView(!isView)} /> : undefined}
            />
            {
                isView &&
                <div className='content'>
                    <section className='top'>
                        <div className="container-date">
                            <nav className='navigation'>
                                <Select
                                    next={onChangeMonth(1)}
                                    previous={onChangeMonth(-1)}
                                    isShow={isSelectedMonth}
                                    label={monthShortName}
                                    onClick={() => setIsSelectedMonth(!isSelectedMonth)} />
                                <Select
                                    next={onChangeMonth(12)}
                                    previous={onChangeMonth(-12)}
                                    isShow={isSelectYear}
                                    label={date.DATE.getFullYear()}
                                    onClick={() => setIsSelectYear(!isSelectYear)} />

                            </nav>
                            <Calendar date={date} onChange={onChange} isSelectYear={isSelectYear} isSelectMonth={isSelectedMonth} />
                        </div>
                        {
                            type === 'datetime-local' &&
                            <div className='container-time'>
                                <Digit value={date.time.hour} plus={onChangeTime(1, 'hour')} minus={onChangeTime(-1, 'hour')} />
                                <span>:</span>
                                <Digit value={date.time.minute} plus={onChangeTime(1, 'minute')} minus={onChangeTime(-1, 'minute')} />
                            </div>
                        }
                    </section>
                    <section className='bottom'>
                        <button className="button-small" onClick={close}>Ok</button>
                    </section>
                </div>
            }
        </div>
    );
}
