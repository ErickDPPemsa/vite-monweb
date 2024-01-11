import { useCallback, useState } from "react";
import { getDate, modDate } from "../../helper/functions";
import { DatePicker } from "../components/calendar/DatePicker"
import { Event, Operator, formatDate } from "../../interfaces";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../services";
import { useHandleError } from "../../hooks";
import { CloudDownload, Spinner } from "../icons/icons";
import { Text } from "../components/Text";
import { Loader } from "../components/Loader";
import { utils, writeFile } from "xlsx";

export const HomePage = () => {
    const { showError } = useHandleError();
    const [start, setStart] = useState<formatDate>(modDate({ dateI: new Date(), Hours: 0, Minutes: 0 }));
    const [end, setEnd] = useState<formatDate>(getDate());

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['attention'],
        queryFn: () => ReportService.attentionOperator({ start: `${start.date.date} ${start.time.time.slice(0, 5)}`, end: `${end.date.date} ${end.time.time.slice(0, 5)}` }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    const consult = () => {
        setEnd(getDate());
        refetch()
    }

    const download = useCallback(
        ({ events, keys, title, percentaje }: { events: Array<Event<string>>, keys: Array<keyof Event<string>>, title: string, percentaje: number }) => () => {
            const sanityData = events.map(element => keys.map(key => key).reduce((acc, current) => ({ ...acc, [current]: element[current] }), {}));
            const wb = utils.book_new();
            const ws = utils.json_to_sheet([[]]);
            utils.sheet_add_json(ws, sanityData);
            utils.sheet_add_aoa(ws, [["Operator", "#Events", "Percentaje"], [title, events.length, percentaje]], { origin: `${String.fromCharCode(65 + keys.length + 2)}1` });

            utils.book_append_sheet(wb, ws, title);
            writeFile(wb, `${title}.xlsx`);
        },
        [data],
    );

    const RenderOperator = useCallback(
        ({ name, events }: Operator) => {
            const alarms = [...new Set(events.map(event => event.CodigoAlarma))].reduce((acc, current) => ({ ...acc, [current]: events.filter(a => a.CodigoAlarma === current).length }), {});
            const entries = Object.entries(alarms) as Array<[string, number]>;
            const keys: Array<keyof Event<string>> = ['FechaOriginal', 'Hora', 'FechaPrimeraToma', 'HoraPrimeraToma', 'CodigoCte', 'Minutes', 'CodigoAlarma', 'CodigoEvento'];
            const percentaje: number = data?.totalEvents ? +Math.ceil((events.length * 100) / data.totalEvents) : 0;
            return (
                <div className="operator">
                    <div className="top">
                        <h3>{name === '' ? 'Pendings events...' : name}</h3>
                        <span className="actions">
                            <h4>Events: {events.length}</h4>
                            <button className="btn-icon" onClick={download({ events, keys, title: name, percentaje })}>
                                <CloudDownload />
                            </button>
                        </span>
                    </div>
                    <div>
                        <Text>Percentaje: {percentaje}%</Text>
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
                            <button className="button-small" onClick={consult}>
                                {(isFetching) ? <Spinner classname="icon-spin" /> : 'Consult'}
                            </button>
                            {/* <button className="btn-icon">
                                <CloudDownload />
                            </button> */}
                        </div>
                    </span>
                </div>
            </header>
            {
                isLoading
                    ? <Loader text="Loading" />
                    :
                    <section className="content-data">
                        <h2>Total Events: {data?.totalEvents}</h2>
                        <div className="container-operators">
                            {(data && data.operators) && data.operators.map((props) => <RenderOperator key={`Name:${props.name}`} {...props} />)}
                        </div>
                    </section>
            }
        </article >
    )
}
