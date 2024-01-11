import { useCallback, useState } from "react";
import { ModalContent } from "../../interfaces/interfaces"
// import { Calendar } from "../calendar/Calendar";
import { CalendarStart, Caret, CheveronLeft, Pencil } from "../../icons/icons";
import { getDate, modDate } from "../../../helper/functions";
// import Input from "../Input";
import { formatDate } from "../../../interfaces";
import { DatePicker } from "../calendar/DatePicker";
import { Calendar } from "../calendar/Calendar";

interface PropsPicker<T> extends ModalContent<T> {
    onChenge: (date: formatDate) => void;
    locale?: 'es' | 'en';
    title?: string;
}

export const CalendarModalContent = <T extends Object>({ dialog, reference, onChenge, locale = 'es', title }: PropsPicker<T>) => {
    const [date, setDate] = useState<formatDate>(getDate());
    const [isCustomDate, setIsCustomDate] = useState<boolean>(false);
    const [isSelectYear, setIsSelectYear] = useState<boolean>(false);

    const intlForMonths = new Intl.DateTimeFormat(locale, { month: 'long' });
    const intlForShortMonths = new Intl.DateTimeFormat(locale, { month: 'short' });
    const monthShortName = intlForShortMonths.format(date.DATE);
    const monthName = intlForMonths.format(date.DATE);

    const intlForDay = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const dayName = intlForDay.format(date.DATE);

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-center')) {
                currentTarget.classList.toggle('scale-down-center');
                dialog.current?.close();
            }
            setDate(getDate());
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
                <p>{title ?? 'Select date'}</p>
                <div className="edit-date">
                    {
                        isCustomDate
                            ? <p>Enter date</p>
                            : <p translate="no">{dayName}, {monthShortName} {date.date.day}</p>
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
                            <DatePicker date={date} onChange={setDate} label="Select Date" locale="es" />
                        </div>
                        :
                        <>
                            <span className='container-year'>
                                <span className='select-year'>
                                    <p>{monthName} {date.date.year}</p>
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
                                        onClick={() => setDate(modDate({ dateI: date.DATE, addMonth: -1 }))}
                                    >
                                        <CheveronLeft />
                                    </button>
                                    <button
                                        className='btn-icon'
                                        onClick={() => setDate(modDate({ dateI: date.DATE, addMonth: 1 }))}

                                    >
                                        <CheveronLeft classname='rotate' />
                                    </button>
                                </span>
                            </span>
                            <Calendar date={date} onChange={setDate} isSelectYear={isSelectYear} />
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
