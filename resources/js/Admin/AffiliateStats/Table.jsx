import React, {useState} from 'react';
import { useTable, useSortBy } from 'react-table';
import {FaSort, FaSortDown, FaSortUp} from 'react-icons/fa';
import {isEmpty} from 'lodash';

export const Table = ({
                   isLoading,
                   animate,
                   data,
                   columns,
                   totals
}) => {

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable(
        {
            columns,
            data: data ? data : null
        },
        useSortBy
    );

    return (
        <table className="table table-borderless" {...getTableProps()}>
            <thead>
            {headerGroups?.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            <h5>
                                <span>{column.render("Header")}</span>
                                {
                                    column.isSorted
                                        ? column.isSortedDesc
                                            ? <FaSortDown />
                                            : <FaSortUp />
                                        : <FaSort />
                                }
                            </h5>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {isEmpty(data) ?
                <tr>
                    <td className={ isLoading ? "hidden no_stats" : "no_stats"} colSpan="5"><h3>No Stats Available</h3></td>
                </tr>
                :
                <>
                    {rows?.map((row, index) => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={index}>
                                <tr key={index} {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                { (cell.column.Header === "Offer" || cell.column.Header === "Current Icons") ?
                                                    <img src={cell.value} alt=""/>
                                                    :
                                                    <p className={`${animate ? "animate hide" : "animate"}`}>{cell.render("Cell")}</p>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                            </React.Fragment>
                        )
                    })}
                    {totals &&
                        <tr className="totals">
                            <td><h3>Totals</h3></td>
                            <td><h3 className={`${animate ? "animate hide" : "animate"}`}>{totals["totalRaw"]}</h3></td>
                            <td><h3 className={`${animate ? "animate hide" : "animate"}`}>{totals["totalUnique"]}</h3></td>
                            <td><h3 className={`${animate ? "animate hide" : "animate"}`}>{totals["totalConversions"]}</h3></td>
                            <td><h3 className={`${animate ? "animate hide" : "animate"}`}>${totals["totalPayout"]}</h3></td>
                        </tr>
                    }
                </>
            }
            </tbody>
        </table>
    );
};

export default Table;
