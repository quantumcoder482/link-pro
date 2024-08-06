import React, {
    useRef,
    useContext,
} from 'react';
import Link from './Link';
import {
    UserLinksContext,
    FolderLinksContext,
} from '../../Dashboard.jsx';
import {
    updateLinksPositions,
    updateLinkStatus,
} from '@/Services/LinksRequest.jsx';
import EventBus from '@/Utils/Bus';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy
} from '@dnd-kit/sortable';

import {
    LINKS_ACTIONS,
    FOLDER_LINKS_ACTIONS,
} from '@/Services/Reducer.jsx';

const Links = ({
                   setEditID,
                   setEditFolderID,
                   setRow,
                   setValue,
                   setShowUpgradePopup,
                   subStatus,
                   setAccordionValue
}) => {

    const { userLinks, dispatch } = useContext(UserLinksContext);
    const { dispatchFolderLinks } = useContext(FolderLinksContext);

    const targetRef = useRef(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleChange = (currentItem, hasLinks, type) => {

        if(hasLinks) {

            if ((currentItem.type && currentItem.type === "folder") && !subStatus) {
                setShowUpgradePopup({
                    show: true,
                    text: "enable your folders"
                });
            } else {
                const newStatus = !currentItem.active_status;

                let url = "";

                if (currentItem.type && currentItem.type === "folder") {
                    url = "/dashboard/folder/status/";
                } else {
                    url = "/dashboard/links/status/"
                }

                const packets = {
                    active_status: newStatus,
                };

                updateLinkStatus(packets, currentItem.id, url)
                .then((data) => {

                    if (data.success) {
                        dispatch( { type: LINKS_ACTIONS.UPDATE_LINKS_STATUS, payload: {id: currentItem.id}} )
                    }
                })
            }
        } else {
            EventBus.dispatch("error", {message: "Add Icons Before Enabling"});
        }
    };

    const handleOnClick = (linkID) => {

        setEditID(linkID);
        const currentLink = userLinks.find(function(e) {
            return e.id === linkID
        });

        if(currentLink.type === "shopify" || currentLink.type === "mailchimp") {
            setAccordionValue("integration")
        } else if(currentLink.icon.includes("offer-images")) {
            setAccordionValue("offer")
        } else if (currentLink.icon.includes("custom-icons")){
            if(subStatus) {
                setAccordionValue("custom")
            } else {
                setAccordionValue("standard")
            }
        } else {
            setAccordionValue("standard")
        }

        setTimeout(function(){
            document.querySelector('#scrollTo').scrollIntoView({
                behavior: 'smooth',
                block: "start",
                inline: "nearest"
            });

        }, 300)

    }

    const fetchFolderLinks = async (linkID) => {

        if(subStatus) {
            const url = 'folder/links/' + linkID;
            const response = await fetch(url);
            const folderLinks = await response.json();

            dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS, payload: {links: folderLinks["links"]} })
            setEditFolderID(linkID);

            setTimeout(function(){
                document.querySelector('#scrollTo').scrollIntoView({
                    behavior: 'smooth',
                    block: "start",
                    inline: "nearest"
                });

            }, 300)

        } else {
            setShowUpgradePopup({
                show: true,
                text: "access your folders"
            });
        }

    }

    const handleGridOnChange = (event) => {
        const {active, over} = event;

        if (active.id !== over.id) {

            setRow(null)
            setValue({
                index: null,
                url: null
            })
            const oldIndex = userLinks.map(function(e) {
                return e.id;
            }).indexOf(active.id);
            const newIndex = userLinks.map(function(e) {
                return e.id;
            }).indexOf(over.id);
            const newArray = arrayMove(userLinks, oldIndex, newIndex);

            dispatch ({ type: LINKS_ACTIONS.SET_LINKS, payload: {links: newArray}})

            const packets = {
                userLinks: newArray,
            }
            updateLinksPositions(packets);
        }
    }

    return (
        <section ref={targetRef} className={`icons_wrap add_icons icons ${userLinks.length === 0 ? "no_icons" : ""} `}>

            {userLinks.length === 0 ?
                <div className="info_message">
                    <p>You don't have any icons to display.</p>
                    <p>Click 'Add Icon' above to start adding links.</p>
                </div>
            :
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleGridOnChange}
                >
                    <SortableContext
                        id={'grid-sort-contextbasic'}
                        items={userLinks.map((i) => i?.id)}
                        strategy={rectSortingStrategy}
                    >

                        {userLinks?.map(link => {

                            return (
                                <Link
                                    key={link.id}
                                    link={link}
                                    handleOnClick={handleOnClick}
                                    fetchFolderLinks={fetchFolderLinks}
                                    handleChange={handleChange}
                                    subStatus={subStatus}
                                />
                            )
                        })}

                    </SortableContext>
                </DndContext>
            }
        </section>
    );
};

export default Links;
