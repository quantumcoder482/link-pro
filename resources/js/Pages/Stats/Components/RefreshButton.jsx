import React from 'react';
import { BiRefresh } from "react-icons/bi";

const RefreshButton = ({
                           startDate,
                           endDate,
                           dropdownValue,
                           getStats,
                           filterByValue = null,
}) => {

    const handleClick = (e) => {
        e.preventDefault();

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

        if (filterByValue) {
            let url = "";
            if (filterByValue === "offer") {
                url = '/stats/get/offer'
            } else if (filterByValue === "publisher") {
                url = '/stats/get/publisher'
            }
            getStats(packets, url);
        } else {
            getStats(packets);
        }
    }

    return (

        <a className="refresh_button" href="#" onClick={(e) => handleClick(e)}>
            <BiRefresh />
        </a>

    );
};

export default RefreshButton;
