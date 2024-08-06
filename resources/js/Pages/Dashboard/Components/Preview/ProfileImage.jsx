import React, {useContext} from 'react';
import {PageContext} from '../../Dashboard.jsx';

const ProfileImage = ({
                          completedCrop,
                          nodesRef,
                      }) => {

    const {pageSettings} = useContext(PageContext);

    return (

        <>
            <div className={`
            ${(pageSettings["profile_img"] && !completedCrop.profile_img?.isCompleted) || completedCrop.profile_img?.isCompleted
                ? "profile_img_column"
                :
                "profile_img_column default"} `}
            >
                {!completedCrop.profile_img?.isCompleted ?
                    <div className="profile_image">
                        <div className="image_wrap">
                            <img src={pageSettings["profile_img"] || Vapor.asset('images/default-img.png')} alt=""/>
                        </div>
                    </div>
                    :
                    <div className={"profile_image"}>
                        <div className="image_wrap">
                            <canvas
                                ref={ref => nodesRef.current.profile_img = ref}
                                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                style={{
                                    objectFit: `cover`,
                                    width: completedCrop.profile_img?.isCompleted ? `100%` : 0,
                                    height: completedCrop.profile_img?.isCompleted ? `100%` : 0,
                                    borderRadius: `50px`,
                                }}
                            />
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default ProfileImage;
