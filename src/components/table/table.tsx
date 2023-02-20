import React, {useMemo} from 'react'
import {Cell, HeaderGroup, useFilters, usePagination, useSortBy, useTable} from 'react-table'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {IRateListItem} from "../../hooks/useExchangeRates";

const Table = (props: { items: any, config: any }) => {
    const {items, config} = props;

    const data = useMemo(() => items.filter((item: any) => item.key !== "btc"), [items]);
    const bitcoin = useMemo(() => items.find((item: any) => item.key === "btc"), [items]);

    const tableInstance: any = useTable({
        columns: config || [],
        data,
        initialState: ({
            pageIndex: 0,
            pageSize: 5
        }) as any,

    }, useFilters, useSortBy, usePagination)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: {pageIndex}
    } = tableInstance;

    const bitcoinTableInstance = useTable({columns: config, data: bitcoin ? [bitcoin] : []})
    const {rows, prepareRow: prepateBitcoin} = bitcoinTableInstance;
    return (<>
            <MaUTable {...getTableProps()} className={"table"}>
                <TableHead>
                    {// Loop over the header rows
                        headerGroups.map((headerGroup: HeaderGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        // @ts-ignore
                                        <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {// Render the header
                                                column.render('Header')}
                                            {/* Add a sort direction indicator */}
                                            <span>
                                            {/*@ts-ignore*/}
                                                {column.isSorted ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))}
                </TableHead>
                {/* Apply the table body props */}
                <TableBody {...getTableBodyProps()}>
                    {
                        <>
                            {
                                [
                                    {key: "fixedItem", items: rows, prepare: prepateBitcoin},
                                    {key: "listItem", items: page, prepare: prepareRow}
                                ].map(
                                    ({items, prepare, key}) => {
                                        return <>{
                                            items.map((row: any, index: number) => {
                                                prepare(row)
                                                const keyProp = `${row.getRowProps().key}${key}`;
                                                const rowProps = {...row.getRowProps(), key: keyProp};
                                                return (
                                                    // Apply the row props
                                                    <TableRow {...rowProps}>
                                                        {// Loop over the rows cells
                                                            row.cells.map((cell: Cell) => {
                                                                // Apply the cell props
                                                                const tableCellKey = `${cell?.getCellProps().key}${key}`;
                                                                const tableCellProps = {...cell?.getCellProps(), key: tableCellKey};
                                                                return (
                                                                    <TableCell {...tableCellProps}>
                                                                        {// Render the cell contents
                                                                            cell?.render('Cell')
                                                                        }
                                                                    </TableCell>
                                                                )
                                                            })}
                                                    </TableRow>
                                                )
                                            })}
                                        </>
                                    }
                                )
                            }
                        </>
                    }
                </TableBody>
            </MaUTable>
            <div className="pagination">
                <button key={"first"} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                {' '}
                <button key={"previous"} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                {' '}
                <span>
                    Page{' '}
                    <span className={"underline"}>{pageIndex + 1}</span>
                    {' '}
                    of {pageOptions.length}{' '}
                </span>
                {' '}
                <button key={"next"} onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                {' '}
                <button key={"last"} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </>
    )
}

export function TableView(props: { items: IRateListItem[] }) {
    const {items} = props;
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Kürzel',
                accessor: 'unit',
            },
            {
                Header: 'Tauschrate - 1 BTC',
                accessor: 'value'
            }
        ],
        []
    )
    return (
        <>
            <CssBaseline key={"tab"}/>
            <Table config={columns} items={items}/>
        </>
    )
}
