import React from 'react';
import {TrackIconClick} from '@/Services/TrackClicks.jsx';

const AdvancedIcon = ({
                          id,
                          colClasses,
                          displayIcon,
                          name,
                          active_status,
                          dataRow,
                          mainIndex,
                          setRow,
                          value,
                          setValue,
                          url,
                          index,
                          setClickType,
                          clickType,
                          type,
                          viewType
                      }) => {

    const handleClick = (e) => {
        e.preventDefault();

        const clickedDiv = e.currentTarget;

        if (clickedDiv.classList.contains('open')) {
            setRow(null);
            setValue({
                index: null,
                url: null
            });
        } else {
            setRow(clickedDiv.dataset.row);
            setValue({
                index: index,
                url: url
            });
            setClickType(type);

            (viewType === "live" && type!== "advanced") && TrackIconClick(id)

            setTimeout(function(){
                document.querySelector('.folder.open .folder_content').scrollIntoView({
                    behavior: 'smooth',
                    block: "nearest",
                });
            }, 300)
        }

    }

    return (
        <div className={ `${colClasses} ${mainIndex == value.index && clickType === type ? "open" : "" }`}
             data-row={ dataRow }
             onClick={(e) => {handleClick(e)} }
        >
            {active_status ?
                <>
                    <a className={!displayIcon ?
                        "default" : ""}
                       href="#">
                        <img src={displayIcon} alt=""/>
                    </a>
                    <p>
                        {name && name.length >
                        11 ?
                            name.substring(0,
                                11) + "..."
                            :
                            name || "Link Name"
                        }
                    </p>
                </>
                :
                ""
            }
        </div>
    );
};

export default AdvancedIcon;
