import React, {useEffect, useState} from 'react';
import {FiThumbsDown, FiThumbsUp} from 'react-icons/fi';
import CurrencyInput from 'react-currency-input-field';
import validator from 'validator/es';
import {
    updateData as updateCourseData,
    updateSectionData as updateCourseSectionData,
} from '@/Services/CourseRequests.jsx';
import {
    updateData as updateLpData,
    updateSectionData as updateLpSectionData,
} from '@/Services/LandingPageRequests.jsx';
import {LP_ACTIONS, OFFER_ACTIONS} from '@/Components/Reducers/CreatorReducers.jsx';
import {updateOfferData} from '@/Services/OfferRequests.jsx';
import EditorComponent from '@/Components/CreatorComponents/EditorComponent.jsx';
import {HandleFocus} from '@/Utils/InputAnimations.jsx';

const InputComponent = ({
                            placeholder,
                            type,
                            maxChar = null,
                            hoverText,
                            elementName,
                            value,
                            data = null,
                            dispatch = null,
                            sections = null,
                            setSections = null,
                            currentSection = null,
                            showTiny = null,
                            setShowTiny = null,
                            saveTo
                        }) => {

    const [charactersLeft, setCharactersLeft] = useState(maxChar);
    const [isValid, setIsValid] = useState(false);
    const [textInputValue, setTextInputValue] = useState(value);
    const limit = 1000;
    const prefix = '$';

    useEffect(() => {
        if(maxChar) {
            if (textInputValue) {
                setCharactersLeft(maxChar - textInputValue.length);
                if (maxChar - textInputValue.length >= 0) {
                    setIsValid(true);
                }
            } else {
                setCharactersLeft(maxChar);
            }
        }
    },[])

    useEffect(() => {
        if ( ( (type === "url" && checkValidity(value, "url") ) || type === "textarea") && value ) {
            setIsValid(true);
        }
    },[])

    useEffect(() => {
        if (type === "currency" && value) {
            setIsValid(true);
        }
    },[])

    const handleCurrencyChange = (value, _) => {
        if (Number.isNaN(Number(value)) || Number(value) > limit) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }

        if (saveTo === "offer") {
            dispatch({
                type: OFFER_ACTIONS.UPDATE_OFFER_DATA,
                payload: {
                    value: value,
                    name: elementName
                }
            })
        }
    }

    const handleChange = (e) => {
        let value = e.target.value;
        setTextInputValue(value)
        let check;

        if(maxChar) {
            check = checkValidity(value, "maxChar");
            setCharactersLeft(maxChar - value.length);
        }

        if ( type === "url" ) {
            check = checkValidity(value, "url");
            if(check) {
                value = checkEmbedLink(value);
                e.target.value = value;
            }
        }

        if (check || type === "textarea" || type === "text" || !maxChar) {

            if (elementName === "title" && value === "") {
                setIsValid(false)
            } else {
                setIsValid(true);
            }

            if (sections) {

               /* let element = elementName.split(/(\d+)/);
                if (elementName.includes("video")) {
                    element = element[0] + element[2].replace('_', '');
                } else {
                    element = element[2].replace('_', '');
                }*/

                setSections && setSections(sections.map((section) => {
                    if (section.id === currentSection.id) {
                        return {
                            ...section,
                            [`${elementName}`]: value,
                        }
                    }
                    return section;
                }))

            } else {
                dispatch && dispatch({
                    type: LP_ACTIONS.UPDATE_PAGE_DATA,
                    payload: {
                        value: value,
                        name: elementName
                    }
                })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target.value === "") {
            e.target.classList.remove('active');
        }

        if (isValid) {
            if (sections) {

                //remove section_number from element name to save in section data
              /*  let element = elementName.split(/(\d+)/);
                if (elementName.includes("video")) {
                    element = element[0] + element[2].replace('_', '');
                } else {
                    element = element[2].replace('_', '');
                }*/

                const packets = {
                    [`${elementName}`]: e.target.value,
                };

                saveTo === "course" ?
                    updateCourseSectionData(packets, currentSection.id) :
                    updateLpSectionData(packets, currentSection.id)

            } else if (saveTo === "offer") {

                const packets = {
                    [`${elementName}`]: data[elementName],
                };

                updateOfferData(packets, data["id"]);

            } else {
                const packets = {
                    [`${elementName}`]: data[elementName],
                };

                const method = saveTo === "course" ?
                    updateCourseData(packets, data["id"], elementName) :
                    updateLpData(packets, data["id"], elementName)

                method.then((response) => {
                    if(response.success && response.slug) {
                        dispatch({
                            type: LP_ACTIONS.UPDATE_PAGE_DATA,
                            payload: {
                                value: response.slug,
                                name: 'slug'
                            }
                        })
                    }
                });
            }
        }
    }

    const checkValidity = (value, checkType) => {

        if (checkType === "url") {
            if (validator.isURL(value)) {
                setIsValid(true)
                return true;
            } else {
                setIsValid(false)
                return false;
            }
        } else if (checkType === "maxChar") {
            if ( (maxChar - value.length) >= 0 && value.length > 0) {
                setIsValid(true);
                return true;
            } else {
                setIsValid(false)
                return false;
            }
        }
    }

    const checkEmbedLink = (link) => {

        //return proper embed link with video code.
        if(link.includes("embed")) {
            return link;
        } else if(link.includes("youtube") && link.includes("v=")) {
            const split = link.split("v=");
            return "https://www.youtube.com/embed/" + split[1];
        } else if (link.includes("youtu.be")) {
            const split = link.split("youtu.be/");
            return "https://www.youtube.com/embed/" + split[1];
        } else if (link.includes("vimeo") && !link.includes("player.vimeo")) {
            const split = link.split("vimeo.com/");
            return "https://player.vimeo.com/video/" + split[1];
        }
        return link;
    }

    const switchStatement = () => {
        switch(type) {
            case 'text':
            case 'url' :
                return (
                    <>
                        <input className={`animate ${value && "active"} `}
                               maxLength={maxChar}
                               name={elementName}
                               type={type}
                               defaultValue={value || ""}
                               onChange={(e) => handleChange(e)}
                               onKeyDown={event => {
                                   if (event.key === 'Enter') {
                                       handleSubmit(event);
                                   }
                               }}
                               onBlur={(e) => handleSubmit(e)}
                               onFocus={(e) => HandleFocus(e.target)}
                               onPaste={(e) => handleChange(e)}
                        />
                        <label htmlFor={elementName}>{placeholder}</label>
                    </>
                )
            case 'textarea':
                return (
                    <>
                        <textarea
                            className={"animate"}
                            name={elementName}
                            defaultValue={value || ""}
                            rows={5}
                            onChange={(e) => handleChange(e)}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    handleSubmit(event);
                                }
                            }}
                            onBlur={(e) => handleSubmit(e)}
                            onFocus={(e) => HandleFocus(e.target)}
                            onPaste={(e) => handleChange(e)}
                        ></textarea>
                        <label htmlFor={elementName}>{placeholder}</label>
                    </>
                )
            case 'wysiwyg':
                return (
                    <EditorComponent
                        dispatch={dispatch}
                        sections={sections}
                        setSections={setSections}
                        currentSection={currentSection}
                        elementName={elementName}
                        data={data}
                        isValid={isValid}
                        setIsValid={setIsValid}
                        showTiny={showTiny}
                        setShowTiny={setShowTiny}
                        saveTo={saveTo}
                    />
                )
            case 'currency' :

                return (
                    <>
                        <CurrencyInput
                            className={`animate`}
                            decimalsLimit={2}
                            defaultValue={data[elementName] || ""}
                            onValueChange={handleCurrencyChange}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    handleSubmit(event);
                                }
                            }}
                            onBlur={(e) => handleSubmit(e)}
                            prefix={prefix}
                            step={.1}
                        />
                        <label>{placeholder}</label>
                    </>
                )
            default:
                return (
                    <>
                        <input className={"animate"}
                               maxLength={maxChar}
                               name={elementName}
                               type={type}
                               defaultValue={value || ""}
                               onChange={(e) => handleChange(e)}
                               onKeyDown={event => {
                                   if (event.key === 'Enter') {
                                       handleSubmit(event);
                                   }
                               }}
                               onBlur={(e) => handleSubmit(e)}
                               onFocus={(e) => HandleFocus(e.target)}
                        />
                        <label htmlFor={elementName}>{placeholder}</label>
                    </>
                )
        }
    }

    return (
        <div className="edit_form">
            <form>
                {switchStatement()}
                {isValid ?
                    <a className={`submit_circle ${type === "textarea" ||
                    type === "wysiwyg" ?
                        "textarea" : ""}`} href="#"
                       onClick={(e) => handleSubmit(e)}
                    >
                        <FiThumbsUp/>
                        <div className="hover_text submit_button">
                            <p>{hoverText}</p></div>
                    </a>
                    :
                    <span className={`cancel_icon ${type === "textarea" ||
                    type === "wysiwyg" ?
                        "textarea" : ""}`}>
                        <FiThumbsDown/>
                    </span>
                }
                {maxChar &&
                    <div className="my_row info_text title">
                        <p className="char_max">Max {maxChar} Characters</p>
                        <p className="char_count">
                            {charactersLeft < 0 ?
                                <span className="over">Over Character Limit</span>
                                :
                                <>
                                    Characters Left: <span className="count"> {charactersLeft} </span>
                                </>
                            }
                        </p>
                    </div>
                }
            </form>
            {/*<ToolTipIcon section="title" />*/}
        </div>
    );
};

export default InputComponent;
