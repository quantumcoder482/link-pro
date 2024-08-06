import React, {createRef, useEffect} from 'react';
import {toUpper} from 'lodash';

const HoverText = ({ text }) => {

    const hoverText = createRef();

    useEffect(() => {

        const width = hoverText.current.clientWidth;
        hoverText.current.style.right = "-" + width + "px";

    },[])

    return (
        <div className="hover_text" ref={hoverText}>
            <p>{toUpper(text)}</p>
        </div>
    );
};

export default HoverText;
