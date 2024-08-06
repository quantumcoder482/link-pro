import React, {useEffect, useState} from 'react';

const Hero = ({
                  nodesRef,
                  completedCrop,
                  elementName,
                  pageData
}) => {

    const [headerImageStyle, setHeaderImageStyle] = useState(null);

    useEffect(() => {

        const background = pageData["hero"] ? "url(" + pageData["hero"] + ") center 25% no-repeat" : "url(" + Vapor.asset("images/image-placeholder.jpg") + ") center no-repeat #f4f4f4";

        setHeaderImageStyle (
            completedCrop[elementName]?.isCompleted ?
                {
                    width: (completedCrop[elementName]?.isCompleted) ? `100%` : 0,
                    height: (completedCrop[elementName]?.isCompleted) ? `auto` : 0,
                    maxHeight: '162px',
                    overflow:'hidden'
                }
                :
                {
                    background: background,
                    backgroundSize: pageData["hero"] ? "cover" : "68%",
                    backgroundRepeat: "no-repeat",
                    minHeight: "162px"
                }
        )
    },[completedCrop[elementName]])

    return (
        <div className="header_image my_row"
                 style={headerImageStyle}>
            {completedCrop[elementName] &&
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
            }
        </div>
    );
};

export default Hero;
