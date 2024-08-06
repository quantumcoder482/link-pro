import React, {useEffect, useRef, useState} from 'react';
import draftToHtml from 'draftjs-to-html';
import isJSON from 'validator/es/lib/isJSON';
import TipTap from '@/Components/CreatorComponents/TipTap.jsx';
import {convertText} from '@/Services/CreatorServices.jsx';

const TextComponent = ({
                           currentLink,
                           setCurrentLink,
                           showTiny,
                           setShowTiny
                       }) => {


    const [editorState, setEditorState] = useState("");

    useEffect(() => {
        setShowTiny(true);
    }, []);

    useEffect(() => {
        if(currentLink.description && currentLink.description !== "" && isJSON(currentLink.description)) {
            const convertedText = convertText(currentLink.description);

            if (convertedText.type === "blocks") {
                setEditorState(draftToHtml(convertedText.text))
            } else {
                setEditorState(convertedText.text)
            }
        } else {
            setEditorState(currentLink.description)
        }

    },[currentLink.description]);

    const handleEditorChange = (value) => {

        setCurrentLink((prev) => ({
            ...prev,
            description: value
        }))
    }

    const handleSubmit = () => {}

    return (
        <div className="wysiwyg icon_description">
            {showTiny &&

                <TipTap
                    editorState={editorState}
                    handleEditorChange={handleEditorChange}
                    handleSubmit={handleSubmit}
                />
            }
        </div>
    );
};

export default TextComponent;
