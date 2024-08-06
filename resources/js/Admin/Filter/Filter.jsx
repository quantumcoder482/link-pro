import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {postDate, clearFilters} from '../Services/Admin';

export const Filter = ({
                    getStatsCall = null,
                    filterByValue = null,
                    setFilterByValue = null,
}) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [pathName, setPathName] = useState(window.location.pathname);
    const [dropdownValue, setDropdownValue] = useState(1);

    useEffect(() => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const queryStartDate = urlParams.get('startDate');
        const queryEndDate = urlParams.get('endDate');
        const queryDateValue = urlParams.get('dateValue');
        const clearAll = urlParams.get('clear');

        if (queryStartDate && queryEndDate ) {

            const startDate = new Date(queryStartDate * 1000)
            const endDate = new Date(queryEndDate * 1000)

            setStartDate(startDate);
            setEndDate(endDate);

            setDropdownValue("custom");
        } else if (queryDateValue) {
            setDropdownValue(queryDateValue);
        } else if (clearAll) {
            setDropdownValue("custom");
        } else {

            if (window.location.pathname.includes("users")) {
                setDropdownValue("custom");
            } else {
                setDropdownValue(1);
            }
        }

    },[]);

    const handleDateChange = (date, type) => {

        let currentStartDate = null;
        let currentEndDate =  null;

        if (type === "start") {
            setStartDate(date);
            currentStartDate = date;
            if (endDate) {
                currentEndDate = endDate;
            }
        } else {
            setEndDate(date);
            currentEndDate = date;
            if (startDate) {
                currentStartDate = startDate;
            }
        }

        if ( currentEndDate && currentStartDate && (currentStartDate <= currentEndDate) ) {

            setDropdownValue("custom");
            const startDate = Math.round(new Date(currentStartDate) / 1000);
            const endDate = Math.round(new Date(currentEndDate) /1000);

            const filterValue = filterByValue ? "&filterBy=" + filterByValue : "";

            const url = pathName + '?startDate=' + startDate + "&endDate=" + endDate + filterValue;

            postDate(url);
        }
    }

    const handleDropdownChange = (e) => {
            setStartDate(null);
            setEndDate(null);
            setDropdownValue(e.target.value);
        if (e.target.value !== "custom") {

            const filterValue = filterByValue ? "&filterBy=" + filterByValue : "";
            const url = pathName + "?dateValue=" + e.target.value + filterValue;
            postDate(url);
        }
    }

    const handleOnClick = (e) => {
        e.preventDefault();

        const filterValue = filterByValue ? "&filterBy=" + filterByValue : "";
        const url = pathName + "?clear=all" + filterValue;
        clearFilters(url);
    }

    const handleFilterByChange = (e) => {
        const value = e.target.value;
        setFilterByValue(value);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const filterBy = urlParams?.get('filterBy');

        if (filterBy) {
            urlParams.set('filterBy', value);
            window.location.search = urlParams.toString();
        }

        if (value === "publisher") {
            getStatsCall('/admin/stats/get/publisher')
        } else {
            getStatsCall('/admin/stats/get/offer');
        }

    }

    return (
        <div className="my_row">
            {pathName.includes("affiliate-stats") &&
                <div className="column_wrap filter_by">
                    <div className="column">
                        <select onChange={(e) => handleFilterByChange(e)} value={filterByValue}>
                            <option value="publisher">Stats By Publisher</option>
                            <option value="offer">Stats By Offer</option>
                        </select>
                    </div>
                </div>
            }
            <div className="column_wrap">
                <div className="column">
                    <select onChange={(e) => handleDropdownChange(e)} value={dropdownValue}>
                        <option value="1">Today</option>
                        <option value="2">Yesterday</option>
                        <option value="3">Week To date</option>
                        <option value="4">Month To Date</option>
                        <option value="5">Year To Date</option>
                        <option value="6">Last Week</option>
                        <option value="7">Last Month</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="column">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => handleDateChange(date, "start") }
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={new Date()}
                        placeholderText='Start Date'
                    />
                </div>
                <div className="column">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => handleDateChange(date, "end")}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={new Date()}
                        placeholderText='End Date'
                    />
                </div>
                <div className="column clear">
                    <a className="button blue"
                       onClick={(e) => handleOnClick(e)}
                       href="#">Clear Filters</a>
                </div>
            </div>
        </div>
    )
}

export default Filter;
