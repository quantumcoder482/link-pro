import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
    getFolderStats,
} from '@/Services/StatsRequests.jsx';

import "react-datepicker/dist/react-datepicker.css";
import Filters from './Filters';
import {isEmpty} from 'lodash';
import Table from './Table';

const FolderStats = ({
                         folderStats,
                         setFolderStats,
                         folderStatsDate,
                         setFolderStatsDate,
                         folderDropdownValue,
                         setFolderDropdownValue,
                         isLoading,
                         setIsLoading,
                         tab
}) => {

    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        if (isEmpty(folderStats)) {
            setIsLoading(true);
            const packets = {
                currentDay: true
            }
            folderStatsCall(packets)
        } else {
            setIsLoading(false);
            setAnimate(false);
        }

    },[])

    const columns = useMemo(
        () => [
            {
                Header: "Current Icons",
                accessor: "icon",
            },
            {
                Header: "Icon Name",
                accessor: "iconName",
            },
            {
                Header: "Icon Clicks",
                accessor: "visits",
            },
        ],[]
    )
    const handleDateChange = (date, type) => {

        let currentStartDate = null;
        let currentEndDate =  null;

        if (type === "start") {
            setFolderStatsDate(prevState => ({
                ...prevState,
                startDate: date
            }));
            currentStartDate = date;
            currentEndDate = folderStatsDate.endDate ? folderStatsDate.endDate : null;
        } else {
            setFolderStatsDate(prevState => ({
                ...prevState,
                endDate: date
            }));
            currentEndDate = date;
            currentStartDate = folderStatsDate.startDate ? folderStatsDate.startDate : null;
        }

        if ( currentEndDate && currentStartDate && (currentStartDate <= currentEndDate) ) {
            setFolderDropdownValue(0);

            const packets = {
                startDate: Math.round(new Date(currentStartDate) / 1000),
                endDate: Math.round(new Date(currentEndDate) /1000),
            }

            folderStatsCall(packets);
        }
    }

    const handleDropdownChange = (e) => {

        setFolderStatsDate({
            startDate: null,
            endData: null
        })

        setFolderDropdownValue(e.target.value);

        const packets = {
            dateValue: e.target.value
        }

        folderStatsCall(packets);
    }

    const folderStatsCall = useCallback((packets) => {

        setAnimate(true);
        getFolderStats(packets)
        .then((data) => {
            if (data["success"]) {
                setTimeout(() => {
                    setFolderStats(data["currentData"]);
                }, 500)
            }
            setAnimate(false)
            setIsLoading(false);
        });

    }, [folderStatsDate])

    return (
        <div className="stats_wrap my_row relative">
            <Filters handleDateChange={handleDateChange}
                     startDate={folderStatsDate.startDate}
                     endDate={folderStatsDate.endDate}
                     handleDropdownChange={handleDropdownChange}
                     dropdownValue={folderDropdownValue}
                     getStats={folderStatsCall}
                     tab={tab}
            />
            {folderStats.length < 1 ?
                <div className="my_row">
                    <div className="my_row labels">
                        <h5>Folder Name</h5>
                        <h5>Folder Clicks</h5>
                    </div>
                    <div className="content_wrap">
                        <h3>No Stats Available</h3>
                    </div>
                </div>
                :
                folderStats.map((item) => {

                    const {id, name, clickCount, links } = item;

                    return (
                        <div className="my_row" key={id}>
                            <div className="my_row labels">
                                <h5>Folder Name</h5>
                                <h5>Folder Clicks</h5>
                            </div>
                            <div className="content_wrap">
                                <div className="my_row title">
                                    <p> {name} </p>
                                    <p className="animate">{clickCount}</p>
                                </div>

                                <div className="table_wrap my_row table-responsive mb-4">
                                    {links?.length > 0 &&
                                        <Table
                                            isLoading={isLoading}
                                            animate={animate}
                                            data={links}
                                            columns={columns}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FolderStats
