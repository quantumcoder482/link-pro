import React, {useEffect, useState} from 'react';
import SectionVideo from './SectionVideo';
import SectionImage
    from '@/Pages/CourseCreator/Components/Preview/SectionImage.jsx';
import SectionText
    from '@/Pages/CourseCreator/Components/Preview/SectionText.jsx';

const PreviewSection = ({
                            currentSection,
                            index,
                            url,
                            nodesRef,
                            completedCrop,
                            position,
                            hoverSection,
                            setShowMessageAlertPopup
}) => {

    const {
        type,
        background_color,
        text,
        video_title,
        title_color,
        title_size,
        video_link,
        button,
        button_position,
        button_color,
        button_text_color,
        button_text,
        button_size,
        image,
        file
    } = currentSection;

    const [buttonStyle, setButtonStyle] = useState(null);

    useEffect(() => {
        setButtonStyle ({
            background: button_color,
            color: button_text_color,
            width: button_size + "%"
        })

    },[button_color, button_text_color, button_size])

    const handleButtonClick = (e) => {
        e.preventDefault();
        setShowMessageAlertPopup({
            show: true,
            text: "To preview checkout, go to the course landing page:",
            url: url,
            buttonText: "Follow Link"
        })
    }
    const Button = () => {

        const buttonUrl = type === "file" ? file : "#";

        return (
            <div className={`button_wrap my_row ${button_position ? button_position : "above"}`}>
                <a href={buttonUrl}
                   download={type === "file"}
                   target="_blank"
                   className="button"
                   style={buttonStyle}
                   onClick={type !== "file" ? handleButtonClick : undefined}
                >{button_text || (type === "file" ? "Download File" : "Get Course")}</a>
            </div>
        )
    }

    return (
        <section
            id={`preview_section_${position}`}
            className={hoverSection === 'section_'+ position ? "active" : ""}
        >
            <div className={type}
                 style={{ background: background_color || 'rgba(255,255,255,1)'}} >
                {( !!button && button_position === "above") || type === "file" ?
                    <Button />
                    :
                    ""
                }
                {{
                    "text":
                        <SectionText
                            text={text}
                        />
                        ,
                    "video":
                        <SectionVideo
                            title={video_title}
                            link={video_link}
                            text={text}
                            titleColor={title_color}
                            titleSize={title_size}
                            index={index}

                        />,
                    "image":
                        <SectionImage
                            nodesRef={nodesRef}
                            completedCrop={completedCrop}
                            elementName={"section_"+ position + "_" + type}
                            imgUrl={image}
                        />,
                }[type]}
                {( !!button && button_position === "below") &&
                    <Button />
                }
            </div>
        </section>
    );
};

export default PreviewSection;
