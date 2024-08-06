import React, {useEffect, useState} from 'react';

const SectionImage = ({
                          nodesRef,
                          completedCrop,
                          elementName,
                          imgUrl,

}) => {

    const [sectionImageStyle, setSectionImageStyle] = useState(null);

    useEffect(() => {

        const backgroundImg = imgUrl || Vapor.asset("images/image-placeholder.jpg");
        setSectionImageStyle (
            completedCrop[elementName]?.isCompleted ?
                {
                    width: (completedCrop[elementName]?.isCompleted) ? `100%` : 0,
                    height: (completedCrop[elementName]?.isCompleted) ? `auto` : 0,
                    minHeight: '130px',
                    overflow:'hidden'
                }
                :
                {
                    background: "url(" + backgroundImg + ") center no-repeat",
                    backgroundSize: 'cover',
                    minHeight: '130px'
                }
        )
    },[completedCrop[elementName]])

    return (
        <div className="image_bg" style={sectionImageStyle}>
            {completedCrop[elementName] ?
                <canvas
                    className={`${elementName}_bg_image`}
                    ref={ref => nodesRef.current[elementName] = ref}
                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                    style={{
                        /*backgroundImage: nodesRef.current[elementName],*/
                        /*width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0)*/
                        backgroundSize: `cover`,
                        backgroundRepeat: `no-repeat`,
                        width: completedCrop[elementName]?.isCompleted ? `100%` : 0,
                        height: completedCrop[elementName]?.isCompleted ? `auto` : 0,
                    }}
                />
                :
                ""
            }
        </div>
    );
};

export default SectionImage;
