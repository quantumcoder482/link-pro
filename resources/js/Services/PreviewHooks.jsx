import {useLayoutEffect, useState, useEffect} from 'react';

export function UseLoadPreviewHeight (altPxToMinus = null) {

    let [previewHeight, setPreviewHeight] = useState(null);

    useLayoutEffect(() => {
        setPreviewHeight(resizePreviewHeight(altPxToMinus));
    }, []);

    return previewHeight
}

export function UseResizePreviewHeight(altPxToMinus = null) {

    let [previewHeight, setPreviewHeight] = useState(null);

    useLayoutEffect(() => {

        function handlePreviewHeight() {
            setPreviewHeight(resizePreviewHeight(altPxToMinus))
        }

        window.addEventListener('resize', handlePreviewHeight);
        return () => {
            window.removeEventListener('resize', handlePreviewHeight);
        }
    }, []);

    return previewHeight
}

function resizePreviewHeight(altPxToMinus) {
    const windowWidth = window.outerWidth;

    const innerContent = document.getElementById('preview_wrap');

    let pixelsToMinus;
    if (windowWidth > 551) {
        pixelsToMinus = altPxToMinus || 30
    } else {
        pixelsToMinus = 20;
    }

    return innerContent.offsetHeight - pixelsToMinus;
}
