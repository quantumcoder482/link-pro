import React, {useEffect, useState} from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import {getVideoScreenshot} from '@/Services/VideoService.jsx';
import {convertText} from '@/Services/CreatorServices.jsx';
import draftToHtml from 'draftjs-to-html';
import isJSON from 'validator/es/lib/isJSON.js';
import DOMPurify from 'dompurify';

const SectionVideo = ({
                          title,
                          link,
                          text,
                          titleColor,
                          titleSize,
                          index
}) => {

    const [imagePlaceholder, setImagePlaceholder] = useState("");
    const [indexValue, setIndexValue] = useState(null);
    const [textValue, setTextValue] = useState(null);

    useEffect(() => {

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

    },[text])

    const createMarkup = (convertText) => {
        return {
            __html: DOMPurify.sanitize(convertText)
        }
    }

    useEffect(() => {
        if(link) {
            setImagePlaceholder(getVideoScreenshot(link));
        }
    },[link])

    const handleOnClick = (e) => {
        e.preventDefault();
        setIndexValue(e.currentTarget.dataset.index);
    }

    return (
        <>
            {link ?
                <div className="video_content">
                    {indexValue == index ?
                        <div className="video_row my_row">
                            <div className="video_wrapper">
                                <iframe src={link} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
                            </div>
                        </div>
                        :
                        <a href="#" data-index={index} onClick={(e) => handleOnClick(e)}>
                            <img src={imagePlaceholder} alt=""/>
                            <span className="play_icon">
                                <FaCirclePlay />
                            </span>
                        </a>
                    }
                </div>
                :
                <img src={ Vapor.asset('images/image-placeholder.jpg')} alt=""/>
            }

            <div className="text_wrap">
                <h3 style={{color: titleColor, fontSize: titleSize + "rem" }}>{title || "Video Title"}</h3>

                {text &&
                    <div dangerouslySetInnerHTML={createMarkup(textValue)}>
                    </div>
                }
            </div>
        </>
    );
};

export default SectionVideo;
