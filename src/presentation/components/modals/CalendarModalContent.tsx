import { useCallback, useState } from "react";
import { ModalContent } from "../../interfaces/interfaces"
import { Calendar } from "../calendar/Calendar";
import { CalendarStart, Caret, CheveronLeft, Pencil } from "../../icons/icons";
import { modDate } from "../../../helper/functions";
import Input from "../Input";

interface PropsPicker extends ModalContent {
    onChenge: (date: Date) => void;
    locale?: 'es' | 'en';
}

export const CalendarModalContent = ({ dialog, reference, onChenge, locale = 'es' }: PropsPicker) => {
    const [date, setDate] = useState<Date>(new Date());
    const [isSelectYear, setIsSelectYear] = useState<boolean>(false);
    const [isCustomDate, setIsCustomDate] = useState<boolean>(false);

    const intlForMonths = new Intl.DateTimeFormat(locale, { month: 'long' });
    const intlForShortMonths = new Intl.DateTimeFormat(locale, { month: 'short' });
    const monthName = intlForMonths.format(date);
    const monthShortName = intlForShortMonths.format(date);

    const intlForDay = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const dayName = intlForDay.format(date);

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-center')) {
                currentTarget.classList.toggle('scale-down-center');
                dialog.current?.close();
            }
            setDate(new Date());
        },
        [dialog],
    );
    const close = () => {
        reference.current?.classList.toggle('scale-down-center');
        setIsCustomDate(false);
        setIsSelectYear(false);
    }

    const DateOk = () => {
        onChenge(date);
        close();
    }

    return (
        <div ref={reference} className="calendar-picker scale-up-center" onAnimationEnd={onAnimationEnd}>
            <header>
                <p>Select date</p>
                <div className="edit-date">
                    {
                        isCustomDate
                            ? <p>Enter date</p>
                            : <p>{dayName}, {monthShortName} {date.getDate()}</p>
                    }
                    <button
                        className='btn-icon'
                        onClick={() => setIsCustomDate(!isCustomDate)}
                    >
                        {isCustomDate ? <CalendarStart /> : <Pencil />}
                    </button>
                </div>
            </header>
            <section>
                {
                    isCustomDate
                        ?
                        <div className="custom-date">
                            <Input labelText="Date" type="date" onChange={({ target: { value } }) => setDate(modDate({ dateI: new Date(value), days: 1 }).DATE)} />
                        </div>
                        :
                        <>
                            <span className='container-year'>
                                <span className='select-year'>
                                    <p>{monthName} {date.getFullYear()}</p>
                                    <button
                                        className='btn-icon'
                                        onClick={() => setIsSelectYear(!isSelectYear)}
                                    >
                                        <Caret classname={isSelectYear ? "rotate" : ''} />
                                    </button>
                                </span>
                                <span className='arrows'>
                                    <button
                                        className='btn-icon'
                                        onClick={() => setDate(modDate({ dateI: date, months: -1 }).DATE)}
                                    >
                                        <CheveronLeft />
                                    </button>
                                    <button
                                        className='btn-icon'
                                        onClick={() => setDate(modDate({ dateI: date, months: 1 }).DATE)}
                                    >
                                        <CheveronLeft classname='rotate' />
                                    </button>
                                </span>
                            </span>
                            <Calendar date={date} onChange={date => {
                                setIsSelectYear(false);
                                setDate(date)
                            }} isSelectYear={isSelectYear} />
                        </>
                }
            </section>
            <footer>
                <button className="button-small" onClick={close}>Cancel</button>
                <button className="button-small" onClick={DateOk}>OK</button>
            </footer>

        </div>
    )
}
