import React, {useCallback, useEffect, useState} from 'react';
import {BiLock} from 'react-icons/bi';
import {FaCirclePlay} from 'react-icons/fa6';
import {getFileParts} from '@/Services/FileService.jsx';
import isJSON from 'validator/es/lib/isJSON.js';
import {convertText} from '@/Services/CreatorServices.jsx';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import Button from '@/Components/CreatorComponents/Button.jsx';
import {getVideoScreenshot} from '@/Services/VideoService.jsx';
const ColumnComponent = ({
                             section,
                             dataRow,
                             indexValue,
                             setIndexValue,
                             index,
                             course,
                             hasCourseAccess,
                             page,
                             userAuth,
                             setShowPaymentButtons,
                             buttonUrl
}) => {

    const {
        type,
        text,
        video_title,
        video_link,
        title_color,
        background_color,
        button,
        button_position,
        lock_video,
        image,
    } = section;

    const {header_color, header_text_color} = course;

    const [imagePlaceholder, setImagePlaceholder] = useState(null);
    const [mobileVideo, setMobileVideo] = useState(null);
    const [bgStyle, setBgStyle] = useState(null);
    const [textValue, setTextValue] = useState(text)

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

    },[])

    const createMarkup = (convertText) => {
        return {
            __html: DOMPurify.sanitize(convertText)
        }
    }

    useEffect(() => {
        if (type === "video" && video_link) {
            setImagePlaceholder(getVideoScreenshot(video_link));
        }
    },[])

    useEffect(() => {
        if(type === "image") {
            if(section.image) {
                setBgStyle ({
                    background: "url(" + image + ") no-repeat",
                    backgroundPosition: "center center",
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
    }, []);

    useEffect(() => {

        function handleResize() {

            if (window.innerWidth < 551) {
                setIndexValue(null);
            } else {
                setMobileVideo(null);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }

    },[])

    const handleOnClick = (e) => {
        e.preventDefault();


        if(hasCourseAccess || !lock_video) {
            const clickedDiv = e.currentTarget.parentNode

            if (window.innerWidth < 551) {
                setMobileVideo(true);
            } else {
                if (clickedDiv.classList.contains('open')) {
                    setIndexValue(null);
                } else {
                    setIndexValue(clickedDiv.firstChild.dataset.index);
                    setTimeout(function() {
                        document.querySelector('.video_viewer').scrollIntoView({
                            behavior: 'smooth',
                            block: "nearest",
                        });

                    }, 600)
                }
            }
        }
    }

    const handleButtonClick = useCallback((e) => {
        e.preventDefault();
        setShowPaymentButtons((prev) => ({
            ...prev,
            show: true,
        }));
    },[])

    return (

        <div className={`column ${type} ${index == indexValue ? "open" : ""}`}
             style={{background: background_color}}>

            {type === "video" ?

                mobileVideo ?
                    <div className="my_row folder open">
                        <div className="video_wrapper">
                            <iframe src={video_link} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
                        </div>
                    </div>
                    :
                    ((hasCourseAccess && page !== "lander") || !lock_video) ?
                        <a className="my_row relative" href="#"
                           data-video={video_link}
                           data-index={index}
                           data-row={dataRow}
                           onClick={(e) => handleOnClick(e)}>
                             <span className="image_wrap my_row">
                                <img src={imagePlaceholder} alt=""/>
                             </span>
                            <span className="play_icon">
                                <FaCirclePlay />
                            </span>
                        </a>
                        :
                        <span className="image_wrap my_row">
                            <img className="locked" src={imagePlaceholder} alt=""/>
                            <div className="text-center locked_content" style={{ color: 'rgb(255,255,255)' }}>
                                <BiLock />
                                <p>Unlock this video<br/>by purchasing this course</p>
                                <a className="button"
                                   href={!userAuth ? buttonUrl : "#"}
                                   style={{ background: header_color, color: header_text_color }}
                                   onClick={!userAuth ? "" : handleButtonClick}
                                >
                                    Purchase Now
                                </a>
                            </div>
                         </span>
                :
                ""
            }

            {(type === "video" || type === "text") ?
                <div className="my_row text_wrap">
                    {type === "video" &&
                        <h3 style={{color: title_color}}>{video_title}</h3>
                    }

                    { (!hasCourseAccess || page === "lander") &&
                        (button && button_position === "above") ?
                            <Button
                                section={section}
                                handleButtonClick={handleButtonClick}
                                buttonUrl={buttonUrl}
                                userAuth={userAuth}
                            />
                            :
                            ""
                    }
                    <div dangerouslySetInnerHTML={createMarkup(textValue)}>
                    </div>
                    {(!hasCourseAccess || page === 'lander') &&
                    (button && button_position === "below") ?
                                <Button
                                    section={section}
                                    handleClick={handleButtonClick}
                                    buttonUrl={buttonUrl}
                                    userAuth={userAuth}
                                />
                            :
                            ""
                    }
                </div>
                :
                ""
            }

            {type === "image" ?
                <section className={`my_row text_wrap ${type}`} style={bgStyle}>
                    { (!hasCourseAccess || page === "lander") && button ?
                        <Button
                            section={section}
                            handleButtonClick={handleButtonClick}
                            buttonUrl={buttonUrl}
                            userAuth={userAuth}
                        />
                        :
                        ""
                    }

                </section>
                :
                ""
            }

            {type === "file" ?
                <Button
                    section={section}
                    handleButtonClick={handleButtonClick}
                    buttonUrl={buttonUrl}
                    userAuth={userAuth}
                />
                :
                ""
            }
        </div>


    );
};

export default ColumnComponent;
