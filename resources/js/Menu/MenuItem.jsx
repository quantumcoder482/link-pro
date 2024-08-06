import React from 'react';
import {isEmpty, toUpper} from 'lodash';
import HoverText from '../Utils/HoverText';
import {Link} from '@inertiajs/react';

const MenuItem = ({
                      item,
                      userPermissions,
                      isHovering,
                      isOpen,
                      handleMouseOver,
                      handleMouseOut,
                      courseData,
                      defaultPage
}) => {

    const {id, name, url, icon, permission} = item;

    return (
        ( (userPermissions?.includes(permission) || permission === "all") && id !== "pre_register") ||
        (id === "pre_register" && !userPermissions?.includes("view dashboard") ) ||
        (id === "settings" && !isEmpty(userPermissions)) ?
            <li>
                <Link id={id}
                   style={courseData && {color: courseData["header_text_color"]}}
                   href={ (name === "pages" && defaultPage) ? url + defaultPage : url}
                   onMouseOver={() => handleMouseOver(name)}
                   onMouseOut={handleMouseOut}
                >
                    <span className="menu_icon" style={courseData &&
                        {color: courseData["header_text_color"]}}>
                        {icon}
                    </span>
                    <span className="text">{toUpper(name)}</span>
                </Link>
                {(!isOpen && isHovering.status && isHovering.section === name) ?
                    <HoverText text={name}/>
                    :
                    ""
                }
            </li>
            :
            ""
    );
};

export default MenuItem;
