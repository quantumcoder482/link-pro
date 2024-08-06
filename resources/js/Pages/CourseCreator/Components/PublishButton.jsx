import React from 'react';
import {publishOffer} from '@/Services/OfferRequests.jsx';
import {OFFER_ACTIONS} from '@/Components/Reducers/CreatorReducers.jsx';
import {IoWarningOutline} from 'react-icons/io5';

const PublishButton = ({data, dispatch, courseTitle}) => {


   const handleOnClick = (e) => {
       e.preventDefault();

       const packets = {
           published: true,
       };

       publishOffer(packets, data["id"])
       .then((response) => {
           if (response.success) {
               dispatch({
                   type: OFFER_ACTIONS.UPDATE_OFFER_DATA,
                   payload: {
                       value: true,
                       name: "published"
                   }
               })
           }
       });
   }

    return (
        <div className="my_row button_wrap">
            <button type="submit"
                    disabled={ (!data["price"] || !data["icon"] || !courseTitle) ? "disabled" : ""}
                    className={!data["price"] || !data["icon"] ? "button blue disabled" : "button blue"}
                    onClick={(e) => handleOnClick(e)}
            >
                Publish
            </button>
            {!data["price"] || !data["icon"] ?
                <p><IoWarningOutline /> Course requires an Icon, Price and Title before being published</p>
                :
                ""
            }

        </div>
    );
};

export default PublishButton;
