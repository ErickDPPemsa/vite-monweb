import { useCallback, useEffect, useState } from "react";
import { getDate, modDate } from "../../helper/functions";
import { DatePicker } from "../components/calendar/DatePicker"
import { Event, Operator, formatDate } from "../../interfaces";
import { useQuery } from "@tanstack/react-query";
import { ReportService } from "../../services";
import { useHandleError } from "../../hooks";
import { CloudDownload } from "../icons/icons";
import { Text } from "../components/Text";
import { utils, writeFile } from "xlsx";
import { Loader } from "../components/Loader";
import { IconBtn } from "../components/IconBtn";
import { Badge, Button, Card } from "flowbite-react";

export const HomePage = () => {
    const { showError } = useHandleError();
    const [isAuto, setIsAuto] = useState<boolean>(true);
    const [start, setStart] = useState<formatDate>(modDate({ dateI: new Date(), Hours: 0, Minutes: 0, Seconds: 0 }));
    const [end, setEnd] = useState<formatDate>(getDate());

    const { data, refetch, isFetching, isLoading, error } = useQuery({
        queryKey: ['attention'],
        refetchOnWindowFocus: true,
        queryFn: () => ReportService.attentionOperator({ start: `${start.date.year}-${String(start.date.month).padStart(2, '0')}-${String(start.date.day).padStart(2, '0')} ${String(start.time.hour).padStart(2, '0')}:${String(start.time.minute).padStart(2, '0')}`, end: `${end.date.year}-${String(end.date.month).padStart(2, '0')}-${String(end.date.day).padStart(2, '0')} ${String(end.time.hour).padStart(2, '0')}:${String(end.time.minute).padStart(2, '0')}` }),
    });

    if (!isFetching && !isLoading && error) showError({ responseError: error, exit: true });

    const updateAuto = useCallback(
        () => isAuto ? setIsAuto(false) : setIsAuto(true),
        [isAuto],
    )

    const consult = useCallback(
        () => {
            setEnd(getDate());
            refetch();
        },
        [refetch],
    )

    const download =
        ({ events, keys, title, percentaje }: { events: Array<Event<string>>, keys: Array<keyof Event<string>>, title: string, percentaje: number }) => () => {
            const sanityData = events.map(element => keys.map(key => key).reduce((acc, current) => ({ ...acc, [current]: element[current] }), {}));
            const wb = utils.book_new();
            const ws = utils.json_to_sheet([[]]);
            utils.sheet_add_json(ws, sanityData);
            utils.sheet_add_aoa(ws, [["Operator", "#Events", "Percentaje"], [title, events.length, percentaje]], { origin: `${String.fromCharCode(65 + keys.length + 2)}1` });

            utils.book_append_sheet(wb, ws, title);
            writeFile(wb, `${title}dd.xlsx`);
        }

    const RenderOperator = useCallback(
        ({ name, events }: Operator) => {
            const alarms = [...new Set(events.map(event => event.CodigoAlarma))].reduce((acc, current) => ({ ...acc, [current]: events.filter(a => a.CodigoAlarma === current).length }), {});
            const entries = Object.entries(alarms) as Array<[string, number]>;
            const keys: Array<keyof Event<string>> = ['FechaOriginal', 'Hora', 'FechaPrimeraToma', 'HoraPrimeraToma', 'CodigoCte', 'Minutes', 'CodigoAlarma', 'CodigoEvento'];
            const percentaje: number = data?.totalEvents ? +Math.ceil((events.length * 100) / data.totalEvents) : 0;
            return (
                <Card>
                    <div className="flex gap-4 justify-between items-center ">
                        <h3 className="text-xl font-semibold">{name === '' ? 'Pendings events...' : name}</h3>
                        <span className="flex items-center gap-4">
                            <h4>Events: {events.length}</h4>
                            <IconBtn className="size-9 flex justify-center items-center" onClick={download({ events, keys, title: name, percentaje })} children={<CloudDownload />} />
                        </span>
                    </div>
                    <Text variant="text-base">Percentaje: {percentaje}%</Text>
                    <div className="flex flex-wrap gap-3 p-1 text-sm font-semibold mt-3">
                        {entries.map(value => <Badge color="gray" key={`${name}-${value[0]}`}>{value[0]}: {value[1]}</Badge>)}
                    </div>
                </Card>
            )
        },
        [data?.totalEvents],
    )

    useEffect(() => {
        if (!isAuto) return;
        const id = setInterval(consult, 3000);
        return () => clearInterval(id);
    }, [consult, isAuto])


    return (
        <>
            <header className="flex w-full m-1 h-16 items-center justify-between">
                <h1 className="text-4xl font-semibold">Dashboard</h1>
                <span className="flex gap-4 items-center justify-center h-full">
                    <div className="flex gap-4">
                        <DatePicker isDisable={isAuto} type="datetime-local" date={start} onChange={setStart} label="Start" />
                        <DatePicker isDisable={isAuto} type="datetime-local" date={end} onChange={setEnd} label="End" />
                    </div>
                    {!isAuto && <Button children='Consult' onClick={consult} />}
                    <Button children={isAuto ? 'Stop Autmatic' : 'Start Autmatic'} color={isAuto ? "success" : 'blue'} onClick={updateAuto} isProcessing={isFetching} />
                </span>
            </header>
            <section className="flex-1 overflow-auto">
                {
                    isLoading ? <Loader text="Loading" />
                        :
                        <>
                            <h2 className="text-xl font-semibold">Total Events: {data?.totalEvents}</h2>
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {(data && data.operators) && data.operators.map((props) => <RenderOperator key={`Name:${props.name}`} {...props} />)}
                            </div>
                        </>
                }
            </section>
        </>
    )
}
