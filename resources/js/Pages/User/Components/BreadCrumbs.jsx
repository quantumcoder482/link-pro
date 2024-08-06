import React from 'react';
import {BiChevronLeft} from 'react-icons/bi';

const BreadCrumbs = ({
                         showSection,
                         setShowSection
}) => {

    return (
        <ul className="breadcrumb_list">
            { (showSection.includes("plans") || showSection.includes("cancel") || showSection.includes("methods") ) &&
                <li>
                    <a className="back" href="#" onClick={(e) => {
                        e.preventDefault();
                        setShowSection([])
                    }}>
                        <BiChevronLeft />SETTINGS
                    </a>
                </li>
            }
            { ((showSection.includes("cancel") || showSection.includes("changePlan") || showSection.includes("changePayPalPlan") ) &&
                    showSection.includes("plans") ) &&
                <li>
                    <a className="back" href="#" onClick={(e) => {
                        e.preventDefault();
                        setShowSection(showSection.filter((section) => {
                            return section !== "cancel" && section !== "changePlan" && section !== "changePayPalPlan"
                        }))
                    }}>
                        <BiChevronLeft />PLANS
                    </a>
                </li>
            }
        </ul>
    );
};

export default BreadCrumbs;
