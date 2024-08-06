import React from 'react';
import {MdKeyboardArrowUp} from 'react-icons/md';

const AccordionLink = ({
                           type,
                           accordionValue,
                           setAccordionValue,
                           linkText
}) => {

    const handleClick = (e) => {
        e.preventDefault();
        setAccordionValue(type);
    }

    return (
        <a className={`accordion_link ${accordionValue === type && "open"}`} href="#" onClick={(e) => handleClick(e)}>
            {linkText}
            <MdKeyboardArrowUp />
        </a>
    );
};

export default AccordionLink;
