import React from 'react';
import {setStorage} from '@/Services/LinksRequest.jsx';

const MailchimpIntegration = ({
                                  connectionError,
                                  integrationType,
                                  editID,
                                  pageID
}) => {

    const handleMailchimpClick = (e) => {
        e.preventDefault();

        const url = "/auth/mailchimp";
        let myPromise = new Promise((resolve, reject) => {
            setStorage(editID, integrationType, pageID);
            resolve(url);
            reject("Error");
        })

        myPromise.then(
            function (value) {
                window.location.href = value
            },
            function(error) {
                console.error(error);
            }
        )
    }

    return (
        <div className="integration_wrap">
            <h3>Add your Mailchimp account as a LinkPro button!</h3>
            <p className="mb-4">Connect your Mailchimp account by clicking the button below.</p>
            <p className="small">Note: You will be redirected away from Link Pro to log into Mailchimp. You will need to either already have or create a new MailChimp account of your own to use this integration.</p>
            <div id="scrollTo" className="button_wrap mt-4">
                <a className="button blue"
                   href="#"
                   onClick={(e) => handleMailchimpClick(e)}
                >
                    Login To Mailchimp
                </a>
            </div>
            <div className="connection_error">
                <p>{connectionError}</p>
            </div>
        </div>
    );
};

export default MailchimpIntegration;
