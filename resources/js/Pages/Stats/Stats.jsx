import React, {useEffect, useState} from 'react';

import PageStats from './Components/PageStats';
import LinkStats from './Components/LinkStats';
import FolderStats from './Components/FolderStats';
import AffiliateStats from './Components/AffiliateStats';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';

function Stats() {

    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState("page");
    const [pageStats, setPageStats] = useState([])
    const [linkStats, setLinkStats] = useState([])
    const [deletedStats, setDeletedStats] = useState([]);
    const [folderStats, setFolderStats] = useState([])
    const [affiliateStats, setAffiliateStats] = useState([]);
    const [affiliateTotals, setAffiliateTotals] = useState([]);

    const [linkStatsDate, setLinkStatsDate] = useState({
        startDate: null,
        endDate: null
    });
    const [pageStatsDate, setPageStatsDate] = useState({
        startDate: null,
        endDate: null
    });
    const [folderStatsDate, setFolderStatsDate] = useState({
        startDate: null,
        endDate: null
    });
    const [affiliateStatsDate, setAffiliateStatsDate] = useState({
        startDate: null,
        endDate: null
    });

    const [pageDropdownValue, setPageDropdownValue] = useState(1);
    const [linkDropdownValue, setLinkDropdownValue] = useState(1);
    const [folderDropdownValue, setFolderDropdownValue] = useState(1);
    const [affiliateDropdownValue, setAffiliateDropdownValue] = useState(1);
    const [filterByValue, setFilterByValue] = useState("offer");

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleClick = e => {
        e.preventDefault();
        setTab(e.target.dataset.tab);
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {

        function windowSize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', windowSize);

        return () => {
            window.removeEventListener('resize', windowSize);
        }

    }, [windowWidth]);

    return (

        <AuthenticatedLayout>

            <Head title={"Stats"} />

            <div className="container" id="stats_page">

                <div className="my_row form_page stats">
                    <h2 className="page_title text-center">Stats</h2>
                    <div className="card flex relative">
                        {isLoading &&
                            <div id="loading_spinner" className="active">
                                <div >
                                    <img src={Vapor.asset('images/spinner.svg')} alt="" />
                                </div>
                            </div>
                        }
                        <div id="stats" className="my_row">
                            <div className="tabs_wrap">
                                <div className="my_row tab_nav">
                                    <div className={`tab ${tab === "page" ? "active" : "" }` }>
                                        <a href="#" className="tab_link" data-tab="page" onClick={(e) => { handleClick(e) } }>
                                            Page Stats
                                        </a>
                                        { windowWidth < 551 && tab === "page" ?
                                            <PageStats
                                                pageStats={pageStats}
                                                setPageStats={setPageStats}
                                                pageStatsDate={pageStatsDate}
                                                setPageStatsDate={setPageStatsDate}
                                                pageDropdownValue={pageDropdownValue}
                                                setPageDropdownValue={setPageDropdownValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className={`tab ${tab === "icon" ? "active" : "" }` }>
                                        <a href="#" className="tab_link" data-tab="icon" onClick={(e) => { handleClick(e) } }>
                                            Icon Stats
                                        </a>
                                        {tab ==="icon" && windowWidth < 551 ?
                                            <LinkStats
                                                linkStats={linkStats}
                                                setLinkStats={setLinkStats}
                                                deletedStats={deletedStats}
                                                setDeletedStats={setDeletedStats}
                                                linkStatsDate={linkStatsDate}
                                                setLinkStatsDate={setLinkStatsDate}
                                                linkDropdownValue={linkDropdownValue}
                                                setLinkDropdownValue={setLinkDropdownValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className={`tab ${tab === "folder" ? "active" : "" }` }>
                                        <a href="#" className="tab_link" data-tab="folder" onClick={(e) => { handleClick(e) } }>
                                            Folder Stats
                                        </a>
                                        {tab === "folder" && windowWidth < 551 ?
                                            <FolderStats
                                                folderStats={folderStats}
                                                setFolderStats={setFolderStats}
                                                folderStatsDate={folderStatsDate}
                                                setFolderStatsDate={setFolderStatsDate}
                                                folderDropdownValue={folderDropdownValue}
                                                setFolderDropdownValue={setFolderDropdownValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className={`tab ${tab === "affiliate" ? "active" : "" }` } >
                                        <a href="#" className="tab_link" data-tab="affiliate" onClick={(e) => { handleClick(e) } }>
                                            Affiliate Stats
                                        </a>
                                        {tab === "affiliate" && windowWidth < 551 ?
                                            <AffiliateStats
                                                affiliateStats={affiliateStats}
                                                setAffiliateStats={setAffiliateStats}
                                                totals={affiliateTotals}
                                                setTotals={setAffiliateTotals}
                                                statsDate={affiliateStatsDate}
                                                setStatsDate={setAffiliateStatsDate}
                                                dropdownValue={affiliateDropdownValue}
                                                setDropdownValue={setAffiliateDropdownValue}
                                                filterByValue={filterByValue}
                                                setFilterByValue={setFilterByValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                            :
                                            ""
                                        }
                                    </div>
                                </div>

                                { windowWidth > 550 &&
                                    <>
                                        {tab === "page" &&
                                            <PageStats
                                                pageStats={pageStats}
                                                setPageStats={setPageStats}
                                                pageStatsDate={pageStatsDate}
                                                setPageStatsDate={setPageStatsDate}
                                                pageDropdownValue={pageDropdownValue}
                                                setPageDropdownValue={setPageDropdownValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                        }
                                        {tab ==="icon" &&
                                            <LinkStats
                                                linkStats={linkStats}
                                                setLinkStats={setLinkStats}
                                                deletedStats={deletedStats}
                                                setDeletedStats={setDeletedStats}
                                                linkStatsDate={linkStatsDate}
                                                setLinkStatsDate={setLinkStatsDate}
                                                linkDropdownValue={linkDropdownValue}
                                                setLinkDropdownValue={setLinkDropdownValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                        }

                                        {tab === "folder" &&
                                            <FolderStats
                                                folderStats={folderStats}
                                                setFolderStats={setFolderStats}
                                                folderStatsDate={folderStatsDate}
                                                setFolderStatsDate={setFolderStatsDate}
                                                folderDropdownValue={folderDropdownValue}
                                                setFolderDropdownValue={setFolderDropdownValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                        }

                                        {tab === "affiliate" &&
                                            <AffiliateStats
                                                affiliateStats={affiliateStats}
                                                setAffiliateStats={setAffiliateStats}
                                                totals={affiliateTotals}
                                                setTotals={setAffiliateTotals}
                                                statsDate={affiliateStatsDate}
                                                setStatsDate={setAffiliateStatsDate}
                                                dropdownValue={affiliateDropdownValue}
                                                setDropdownValue={setAffiliateDropdownValue}
                                                filterByValue={filterByValue}
                                                setFilterByValue={setFilterByValue}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                tab={tab}
                                            />
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    )
}

export default Stats;
