import React from 'react';
import {IoMdAlert} from 'react-icons/io';
import {FaMoneyCheckAlt} from 'react-icons/fa';

const PurchaseCoursePopup = ({purchasePopup, setPurchasePopup}) => {

    const handleClose = e => {
        e.preventDefault();
        setPurchasePopup({
            show: false,
            button_color: "",
            button_text_color: "",
            button_text: "",
            button_link: ""
        })
    }

    return (
        <div id="upgrade_popup" className={ purchasePopup.show ? "open" : "" }>
            <a className="close_popup" href="#" onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </a>
            <div className="box">
                <div className="form_icon_wrap svg" style={{ color: purchasePopup.button_color }}>
                    <FaMoneyCheckAlt />
                </div>
                <h3><span className="option_text">Purchase course now to get access to this video and more!</span></h3>
                <a className="button"
                   href={purchasePopup.button_link}
                   style={{
                       color: purchasePopup.button_text_color,
                       background: purchasePopup.button_color
                    }}
                >
                    {purchasePopup.button_text}
                </a>
            </div>
        </div>
    );
};

export default PurchaseCoursePopup;
