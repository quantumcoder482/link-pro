import React from 'react';
import {checkIcon} from '@/Services/UserService.jsx';

const FolderLinks = ({
                         icons,
                         subStatus,
                         viewType
}) => {

    const {name, icon, active_status} = icons

    return (

        <div className="image_col">
            {active_status ?
                <img src={checkIcon(icon, viewType, subStatus)} alt={name} title={name}/>
                :
                ""
            }
        </div>
    )
}

export default FolderLinks;
