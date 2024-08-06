import React, {
    useState,
    useEffect,
    useCallback,
    Fragment,
    useMemo,
} from 'react';
import {
    getAffiliateStats,
} from '@/Services/StatsRequests.jsx';
import Filters from './Filters';
import {isEmpty} from 'lodash';
import Table from './Table';

const AffiliateStats = ({
                            affiliateStats,
                            setAffiliateStats,
                            totals,
                            setTotals,
                            statsDate,
                            setStatsDate,
                            dropdownValue,
                            setDropdownValue,
                            filterByValue,
                            setFilterByValue,
                            isLoading,
                            setIsLoading,
                            tab
}) => {

    const [animate, setAnimate] = useState(true);

    useEffect(() => {

        if (isEmpty(affiliateStats)) {
            setIsLoading(true);
            const packets = {
                currentDay: true
            }

            getStatsCall(packets, '/stats/get/offer')
        } else {
            setIsLoading(false);
            setAnimate(false);
        }

    },[]);

    const offerColumns = useMemo(
        () => [
            {
                Header: "Offer",
                accessor: "icon",
            },
            {
                Header: "Raw Clicks",
                accessor: "rawCount",
            },
            {
                Header: "Unique Clicks",
                accessor: "uniqueCount",
            },
            {
                Header: "Conversions",
                accessor: "conversionCount",
            },
            {
                Header: "Payout",
                accessor: "payout",
            },
        ],[]
    )

    const publisherColumns = useMemo(
        () => [
            {
                Header: "Publisher",
                accessor: "name",
            },
            {
                Header: "Raw Clicks",
                accessor: "rawCount",
            },
            {
                Header: "Unique Clicks",
                accessor: "uniqueCount",
            },
            {
                Header: "Conversions",
                accessor: "conversionCount",
            },
            {
                Header: "Payout",
                accessor: "payout",
            },
        ],[]
    )

    const handleDateChange = (date, type) => {

        let currentStartDate;
        let currentEndDate;

        if (type === "start") {
            setStatsDate(prevState => ({
                ...prevState,
                startDate: date
            }));
            currentStartDate = date;
            currentEndDate = statsDate.endDate ? statsDate.endDate : null;

        } else {
            setStatsDate(prevState => ({
                ...prevState,
                endDate: date
            }));
            currentEndDate = date;
            currentStartDate = statsDate.startDate ? statsDate.startDate : null;
        }

        if ( currentEndDate && currentStartDate && (currentStartDate <= currentEndDate) ) {

            setDropdownValue(0);
            const packets = {
                startDate: Math.round(new Date(currentStartDate) / 1000),
                endDate: Math.round(new Date(currentEndDate) /1000),
            }
            let url = "";
            if (filterByValue === "offer") {
                url = '/stats/get/offer'
            } else if (filterByValue === "publisher") {
                url = '/stats/get/publisher'
            }

            console.log("packets: ", packets);
            getStatsCall(packets, url)
        }
    }

    const handleDropdownChange = (e) => {

        if (e.target.value !== 0) {

            setStatsDate({
                startDate: null,
                endDate: null
            })
            setDropdownValue(e.target.value);

            const packets = {
                dateValue: e.target.value
            }

            let url = "";
            if (filterByValue === "offer") {
                url = '/stats/get/offer'
            } else if (filterByValue === "publisher") {
                url = '/stats/get/publisher'
            }

            getStatsCall(packets, url)
        }
    }

    const getStatsCall = useCallback((packets, url) => {
        setAnimate(true)

        getAffiliateStats(url, packets).then((data) => {
            if (data["success"]) {
                setTimeout(() => {
                    setAffiliateStats(data["affiliateData"])
                    setTotals(data["totals"]);
                }, 500)
            }

            setAnimate(false)
            setIsLoading(false);
        });

    },[statsDate]);

    return (

        <div className={`stats_wrap my_row ${tab}`}>
            <Filters
                handleDateChange={handleDateChange}
                startDate={statsDate.startDate}
                endDate={statsDate.endDate}
                handleDropdownChange={handleDropdownChange}
                dropdownValue={dropdownValue}
                getStats={getStatsCall}
                tab={tab}
                filterByValue={filterByValue}
                setFilterByValue={setFilterByValue}
            />

            <div className="table_wrap my_row table-responsive">

                <Table
                    isLoading={isLoading}
                    animate={animate}
                    totals={totals}
                    data={affiliateStats}
                    columns={filterByValue === "offer" ? offerColumns : publisherColumns}
                />

            </div>
        </div>
    )
};

export default AffiliateStats;
