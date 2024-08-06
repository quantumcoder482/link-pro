import React from 'react';
import {MdDragHandle} from 'react-icons/md';
import IOSSwitch from '@/Utils/IOSSwitch.jsx';
import {checkIcon} from '@/Services/UserService.jsx';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const FolderLink = ({
                        link,
                        handleOnClick,
                        handleChange,
                        subStatus
}) => {

    const linkID = link.id;
    let displayIcon;
    displayIcon = checkIcon(link.icon, "edit", subStatus);

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

                    <div className="icon_wrap" onClick={(e) => {
                        handleOnClick(linkID)
                    }}>
                        <div className="image_wrap">
                            <img src={displayIcon} alt=""/>
                        </div>
                    </div>

                    <div className="my_row">
                        <div className="switch_wrap">
                            <IOSSwitch
                                onChange={(e) => handleChange(link)}
                                checked={Boolean(link.active_status)}
                            />
                            <div className="hover_text switch"><p>{Boolean(link.active_status) ? "Deactivate" : "Active"} Icon</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderLink;
