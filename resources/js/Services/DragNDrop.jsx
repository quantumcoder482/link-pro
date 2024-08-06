import {useCallback, useContext} from 'react';
import {UserLinksContext} from '../Pages/Dashboard/Dashboard.jsx';

export const gridLayout = (width, height) => {

    const { userLinks, setUserLinks } = useContext(UserLinksContext);

    let array = [];

    userLinks.map((link, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        array.push(width * col, height * row)
    });

    return array;
}

export const handleMouseDown = useCallback (
    (key, [pressX, pressY], { pageX, pageY }, setState) => {
        setState((state) => ({
            ...state,
            lastPress: key,
            isPressed: true,
            mouseCircleDelta: [pageX - pressX, pageY - pressY],
            mouseXY: [pressX, pressY],
        }));
    },
    []
);
