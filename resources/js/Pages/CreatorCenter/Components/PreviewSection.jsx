import React, {useEffect, useRef, useState} from 'react';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import isJSON from 'validator/es/lib/isJSON.js';
import {convertText} from '@/Services/CreatorServices.jsx';
const PreviewSection = ({section}) => {

    const [buttonStyle, setButtonStyle] = useState(null);
    const {
        type,
        bg_color,
        text,
        image,
        button,
        button_position,
        button_link,
        button_size,
        button_text,
        button_text_color,
        button_color
    } = section;
    const [textValue, setTextValue] = useState(text)

    useEffect(() => {
        setButtonStyle ({
            background: button_color,
            color: button_text_color,
            width: button_size + "%",
        })

    },[])

    useEffect(() => {

        if(type === "text" ) {
            if (text && isJSON(text)) {
                const content = convertText(text);
                if (content.type === "blocks") {
                    setTextValue(draftToHtml(content.text));
                } else {
                    setTextValue(content.text);
                }

            } else if (text) {
                setTextValue(text)
            }
        }

    },[text])

    const createMarkup = (convertText) => {
        return {
            __html: DOMPurify.sanitize(convertText)
        }
    }

    const Button = ({buttonText}) => {
        return (
            <div className={`button_wrap text-center my_row ${button_position ? button_position : "above"}`}>
                <a href={button_link}
                   target="_blank"
                   className="button"
                   style={buttonStyle}
                >{buttonText || "Get Course"}</a>
            </div>
        )
    }

    return (
        <section>
            <div className={type}
                 style={{ background: bg_color || 'rgba(255,255,255,1)'}}>
                {( !!button && button_position === "above") &&
                    <Button
                        buttonText={button_text}
                    />
                }
                {{
                    "text":
                        <div dangerouslySetInnerHTML={createMarkup(textValue)}>
                        </div>,
                    "image":
                        <div className="image_bg"
                             style={{
                                 background: "url(" + image + ") center no-repeat",
                                 backgroundSize: 'cover',
                                 minHeight: '95px'
                             }}>
                        </div>,
                }[type]}
                {( !!button && button_position === "below") &&
                    <Button
                        buttonText={button_text}
                    />
                }
            </div>
        </section>
    );
};

export default PreviewSection;
