import React from 'react';
import {Link} from '@inertiajs/react';
export const UpgradePopup = ({showUpgradePopup, setShowUpgradePopup}) => {

    const handleClose = e => {
        e.preventDefault();
        setShowUpgradePopup({
            show: false,
            text: ""
        })
    }

    return (

        <div id="upgrade_popup" className="open">
            <a className="close_popup" href="#" onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </a>
            <div className="box">
                <div className="form_icon_wrap image">
                    <img src={Vapor.asset('images/icon_uparrow.png')} alt=""/>
                </div>
                <h2>Upgrade Now</h2>
                <h3>Upgrade to <span className="option_text">{ showUpgradePopup.text }</span> and much more!</h3>
                <Link className="button blue" href={route('plans.get')}>Learn More</Link>
            </div>
        </div>

    )
}
