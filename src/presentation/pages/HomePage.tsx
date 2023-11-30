import { useCallback, useState } from "react";
import { getDate, modDate } from "../../helper/functions";
import { DatePicker } from "../components/calendar/DatePicker"
import { Operator, formatDate } from "../../interfaces";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../services";
import { useHandleError } from "../../hooks";
import { Circle, Spinner } from "../icons/icons";

export const HomePage = () => {
    const { showError } = useHandleError();
    const [start, setStart] = useState<formatDate>(modDate({ dateI: new Date(), Hours: 0, Minutes: 0 }));
    const [end, setEnd] = useState<formatDate>(getDate());

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['attention'],
        queryFn: () => ReportService.attentionOperator({ start: `${start.date.date} ${start.time.time.slice(0, 5)}`, end: `${end.date.date} ${end.time.time.slice(0, 5)}` }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    // const getAlarms = () => {
    //     return [...new Set(events.map(event => event.CodigoAlarma))]
    //         .map(alarm => alarm)
    //         .reduce((acc, current) => [...acc, current], []);
    // }

    const RenderOperator = useCallback(
        ({ name, events }: Operator) => {
            const alarms = [...new Set(events.map(event => event.CodigoAlarma))].reduce((acc, current) => ({ ...acc, [current]: events.filter(a => a.CodigoAlarma === current).length }), {});
            const entries = Object.entries(alarms) as Array<[string, number]>;
            return (
                <div className="operator">
                    <div className="top">
                        <h3>{name === '' ? 'Pendings events...' : name}</h3>
                        <h4>Events: {events.length}</h4>
                    </div>
                    <div>
                        <p>Percentaje: {data && Math.round((events.length * 100) / data.totalEvents)}%</p>
                    </div>
                    <div className="alarms">
                        {entries.map(value => <p className="value" key={`${name}-${value[0]}`}>{value[0]}: {value[1]}</p>)}
                    </div>
                </div>
            )
        },
        [data],
    )


    return (
        <article className="container-page-report">
            <header>
                <div className="top">
                    <h1>Dashboard</h1>
                    <span className="container-buttons">
                        <div className="pickers">
                            <DatePicker type="datetime-local" showIcon date={start} onChange={setStart} label="Start" />
                            <DatePicker type="datetime-local" showIcon date={end} onChange={setEnd} label="End" />
                        </div>
                        <div className="buttons" >
                            <button className="button-small" onClick={() => refetch()}>
                                {(isFetching) ? <Spinner classname="icon-spin" /> : 'Consult'}
                            </button>
                        </div>
                    </span>
                </div>
            </header>
            <section className="content-data">
                <h2>Total Events: {data?.totalEvents}</h2>

                <div className="container-operators">
                    {data?.operators.map((props) => <RenderOperator key={`Name:${props.name}`} {...props} />)}
                </div>
            </section>
        </article >
    )
}
