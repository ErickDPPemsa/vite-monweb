import { useEffect, useState } from 'react';
import { CheveronLeft, CloudDownload, Search, X } from "../icons/icons";
import { Text } from './Text';
import { SimpleSelect } from './SimpleSelect';
import Input from './Input';
import { PropsDataTable, PropsSelect } from '../interfaces/interfaces';


const Rows: Array<PropsSelect<number>> = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '100', value: 100 },
];

export const DataTable = <T extends Object>({ keys, data, id, indices, title, starFilter }: PropsDataTable<T>) => {
    const className = 'container-data-table';
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [rows, setRows] = useState<PropsSelect<number>>(Rows[0]);
    const [page, setPage] = useState<number>(1);
    const [filter, setfilter] = useState<typeof data>();
    const [keyFilter, setKeyFilter] = useState<keyof T>(starFilter);


    const start: number = page > 1 ? ((((page - 1) * rows.value) + rows.value) - rows.value) : (page - 1);
    const end: number = ((page - 1) * rows.value) + rows.value;

    const maxPages = Math.ceil(data.length / rows.value);

    const getValue = (object: Object, key: string) => {
        const value = Object.entries(object).find(a => a[0] === key);
        if (value) return String(value[1]);
        return '----';
    }

    const Row = (row: T, idx: number) => {
        return (
            <tr key={`${row[id]}${idx}`}>
                {indices && <td data-label='#' key={`index-${(idx + 1)}`}>{idx + 1 + start}</td>}
                {keys.map(({ key, key2, style, title }, idx) =>
                    Array.isArray(key) ?
                        <td data-label={title ?? key.toString()} style={style} key={`${idx}-${Array.isArray(key) && row[key[0]]}`}>{key.map(key => String(row[key])).join(' ')}</td>
                        : (typeof row[key] === 'object' && key2)
                            ? <td data-label={title ?? key.toString()} style={style} key={`${idx}-${row[key]}`}>{getValue(row[key] as Object, key2)}</td>
                            : <td data-label={title ?? key.toString()} style={style} key={`${row[key]}`}>{String(row[key])}</td>
                )}
            </tr>
        )
    }

    const Next = () => {
        if (page < maxPages) {
            setPage(page + 1);
        }
    }

    const Previous = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const clear = () => {
        setIsSearch(false);
        setPage(1);
        setfilter(undefined);
    }

    const onChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (value.length === 0) {
            setfilter(undefined);
        } else {
            setfilter(data.filter(element => {
                if (!Array.isArray(keyFilter) && `${element[keyFilter]}`.toLowerCase().includes(value)) {
                    return element
                }
            }));
        }
    }

    useEffect(() => {
        if (page > maxPages) setPage(maxPages);
        else setPage(1);
    }, [rows, data]);


    return (
        <div className={className}>
            <section className={`${className}_header`}>
                <div>
                    {
                        isSearch
                            ?
                            <Input
                                classNameContent='scale-up-horizontal-right'
                                autoFocus
                                placeholder='Search'
                                styleField={{ height: '35px' }}
                                leading={<Search />}
                                trailing={<X classname='icon-btn' onClick={clear} />}
                                onChange={onChange}
                            />
                            : <Text style={{ fontWeight: '500' }} variant='Title-large'>{title}</Text>
                    }
                </div>
                <div className='actions'>
                    {!isSearch && <button className='btn-icon' onClick={() => setIsSearch(true)}>
                        <Search />
                    </button>}
                    <button className='btn-icon'>
                        <CloudDownload />
                    </button>
                </div>
            </section>
            <section>
                <table>
                    <thead>
                        <tr>
                            {indices && <th>#</th>}
                            {keys.map(({ key, title, select }) => <th onClick={() => select && !Array.isArray(key) && setKeyFilter(key)} className={`${keyFilter === key && 'selected'}`} key={key.toString()}>{title ?? key.toString()}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {filter
                            ? filter.slice(start, end).map((element, idx) => Row(element, idx))
                            : data.slice(start, end).map((element, idx) => Row(element, idx))}
                    </tbody>
                </table>
            </section>
            <footer>
                <span className='description'>
                    <Text>Rows per page:</Text>
                    <SimpleSelect selected={rows.label} options={Rows} onSelect={setRows} />
                </span>
                <Text>{`${page} - ${maxPages} of ${data.length}`}</Text>
                <span className='arrows'>
                    <button className='btn-icon' onClick={Previous}>
                        <CheveronLeft />
                    </button>
                    <button className='btn-icon rotate' onClick={Next}>
                        <CheveronLeft classname="icon" />
                    </button>
                </span>
            </footer >
        </div >
    )
}
