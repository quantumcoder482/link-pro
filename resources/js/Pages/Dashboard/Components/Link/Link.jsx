import React from 'react';
import {MdDragHandle} from 'react-icons/md';
import {checkIcon} from '@/Services/UserService.jsx';
import IOSSwitch from '@/Utils/IOSSwitch.jsx';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
const Link = ({
                  link,
                  handleOnClick,
                  fetchFolderLinks,
                  handleChange,
                  subStatus
}) => {

    const type = link.type || null;
    const linkID = link.id;
    let hasLinks = true;
    let displayIcon;
    if (type === "folder") {
        hasLinks = link.links.length > 0;
    } else {
        displayIcon = checkIcon(link.icon, "", subStatus);
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: link.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
             className="grid_item"
             ref={setNodeRef}
             style={style}
        >
            <div className="icon_col">
                <span className="drag_handle"
                      {...attributes}
                      {...listeners}
                >
                    <MdDragHandle/>
                    <div className="hover_text"><p>Move</p></div>
                </span>

                <div className="column_content">
                    {type === "folder" ?
                        <div className="icon_wrap folder">
                            <div className="inner_icon_wrap" onClick={(e) => {
                                fetchFolderLinks(linkID)
                            }}>
                                <img src={Vapor.asset('images/blank-folder-square.jpg')} alt=""/>
                                <div className={hasLinks ?
                                    "folder_icons main" :
                                    "folder_icons empty"}>
                                    {hasLinks && link.links.slice(
                                        0, 9).map((innerLink, index) => {

                                        const {
                                            id,
                                            icon
                                        } = innerLink;

                                        return (
                                            <div className="image_col" key={index}>
                                                <img src={checkIcon(icon, "", subStatus)} alt=""/>
                                            </div>
                                        )
                                    })
                                    }
                                    {!hasLinks &&
                                        <p><span>+</span> <br/>Add<br/>Icons
                                        </p>}
                                </div>

                            </div>
                        </div>
                        :
                        <div className="icon_wrap" onClick={(e) => {
                            handleOnClick(linkID)
                        }}>
                            <div className="image_wrap">
                                <img src={displayIcon} alt=""/>
                            </div>
                        </div>
                    }
                    <div className="my_row">
                        <div className="switch_wrap">
                            <IOSSwitch
                                onChange={() => handleChange(link, hasLinks, type)}
                                checked={Boolean(link.active_status)}
                            />
                            <div className="hover_text switch">
                                <p>
                                    {Boolean(link.active_status) ? "Disable" : "Enable"}
                                    {type === "folder" ? "Folder" : "Icon"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Link;
