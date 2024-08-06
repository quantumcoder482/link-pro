import {useCallback, useEffect, useMemo, useState} from 'react';
import {getAffiliateStats} from '../../Services/StatsRequests';
import Table from './Table';
import Filter from '../Filter/Filter';

export const AffiliateStats = () => {

    const [stats, setStats] = useState([]);
    const [totals, setTotals] = useState([]);
    const [statsDate, setStatsDate] = useState({
        startDate: null,
        endDate: null
    });

    const [isLoading, setIsLoading] = useState(true);
    const [animate, setAnimate] = useState(true);
    const [filterByValue, setFilterByValue] = useState("publisher");

    useEffect(() => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const filterBy = urlParams.get('filterBy');

        if (filterBy) {
            setFilterByValue(filterBy)

            if (filterBy === "offer") {
                affiliateStatsCall("/admin/stats/get/offer");
            } else {
                affiliateStatsCall("/admin/stats/get/publisher");
            }
        } else {
            affiliateStatsCall("/admin/stats/get/publisher");
        }

    },[]);

    const pubColumns = useMemo(
        () => [
            {
                Header: "Affiliate",
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

    const offerColumns = useMemo(
        () => [
            {
                Header: "Offer Name",
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

    const affiliateStatsCall = useCallback((url) => {
        setAnimate(true)

        const packets = getDatePackets();

        getAffiliateStats(url, packets)
        .then((data) => {
            if (data["success"]) {
                setTimeout(() => {
                    setStats(data["affiliateData"])
                    setTotals(data["totals"]);
                    setAnimate(false)
                    setIsLoading(false);

                }, 500)
            } else {
                setAnimate(false)
                setIsLoading(false);
            }
        });

    }, [statsDate])

    const getDatePackets = () => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const queryStartDate = urlParams.get('startDate');
        const queryEndDate = urlParams.get('endDate');
        const queryDateValue = urlParams.get('dateValue');
        const clearAll = urlParams.get('clear');

        let packets = {};
        if (queryStartDate && queryEndDate ) {

            setStatsDate(() => ({
                startDate: queryStartDate,
                endDate: queryEndDate
            }));

            packets = {
                startDate: queryStartDate,
                endDate: queryEndDate
            }

        } else if (queryDateValue) {

            packets = {
                dateValue: queryDateValue
            }

        } else if (clearAll) {

            packets = {
                clear: true
            }

        } else {

            packets = {
                currentDay: true
            }

        }

        return packets;
    }

    return (
        <div className="my_row">

            <div id="admin_filters">
                <Filter
                    getStatsCall={affiliateStatsCall}
                    filterByValue={filterByValue}
                    setFilterByValue={setFilterByValue}
                />
            </div>

            <div className="table-responsive">
                <Table
                    columns={filterByValue === "publisher" ? pubColumns : offerColumns}
                    data={stats}
                    isLoading={isLoading}
                    animate={animate}
                    totals={totals}
                />
            </div>
        </div>
    )
}
export default AffiliateStats;
