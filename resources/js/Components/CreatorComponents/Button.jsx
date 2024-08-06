import React, {useEffect, useState} from 'react';

const Button = ({
                    section,
                    handleButtonClick = null,
                    buttonUrl,
                    userAuth = null
}) => {


    const [buttonStyle, setButtonStyle] = useState(null);

    const {
        button_text,
        button_position,
        button_text_color,
        button_color,
        button_size,
        file
    } = section;

    useEffect(() => {

        let maxWidth = 'unset';
        if(window.innerWidth > 550) {
            maxWidth = '250px';
        }

        setButtonStyle({
            background: button_color,
            color: button_text_color,
            width: button_size + "%",
            maxWidth: maxWidth
        });

    },[])

    useEffect(() => {

        function handleResize() {
            let maxWidth = 'unset';
            if(window.innerWidth > 550) {
                maxWidth = '250px';
            }

            setButtonStyle((prev) => ({
                ...prev,
                maxWidth: maxWidth
            }));
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }

    },[])

    return (
        <div className={`button_wrap ${button_position ? button_position : "above"}`}>
            {file && userAuth ?
                <a className="button"
                   download={file}
                   target="_blank"
                   href={file}
                   style={buttonStyle}
                >
                    {button_text || "Download File"}
                </a>
                :
                !file &&
                <a href={userAuth ? "#" : buttonUrl }
                    className="button"
                    style={buttonStyle}
                    onClick={userAuth ? handleButtonClick : undefined}>
                    {button_text || "Get Course"}
                </a>
            }
        </div>
    )
};

export default Button;
