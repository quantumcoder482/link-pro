import React, {useContext, useEffect} from 'react';
import {BiHelpCircle} from 'react-icons/bi';
import ToolTipContext from './ToolTipContext'
import data from './data';

const ToolTipIcon = ({section}) => {

    const {
        setInfoText,
        setInfoTextOpen,
        setInfoLocation,
        infoClicked,
        setInfoClicked,
        triangleRef
    } = useContext(ToolTipContext);

    useEffect(() => {

        function handleScroll() {
            setInfoTextOpen(false);
            setInfoClicked(null)
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    useEffect(() => {

        function handleResize() {
            setInfoTextOpen(false);
            setInfoClicked(null)
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    const handleMouseOver = (e) => {

        const name = e.target.dataset.section;
        const dataText = data.find((text) => text.section === name);
        setInfoText(dataText);
        setInfoTextOpen(true);

        const rect = e.target.getBoundingClientRect();
        const center = (rect.left + rect.right) / 2;
        const top = rect.top - 2;
        setInfoLocation({center, top});

        const triangleTop = rect.top - 20;
        const triangleLeft = rect.left - 1;
        triangleRef.style.top = `${triangleTop}px`;
        triangleRef.style.bottom = `${rect.bottom}px`;
        triangleRef.style.left = `${triangleLeft}px`;
        triangleRef.style.right = `${rect.right}px`;
    }

    const handleClick = (e) => {

        if (!infoClicked) {
            setInfoClicked(e.target);
        } else {
            setInfoClicked(null)
            setInfoTextOpen(false);
            return;
        }

        const name = e.target.dataset.section;
        const dataText = data.find((text) => text.section === name);
        setInfoText(dataText);
        setInfoTextOpen(true);

        const rect = e.target.getBoundingClientRect();
        const center = (rect.left + rect.right) / 2;
        const top = rect.top - 2;
        setInfoLocation({center, top});

        if (infoClicked === false) {
            setInfoClicked(null)
        }
    }

    const handleMouseLeave = () => {
        if (!infoClicked) {
            setInfoTextOpen(false)
        }
    }

    return (
        <div
            className="tooltip_icon"
        >
            <div className="icon_wrap"
                 onMouseLeave={() => {
                     handleMouseLeave()
                 }}
                 onClick={(e) => {
                     handleClick(e)
                     }}
                 onMouseOver={(e) => handleMouseOver(e)}
                 data-section={section}
            >
                <BiHelpCircle />
            </div>

        </div>

    );
};

export default ToolTipIcon;
