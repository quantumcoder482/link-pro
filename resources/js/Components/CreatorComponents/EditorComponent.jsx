import React, {useState, useEffect, useRef, useMemo} from 'react';
import {LP_ACTIONS} from '@/Components/Reducers/CreatorReducers.jsx';
import draftToHtml from 'draftjs-to-html';

import {
    updateSectionData,
    updateData
} from '@/Services/LandingPageRequests.jsx';
import {
    updateData as updateCourseData,
    updateSectionData as updateCourseSectionData
} from '@/Services/CourseRequests.jsx';
import TipTap from '@/Components/CreatorComponents/TipTap.jsx';
import isJSON from 'validator/es/lib/isJSON';
import {convertText} from '@/Services/CreatorServices.jsx';
const EditorComponent = ({
                             dispatch,
                             sections = null,
                             setSections,
                             currentSection = null,
                             elementName,
                             data,
                             isValid,
                             setIsValid,
                             showTiny = null,
                             setShowTiny = null,
                             saveTo
                         }) => {

    const [editorState, setEditorState] = useState("");

    useEffect(() => {

        const textToConvert = data && data.hasOwnProperty('intro_text') ?
            data["intro_text"] :
            currentSection["text"];
        const convertedText = convertText(textToConvert);

        if (convertedText.type === "blocks") {
            setEditorState(draftToHtml(convertedText.text))
        } else {
            setEditorState(convertedText.text)
        }

    },[sections])

    useEffect(() => {
        if (currentSection) {
            if (currentSection["text"]) {
                setIsValid(true)
            }
        } else {
            if (data["intro_text"] && isJSON(data["intro_text"])) {
                setIsValid(true)
            }
        }
    },[])

    const handleEditorChange = (value) => {

        if (value !== "") {
            setIsValid(true);

            if (sections) {

                /*let element = elementName.split(/(\d+)/);
                element = element[2].replace('_', '');*/

                setSections(sections.map((section) => {
                    if (section.id === currentSection.id) {
                        return {
                            ...section,
                            [`${elementName}`]: value,
                        }
                    }
                    return section;
                }))

            } else {
                dispatch({
                    type: LP_ACTIONS.UPDATE_PAGE_DATA,
                    payload: {
                        value: value,
                        name: elementName
                    }
                })
            }
        } else {
            setIsValid(false);
        }
    }

    const handleSubmit = (content) => {

        if (isValid) {

            if (sections) {

                /*let element = elementName.split(/(\d+)/);
                element = element[2].replace('_', '');*/

                const packets = {
                    [`${elementName}`]: content,
                };

               saveTo === "course" ?
                    updateCourseSectionData(packets, currentSection.id) :
                    updateSectionData(packets, currentSection.id);

            } else {
                //const value = data[elementName];
                const packets = {
                    [`${elementName}`]: content,
                };

                const method = saveTo === "course" ?
                    updateCourseData(packets, data["id"], elementName) :
                    updateData(packets, data["id"], elementName)

                method.then((response) => {
                        if (response.success && response.slug) {
                            dispatch({
                                type: LP_ACTIONS.UPDATE_PAGE_DATA,
                                payload: {
                                    value: response.slug,
                                    name: 'slug'
                                }
                            })
                        }
                    })
            }
        }
    }

    useEffect(() => {
        if(setShowTiny) {
            setShowTiny(true);
        }
    },[])

    return (
        <div className="page_settings border_wrap wysiwyg">

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

export default EditorComponent;
