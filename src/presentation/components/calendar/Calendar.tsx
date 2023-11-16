import { useCallback, useEffect, useState } from 'react';
import { modDate } from '../../../helper/functions';

export const Calendar = ({ date, onChange, isSelectYear }: {
    date: Date,
    onChange: (date: Date) => void;
    isSelectYear?: boolean;
}) => {
    const currentDate = new Date();
    const [daysOfMonth, setDaysOfMonth] = useState<number>(0);
    const [startsOn, setStartsOn] = useState<number>(0);


    const days = [...Array(daysOfMonth).keys()];

    const Day = useCallback(
        ({ day, start }: { day: number, start?: number }) => {
            const onClick = (selectedDay: number) => () => {
                const NewDate: Date = new Date(date.getFullYear(), date.getMonth(), selectedDay);
                // setDate(NewDate);
                onChange(NewDate);
            }

            const isCurrentDay = modDate({ dateI: currentDate }).date.date === `${date.getFullYear()}-${date.getMonth() + 1}-${String(day).padStart(2, '0')}`;
            const selected = modDate({ dateI: date }).date.day === day;

            return (
                <li translate='no' style={start ? { gridColumnStart: start } : {}} className={`Day ${isCurrentDay ? 'today' : ''} ${selected ? 'selected' : ''}`} onClick={onClick(day)}>{String(day).padStart(2, '0')}</li>
            )

        },
        [date, modDate],
    );

    const RenderDays = useCallback(
        () => {
            return (
                <>
                    <Day start={startsOn} day={1} />
                    {days.slice(0, days.length - 1).map((_, idx) => <Day key={idx + 2} day={idx + 2} />)}
                </>
            )
        },
        [startsOn, days],
    );

    const RenderYear = useCallback(
        ({ year }: { year: number }) => {
            const onClick = () => {
                onChange(new Date(date.setFullYear(year)));
            }
            return (
                <li
                    className={`value ${date.getFullYear() === year ? 'current' : ''}`}
                    onClick={onClick}
                >{year}</li>
            )
        },
        [date, onChange],
    );

    const RenderYears = useCallback(
        () => new Array(15).fill('').map((_, idx) => <RenderYear key={currentDate.getFullYear() + 3 - idx} year={currentDate.getFullYear() + 3 - idx} />).reverse(),
        [currentDate, date],
    )

    useEffect(() => {
        const { date: { year, month } } = modDate({ dateI: date });
        setDaysOfMonth(new Date(year, month, 0).getDate());
        setStartsOn(new Date(year, month - 1, 1).getDay() + 1);
    }, [date]);

    return (
        <div className="container-calendar">
            {
                isSelectYear
                    ?
                    <ol className='year'>
                        <RenderYears />
                    </ol>
                    :
                    <ol className="calendar">
                        <li translate='no' className="day-name">S</li>
                        <li translate='no' className="day-name">M</li>
                        <li translate='no' className="day-name">T</li>
                        <li translate='no' className="day-name">W</li>
                        <li translate='no' className="day-name">T</li>
                        <li translate='no' className="day-name">F</li>
                        <li translate='no' className="day-name">S</li>
                        <RenderDays />
                    </ol>
            }
        </div >
    )
}