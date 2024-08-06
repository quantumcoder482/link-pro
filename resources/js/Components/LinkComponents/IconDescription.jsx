import React, {useEffect, useRef, useState} from 'react';
import isJSON from 'validator/es/lib/isJSON';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import { TbExternalLink } from "react-icons/tb";
import {convertText} from '@/Services/CreatorServices.jsx';
import {TrackIconClick} from '@/Services/TrackClicks.jsx';

const IconDescription = ({
                             id,
                             dataRow,
                             row,
                             description,
                             url,
                             viewType
                         }) => {

    const [textValue, setTextValue] = useState(description)
    const [hoverSection, setHoverSection] = useState(null);
    const divRef = useRef();

    useEffect(() => {
        if (description && isJSON(description)) {
            const content = convertText(description);
            if (content.type === "blocks") {
                setTextValue(draftToHtml(content.text));
            } else {
                setTextValue(content.text);
            }
        } else if (description) {
            setTextValue(description)
        }
    },[description])

    const createMarkup = (convertText) => {
        return {
            __html: DOMPurify.sanitize(convertText)
        }
    }

    return (
        <div
             ref={divRef}
             className={`relative my_row folder ${dataRow == row ? "open" : ""}`}
             onMouseEnter={(e) => {
                 setHoverSection(divRef)
             }}
             onMouseLeave={(e) => {
                 setHoverSection(null)
             }}
        >
            {dataRow == row &&
                <div className="folder_content description relative">
                    <a target="_blank"
                       href={url}
                       onClick={(e) => viewType === "live" && TrackIconClick(id)}
                    >
                        <div dangerouslySetInnerHTML={createMarkup(textValue)}></div>
                        {hoverSection === divRef &&
                            <div className="hover_content">
                                <p className="text_link">Open Link</p>
                                <span className="icon"><TbExternalLink/></span>
                            </div>
                         }
                    </a>

                </div>
            }
        </div>
    );
};

export default IconDescription;
