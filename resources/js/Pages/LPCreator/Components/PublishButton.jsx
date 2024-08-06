import React from 'react';

import {LP_ACTIONS} from '@/Components/Reducers/CreatorReducers.jsx';
import {IoWarningOutline} from 'react-icons/io5';
import {publishPage} from '@/Services/LandingPageRequests.jsx';

const PublishButton = ({pageData, dispatch}) => {

   const handleOnClick = (e) => {
       e.preventDefault();

       const packets = {
           published: true,
       };

       publishPage(packets, pageData["id"])
       .then((response) => {
           if (response.success) {
               dispatch({
                   type: LP_ACTIONS.UPDATE_PAGE_DATA,
                   payload: {
                       value: true,
                       name: "published"
                   }
               })
           }
       });
   }

    return (
        <div className="my_row button_wrap mt-3">
            <button type="submit" disabled={!pageData["title"] ? "disabled" : ""} className={!pageData["title"] ? "button blue disabled" : "button blue"} onClick={(e) => handleOnClick(e)}>
                Publish
            </button>
            {!pageData["title"] ?
                <p><IoWarningOutline /> Course requires a title/slug before being published</p>
                :
                ""
            }

        </div>
    );
};

export default PublishButton;
