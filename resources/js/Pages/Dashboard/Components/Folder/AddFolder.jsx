import { ImPlus } from "react-icons/im";
import addFolder from '../../../../Services/FolderRequests';
import React, {useContext} from 'react';

import {
    PageContext,
    UserLinksContext,
    FolderLinksContext,
} from '../../Dashboard.jsx';

import {
    LINKS_ACTIONS,
    FOLDER_LINKS_ACTIONS,
} from '@/Services/Reducer.jsx';

const AddFolder = ({
                       setShowUpgradePopup,
                       setEditFolderID,
                       subStatus,
}) => {

    const  { pageSettings } = useContext(PageContext);
    const { userLinks, dispatch } = useContext(UserLinksContext);
    //const { originalArray, dispatchOrig } = useContext(OriginalArrayContext);
    const { dispatchFolderLinks } = useContext(FolderLinksContext);
    //const { dispatchOrigFolderLinks } = useContext(OriginalFolderLinksContext);

    const handleClick = (e) => {
        e.preventDefault();

        if ( subStatus ) {

            const packets = {
                pageID: pageSettings["id"]
            }

            addFolder(packets)
            .then((data) => {

                if (data.success) {
                    let newLinks = [...userLinks];
                    //let newOriginalArray = [...originalArray];
                    const newFolderObject = {
                        id: data.id,
                        name: null,
                        type: 'folder',
                        position: data.position,
                        links: []
                    }

                    //dispatchOrig({ type: ORIGINAL_LINKS_ACTIONS.SET_ORIGINAL_LINKS, payload: {links: newOriginalArray.concat(newFolderObject) }})
                    dispatch({ type: LINKS_ACTIONS.SET_LINKS, payload: {links: newLinks.concat(newFolderObject) }})

                    fetchFolderLinks(data.id);
                }
            })

        } else {
            setShowUpgradePopup({
                show: true,
                text: "add folders"
            });
        }
    };

    const fetchFolderLinks = async (folderID) => {
        const url = 'folder/links/' + folderID;
        const response = await fetch(url);
        const folderLinks = await response.json();

        //dispatchOrigFolderLinks({ type: ORIG_FOLDER_LINKS_ACTIONS.SET_ORIG_FOLDER_LINKS, payload: {links: folderLinks["links"] }})
        dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS, payload: {links: folderLinks["links"] }});

        setEditFolderID(folderID);

        setTimeout(function(){
            document.querySelector('#scrollTo').scrollIntoView({
                behavior: 'smooth',
                block: "start",
                inline: "nearest"
            });

        }, 800)
    }

    return (

        <a href="" className="icon_wrap" onClick={handleClick}>
            <ImPlus />
            <h3>Add Folder</h3>
        </a>

    )
}
export default AddFolder;
