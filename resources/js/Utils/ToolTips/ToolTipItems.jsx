import data from './data';
import {Link, scroller} from 'react-scroll';

export const displayInfoBox = (
    e,
    setInfoText,
    setInfoTextOpen,
    setInfoLocation,
    setInfoClicked,
    infoClicked = false,
    triangleRef = null,
) => {

    if (infoClicked === null) {
        setInfoClicked(e.target);
    } else if (infoClicked) {
        setInfoClicked(null)
        setInfoTextOpen(false);

        //return;
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

export const closeInfoBox = (setInfoTextOpen, clicked, setInfoClicked = null) => {
    if(!clicked) {
        setInfoTextOpen(false)

        if(setInfoClicked) {
            setInfoClicked(null);
        }
    }
}

export const infoScrollPosition = (setInfoLocation, clicked) => {
    const rect = clicked?.getBoundingClientRect();
    const center = (rect?.left + rect?.right) / 2;
    const top = rect?.top - 2;
    setInfoLocation({center, top});
}

/*
export const toolTipClick = (index, infoIndex, setInfoIndex, infoDiv = null) => {

    if (index === infoIndex) {
        setInfoIndex(null);
    } else if (index === 6) {
        setInfoIndex(index);
    } else {
        setInfoIndex(index);
        if (!isInViewport(infoDiv?.current)) {
            scroller.scrollTo('infoText' + index, {
                duration: 1000,
                smooth: true,
            })
        }
    }
}
*/

const isInViewport = (infoDiv) => {

    const rect = infoDiv.getBoundingClientRect();

    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

}
