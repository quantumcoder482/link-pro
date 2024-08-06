import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import RefreshButton from './RefreshButton';
import {FaRegCalendarAlt} from 'react-icons/fa';
export const Filters = ({
                            handleDateChange,
                            startDate,
                            endDate,
                            handleDropdownChange,
                            dropdownValue,
                            getStats,
                            tab,
                            filterByValue = null,
                            setFilterByValue = null
}) => {

    const handleFilterByChange = (e) => {

        let url = "";
        if (e.target.value === "offer") {
            url = '/stats/get/offer'
        } else if (e.target.value === "publisher") {
            url = '/stats/get/publisher'
        }

        setFilterByValue(e.target.value);

        let packets;

        if (dropdownValue > 0) {
            packets = {
                dateValue: dropdownValue
            }
        } else {
            packets = {
                startDate: Math.round(new Date(startDate) / 1000),
                endDate: Math.round(new Date(endDate) /1000),
            }
        }

        getStats(packets, url);
    }

    return (
        <>
            {tab === "affiliate" &&
                <div className="my_row filter filter_by">
                    <div className="column">
                        <select onChange={(e) => handleFilterByChange(e)} value={filterByValue}>
                            <option value="offer">Stats by Offer</option>
                            <option value="publisher">Stats by Publisher</option>
                        </select>
                    </div>
                    <div className="column">
                        <RefreshButton
                            startDate={startDate}
                            endDate={endDate}
                            dropdownValue={dropdownValue}
                            getStats={getStats}
                            filterByValue={filterByValue}
                        />
                    </div>
                </div>
            }
            <div className={`my_row filter ${tab}_tab`}>
                <div className="column">
                    <select onChange={(e) => handleDropdownChange(e)} value={dropdownValue}>
                        <option value="1">Today</option>
                        <option value="2">Yesterday</option>
                        <option value="3">Week To date</option>
                        <option value="4">Month To Date</option>
                        <option value="5">Year To Date</option>
                        <option value="6">Last Week</option>
                        <option value="7">Last Month</option>
                        <option value="0">Custom</option>
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
                    <FaRegCalendarAlt />
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
                    <FaRegCalendarAlt />
                </div>
                {tab !== "affiliate" &&
                    <div className="column">
                        <RefreshButton
                            startDate={startDate}
                            endDate={endDate}
                            dropdownValue={dropdownValue}
                            getStats={getStats}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default Filters
