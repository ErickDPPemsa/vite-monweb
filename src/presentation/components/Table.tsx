import { ColumnDef, PaginationState, Row, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { IconBtn } from './IconBtn';
import { CloudDownload} from '../icons/icons';
import { Text } from './Text';
import { FloatingLabel } from 'flowbite-react';
import { utils, writeFile } from 'xlsx';

interface PropsTable<T> {
    data: Array<T>;
    columns: Array<ColumnDef<T>>;
    renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
    maxHeight?: number;
    header?: {
        title: string
    };
    shadow?: boolean;
    useInternalPagination?: boolean;
    selectRow?: boolean;
    onValue?: (value: T) => void;
}

export const Table = <T extends object>({ data, columns, useInternalPagination, selectRow, header, maxHeight, shadow, onValue, renderSubComponent }: PropsTable<T>) => {

    const [Columns, setColumns] = useState<ColumnDef<T>[]>(columns);
    const [globalFilter, setGlobalFilter] = useState('');

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const onRowSelect = (value: T) => () => (onValue && selectRow) && onValue(value);

    const table = useReactTable({
        data,
        columns: Columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: useInternalPagination ? setPagination : undefined,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: useInternalPagination ? {
            pagination,
            globalFilter
        } : undefined,
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    });

    const download = useCallback(
        () => {
            // const sanityData = (filter ?? data).slice().map(element => keys.map(({ key }) => key).flatMap(a => a).reduce((acc, current) => ({
            //     ...acc, [current]: typeof element[current] === 'object' ? getElemnt(element[current]) : element[current]
            // }), {}));
            const ws = utils.json_to_sheet(data);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "Data");
            writeFile(wb, `download${1}.xlsx`);
        },
        [],
    );

    useEffect(() => {
        if (selectRow === true) setColumns(columns.filter(f => f.header !== 'action'));
    }, [columns, selectRow]);

    return (
        <div className={`flex flex-col rounded-lg ${shadow ? "shadow-md" : ""} dark:text-slate-300`}>
            {header &&
                <section className={`flex justify-between items-center text-slate-700 bg-slate-200 dark:bg-slate-950 dark:text-slate-300  py-2 px-4 rounded-t-lg`}>
                    <div className='flex justify-between w-full items-start gap-5 pr-5'>
                        <Text className='font-semibold text-xl'>{header.title}</Text>
                        <FloatingLabel className='bg-slate-200 border-slate-400 dark:bg-slate-950 self-end' label='Search all columns...' variant='outlined' value={globalFilter ?? ''} onChange={value => setGlobalFilter(String(value.currentTarget.value))} sizing='sm'/>
                    </div>
                    <div className='flex gap-2'>
                        <IconBtn children={<CloudDownload />} onClick={download} />
                    </div>
                </section>
            }
            <div style={{ maxHeight: maxHeight ?? undefined }} className={`overflow-auto flex-1`}>
                <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse text-balance">
                    <thead className="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-slate-950 dark:text-slate-300 sticky top-0">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan} className="px-6 py-3">
                                            <div
                                                {...{
                                                    className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{ asc: ' 🔺', desc: ' 🔻', }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <tr key={row.id} className="bg-slate-100 border-b dark:bg-gray-900 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800" onClick={onRowSelect(row.original)}>
                                    {
                                        row.getVisibleCells().map(cell => {
                                            return (cell.column.id === 'action')
                                                ?
                                                <td className="px-6 py-2" key={cell.id}>
                                                    {renderSubComponent && renderSubComponent({ row })}
                                                </td>
                                                :
                                                (typeof (cell.getContext().getValue()) === 'boolean')
                                                    ?
                                                    <td className="px-6 py-2 flex items-center gap-1" key={cell.id}>
                                                        <div className={`h-2.5 w-2.5 rounded-full me-2 ${cell.getContext().getValue() ? "bg-green-500" : "bg-red-500"}`} />
                                                        {cell.getContext().getValue() ? "Online" : "Offline"}
                                                    </td>
                                                    :
                                                    <td key={cell.id} className={`px-6 py-2`}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                        }
                                        )
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {useInternalPagination &&
                <div className="flex justify-end items-center p-2 gap-3 text-gray-700 bg-slate-200 dark:bg-slate-950 dark:text-slate-300 rounded-b-lg">
                    <IconBtn className='px-1' children='<<' disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()} />
                    <IconBtn className='px-2' children='<' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                    <IconBtn className='px-2' children='>' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                    <IconBtn className='px-1' children='>>' onClick={() => table.lastPage()} disabled={!table.getCanNextPage()} />
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount().toLocaleString()}
                        </strong>
                    </span>
                    {/* <span className="flex items-center gap-1">
                        | Go to page:
                        <Input
                            classNameContent='scale-up-horizontal-right'
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            styleField={{ height: '35px', width: '80px' }}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                        />
                    </span> */}
                    <select
                        className='rounded-xl'
                        style={{ backgroundColor: 'transparent' }}
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 30, 50, 100, data.length].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize === data.length ? "All " + pageSize : "Show " + pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            }
        </div>
    )
}

