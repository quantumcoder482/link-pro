import React from 'react';
import {Link} from '@inertiajs/react';

const LivePageButton = ({pageName}) => {

    const host = window.location.origin;

    return (
        <a className="button green" target="_blank" href={host + '/' + pageName}>
            Open Live Page
        </a>
    );
};

export default LivePageButton;
