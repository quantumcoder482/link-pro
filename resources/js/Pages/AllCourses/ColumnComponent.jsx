import React, {useRef, useState} from 'react';
import {Link} from '@inertiajs/react';
import {IoIosPlayCircle} from 'react-icons/io';
import {getVideoScreenshot} from '@/Services/VideoService.jsx';
const ColumnComponent = ({course, type}) => {

    const {intro_video, video_link, username, slug, title, logo} = course;
    const [hovered, setHovered] = useState(null);
    const columnRef = useRef();

    const getImageUrl = (videoLink) => {

        if(videoLink) {
            return getVideoScreenshot(videoLink);
        }

        return logo;
    }

    const imageUrl = getImageUrl(intro_video || video_link);

    return (
        <div ref={columnRef}
             className={`column ${hovered === columnRef && "active"}`}
             onMouseOver={() =>  setHovered(columnRef)}
             onMouseLeave={() => setHovered(null)}
        >
            <Link href={ type === "purchased" ? username + "/course/" + slug : username + "/course-page/" + slug }>
                <div className="column_image relative">
                    <img src={ imageUrl } alt={title} />
                    <div className="icon_box">
                        {type === "purchased" ?
                            <IoIosPlayCircle />
                            :
                            <span className="button blue">
                                Learn More
                            </span>
                        }
                    </div>

                </div>
                <div className="column_title">
                    <h3>{title}</h3>
                    <p>{username}</p>
                </div>

            </Link>
        </div>
    );
};

export default ColumnComponent;
