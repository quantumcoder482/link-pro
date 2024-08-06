import React, {useCallback, useEffect, useState} from 'react';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import isJSON from 'validator/es/lib/isJSON.js';
import {convertText} from '@/Services/CreatorServices.jsx';
import Button from '@/Components/CreatorComponents/Button.jsx';

const SectionComponent = ({section}) => {

    const [bgStyle, setBgStyle] = useState(null);

    const {
        type,
        image,
        bg_color,
        button,
        button_position,
        text,
        slug,
        username
    } = section;

    const [textValue, setTextValue] = useState(text)

    useEffect(() => {
        if(type === "text" ) {
            if (text && isJSON(text)) {
                const content = convertText(text);
                if (content.type === "blocks") {
                    setTextValue(draftToHtml(content.text));
                } else {
                    setTextValue(content.text);
                }
            } else {
                setTextValue(text)
            }
        }
    },[])

    const createMarkup = (text) => {

        return {
            __html: DOMPurify.sanitize(text)
        }
    }

    useEffect(() => {

        if(type === "image") {
            if(section.image) {
                setBgStyle ({
                    background: "url(" + image + ") no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                })
            } else {
                setBgStyle ({
                    background: "url(" + Vapor.asset('images/image-placeholder.jpg') + ") no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "30%",
                    backgroundColor: '#f4f4f4',
                })
            }
        }

    },[])

    const url = window.location.protocol + "//" + window.location.host + "/" + username + "/course-page/" + slug;

    return (
        <section className={` ${type} sm:mb-5`} style={ type === "text" ? { background: bg_color } : bgStyle }>
            {type === "text" &&
                <article className="section_content">
                    { (button && button_position === "above") ?
                        <Button
                            section={section}
                            buttonUrl={url}
                        />
                        :
                        ""
                    }
                    <div dangerouslySetInnerHTML={createMarkup(textValue)}>
                    </div>
                    { (button && button_position === "below") ?
                        <Button
                            section={section}
                            buttonUrl={url}
                        />
                        :
                        ""
                    }
                </article>
            }
            {type === "image" &&
                button ?
                    <Button
                        section={section}
                        buttonUrl={url}
                    />
                    :
                    ""
            }
        </section>
    );
};

export default SectionComponent;
