import "./custom.js";

import React from "react";
import AffiliateStats from "./AffiliateStats/AffiliateStats.jsx";
import { Filter } from "./Filter/Filter.jsx";
import { createRoot } from "react-dom/client";

if (document.getElementById("admin_affiliate_stats")) {
    const domNode = document.getElementById("admin_affiliate_stats");
    const root = createRoot(domNode);
    root.render(
        <React.StrictMode>
            <AffiliateStats />
        </React.StrictMode>,
    );
}
/* import './AffiliateStats';
import './Filter'; */

if (document.getElementById("admin_filters")) {
    const domNode = document.getElementById("admin_filters");
    const root = createRoot(domNode);

    root.render(
        <React.StrictMode>
            <Filter />
        </React.StrictMode>,
    );
}
