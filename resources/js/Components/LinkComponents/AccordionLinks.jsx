import React from 'react';
import {checkIcon} from '@/Services/UserService.jsx';
import {TrackIconClick} from '@/Services/TrackClicks.jsx';

const AccordionLinks = ({
                            icons,
                            subStatus,
                            viewType
}) => {

    const {id, name, email, phone, icon, url, active_status} = icons
    let source;
    if (email) {
        source = "mailto:" + email;
    } else if (phone) {
        source = "tel:" + phone;
        if(icon.includes("Facetime")) {
            source = 'facetime:' + phone;
        }
    } else {
        source = url;
    }

    return (
        <div className="icon_col">
            {active_status ?
                <>
                    <a href={source}
                       target="_blank"
                       onClick={(e) =>
                           viewType === "live" && TrackIconClick(id)
                    }>
                        <img src={checkIcon(icon, "preview", subStatus)} alt={name} title={name}/>
                    </a>
                    <p>
                        {name?.length >
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
    )
}

export default AccordionLinks;
