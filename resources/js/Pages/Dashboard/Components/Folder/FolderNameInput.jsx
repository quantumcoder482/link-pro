import React, {useEffect, useState, useContext} from 'react';
import {updateFolderName} from '@/Services/FolderRequests.jsx';
import {
    LINKS_ACTIONS,
} from '@/Services/Reducer.jsx';
import {UserLinksContext} from '../../Dashboard.jsx';

const FolderNameInput = ({folderID}) => {

    const [charactersLeft, setCharactersLeft] = useState();
    const { userLinks, dispatch } = useContext(UserLinksContext);
    //const { dispatchOrig } = useContext(OriginalArrayContext);

    const [ currentFolder, setCurrentFolder ] = useState(
        userLinks.find(function(e) {
            return e.id === folderID && e.type === "folder"
        }) || null );

    useEffect(() => {
        if(currentFolder.name) {
            setCharactersLeft(11 - currentFolder.name.length);
        } else {
            setCharactersLeft(11);
        }
    },[charactersLeft])

    const handleSubmit = () => {

        const packets = {
            folderName: currentFolder.name
        }

        updateFolderName(folderID, packets)
        .then((data) => {

            if(data.success) {

                dispatch({ type: LINKS_ACTIONS.UPDATE_FOLDER_NAME, payload: {folderID: folderID, name: currentFolder.name} })
                //dispatchOrig({ type: ORIGINAL_LINKS_ACTIONS.UPDATE_FOLDER_NAME, payload: {folderID: folderID, name: currentFolder.name} })
            }
        })
    }

    const handleFolderName = (e) => {
        let value = e.target.value;

        setCharactersLeft(11 - value.length);

        setCurrentFolder({
            ...currentFolder,
            name: value
        })
    }

    return (
        <>
            <div className="input_wrap">
                <input
                    /*maxLength="13"*/
                    name="name"
                    type="text"
                    value={currentFolder.name || ""}
                    placeholder="Folder Name"
                    onChange={(e) => handleFolderName(e)}
                    onKeyPress={ event => {
                        if(event.key === 'Enter') {
                            handleSubmit(event);
                        }
                    }
                    }
                    onBlur={(e) => handleSubmit(e)}
                />
            </div>
            <div className="my_row info_text">
                <p className="char_max">Max 11 Characters Shown</p>
                <p className="char_count">
                    {charactersLeft < 0 ?
                        <span className="over">Only 11 Characters Will Be Shown</span>
                        :
                        "Characters Left: " + charactersLeft
                    }
                </p>
            </div>
        </>
    );
};

export default FolderNameInput;
