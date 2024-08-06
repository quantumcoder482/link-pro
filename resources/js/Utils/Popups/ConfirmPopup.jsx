import React, {useContext} from 'react';
import {MdCheckCircle} from 'react-icons/md';
import {
    deleteLink,
    updateLinkStatus,
} from '@/Services/LinksRequest.jsx';
import {UserLinksContext, FolderLinksContext} from '../../Pages/Dashboard/Dashboard.jsx';
import {
    LINKS_ACTIONS,
    FOLDER_LINKS_ACTIONS,
} from '@/Services/Reducer.jsx';

export const ConfirmPopup = ({
                                 editID,
                                 setEditID,
                                 showConfirmPopup,
                                 setShowConfirmPopup,
                                 folderID,
                                 setInputType,
                                 setIntegrationType,
                                 setAccordionValue
                             }) => {

    const { userLinks, dispatch  } = useContext(UserLinksContext);
    const { folderLinks, dispatchFolderLinks } = useContext(FolderLinksContext);

    const deleteItem = (e) => {
        e.preventDefault();

        let newFolderArray;
        let newArray;

        if (folderID) {
            newFolderArray = folderLinks.filter(element => element.id !== editID);
            newArray = userLinks.map((item) => {
                if (item.id === folderID && item.type === "folder") {
                    const itemLinks = item.links.filter(element => element.id !== editID)

                    return {
                        ...item,
                        links: itemLinks
                    }
                }
                return item;
            });
        } else {
            newArray = userLinks.filter(element => element.id !== editID);
        }

        const packets = {
            userLinks: newArray,
            folderLinks: newFolderArray
        }

        deleteLink(packets, editID)
        .then((data) => {

            if(data.success) {

                if (folderID) {

                    const newFolderLinks = data.links.find(el => el.id === folderID);
                    dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS, payload: {links: newFolderLinks.links} })

                    let folderActive = null;
                    if (newFolderArray.length === 0) {

                        folderActive = false;
                        const url = "/dashboard/folder/status/";
                        const packets = {
                            active_status: folderActive,
                        };

                        updateLinkStatus(packets, folderID, url);
                    }

                    dispatch({ type: LINKS_ACTIONS.UPDATE_LINKS_POSITIONS, payload: {links: newArray, folderActive: folderActive, folderID: folderID} })

                } else {
                    dispatch({ type: LINKS_ACTIONS.SET_LINKS, payload: {links: data.links} })
                }

                setEditID(null)
                setShowConfirmPopup(false)
                setIntegrationType(null);
                setInputType(null);
                setAccordionValue(null);
            }
        })
    }

    const handleCancel = e => {
        e.preventDefault();
        setShowConfirmPopup(false)
    }

    return (

        <div id="confirm_popup_link" className={showConfirmPopup ? 'open' : "" }>
            <div className="box">
                <div className="form_icon_wrap svg check">
                    <MdCheckCircle/>
                </div>
                <h2>Confirm</h2>
                <div className="text_wrap">
                    <p className="confirm_text">Are you sure you want to delete this icon?</p>
                    <form action="resources/js/Pages/Dashboard/ConfirmPopup" className="button_row">
                        <a className="button green" href="resources/js/Pages/Dashboard/ConfirmPopup#" onClick={deleteItem}>Yes</a>
                        <a className="button transparent gray" href="resources/js/Pages/Dashboard/ConfirmPopup#" onClick={handleCancel}>No</a>
                    </form>
                </div>
            </div>
        </div>

    )
}
