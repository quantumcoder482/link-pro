import React, {useEffect, useMemo, useState} from 'react';
import {isEmpty} from 'lodash';
import {HiMinusSm, HiOutlinePlusSm} from 'react-icons/hi';
import {FaSort, FaSortDown, FaSortUp} from 'react-icons/fa';
import { useTable, useSortBy } from 'react-table';

const Table = ({
                   totals = null,
                   isLoading,
                   animate,
                   data,
                   columns
}) => {

    const [openIndex, setOpenIndex] = useState([]);

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

    const handleRowClick = (rowIndex) => {

        if(openIndex.includes(rowIndex)) {
            const newArrayIndex = openIndex.filter(element => element !== rowIndex)
            setOpenIndex(newArrayIndex)
        } else {
            const newArrayIndex = openIndex.concat(rowIndex);
            setOpenIndex(newArrayIndex);
        }
    }

    return (
        <table className="w-full table rounded-t-sm table-borderless" {...getTableProps()}>
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
                        //const {icon, rawClicks, uniqueClicks, conversions, payout, userStats} = row;
                        /**/
                        return (
                            <React.Fragment key={index}>
                                <tr key={index} {...row.getRowProps()} className={row.original.userStats?.length > 0 ? "no_border" : ""}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                { (cell.column.Header === "Offer" || cell.column.Header === "Current Icons" || cell.column.Header === "Past Icons") ?
                                                    <img src={cell.value} alt=""/>
                                                    :
                                                    <p className={`${animate ? "animate hide" : "animate"}`}>{cell.column.Header === "Payout" && "$"}{cell.render("Cell")}</p>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                                {row.original.userStats?.length > 0 &&
                                    <tr>
                                        <td colSpan="5">
                                            <table className="table table-borderless user_stats w-full">
                                                <thead>
                                                <tr onClick={(e) => handleRowClick(index)}>
                                                    <th scope="col">
                                                        <h5>Stats By Publisher</h5>
                                                    </th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                    <th scope="col">{ openIndex.includes(index) ? <HiMinusSm /> : <HiOutlinePlusSm />}</th>
                                                </tr>
                                                </thead>
                                                <tbody className={openIndex.includes(index) ? "open" : ""}>

                                                {row.original.userStats.map((user, index) => {

                                                    const {name, rawCount, uniqueCount, conversionCount, payout} = user;

                                                    return (

                                                        <tr key={index}>
                                                            <td>
                                                                <p className={`${animate ? "animate hide" : "animate"}`}>{name}</p>
                                                            </td>
                                                            <td>
                                                                <p className={`${animate ? "animate hide" : "animate"}`}>{rawCount}</p>
                                                            </td>
                                                            <td>
                                                                <p className={`${animate ? "animate hide" : "animate"}`}>{uniqueCount}</p>
                                                            </td>
                                                            <td>
                                                                <p className={`${animate ? "animate hide" : "animate"}`}>{conversionCount}</p>
                                                            </td>
                                                            <td>
                                                                <p className={`${animate ? "animate hide" : "animate"}`}>{"$"}{payout}</p>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                }
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
