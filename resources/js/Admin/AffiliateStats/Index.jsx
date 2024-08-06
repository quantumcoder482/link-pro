import React from 'react';
import ReactDOM from 'react-dom';
import {AffiliateStats} from './AffiliateStats.jsx';
import { createRoot } from 'react-dom/client';

if (document.getElementById('admin_affiliate_stats')) {

    const domNode = document.getElementById('admin_affiliate_stats');
    const root = createRoot(domNode);

    root.render(
        <React.StrictMode>
            <AffiliateStats />
        </React.StrictMode>)

}
