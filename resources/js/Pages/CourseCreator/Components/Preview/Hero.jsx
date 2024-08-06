import React, {useEffect, useRef, useState, useMemo} from 'react';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import isJSON from 'validator/es/lib/isJSON.js';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {Color} from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import {generateHTML} from "@tiptap/react";
import {convertText} from '@/Services/CreatorServices.jsx';

const Hero = ({ data }) => {

    const [textValue, setTextValue] = useState(data["intro_text"])

    useEffect(() => {

        if (data["intro_text"] && isJSON(data["intro_text"])) {
            const content = convertText(data["intro_text"]);
            if (content.type === "blocks") {
                setTextValue(draftToHtml(content.text));
            } else {
                setTextValue(content.text);
            }
        } else {
            setTextValue(data["intro_text"])
        }

    },[data["intro_text"]])

    const createMarkup = (text) => {
        return {
            __html: DOMPurify.sanitize(text)
        }
    }

    return (
        <div className="hero_section">
            {data['intro_video'] &&
                <div className="video_wrapper" id="preview_intro_video_section">
                    <iframe src={data['intro_video']} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
                </div>
            }
            {data["intro_text"] &&
                <article id="preview_intro_text_section"
                         className="intro_text my_row"
                         style={{
                             background: data["intro_background_color"] || 'rgba(255,255,255,1)'
                        }}
                >
                    <div dangerouslySetInnerHTML={createMarkup(textValue)}></div>
                </article>
            }
        </div>
    );
};

export default Hero;
