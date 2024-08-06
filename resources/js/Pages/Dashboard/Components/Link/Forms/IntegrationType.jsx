import React, {useEffect} from 'react';
import {
    getMailchimpLists,
    getStores,
} from '@/Services/UserService.jsx';
import {isEmpty} from 'lodash';
import {
    HandleFocus,
    HandleBlur,
} from '@/Utils/InputAnimations.jsx';

const IntegrationType = ({
                             integrationType,
                             setIntegrationType,
                             setShowLoader,
                             setLists,
                             redirectedType,
                             setShopifyStores
}) => {

    useEffect(() => {

        if (integrationType === "mailchimp") {
            //setIntegrationType("mailchimp");
            fetchLists()
        } else if (integrationType === "shopify") {
            //setIntegrationType("shopify")
            fetchStores()
        }

        if(redirectedType) {
            redirectedType === "mailchimp" ?
                fetchLists() :
                fetchStores()
        }

    },[integrationType])

    const handleChange = (e) => {
        const value = e.target.value;

        setIntegrationType(value);

        if(value === "mailchimp") {
            fetchLists()
        }

        if(value === "shopify") {
            fetchStores()
        }

        setTimeout(function(){
            document.querySelector('#scrollTo').scrollIntoView({
                behavior: 'smooth',
                block: "start",
                inline: "nearest"
            });

        }, 300)
    }

    const fetchLists = () => {

        setShowLoader({show: true, icon: "loading", position: "absolute"});

        getMailchimpLists().then(
            (data) => {
                if (data.success) {
                    !isEmpty(data.lists) && setLists(data.lists);
                    setShowLoader({show: false, icon: "", position: ""});
                }
            }
        )
    }

    const fetchStores = () => {

        setShowLoader({show: true, icon: "loading", position: "absolute"});

        getStores().then(
            (data) => {
                if (data.success) {
                    !isEmpty(data.stores) && setShopifyStores(data.stores)
                    setShowLoader({show: false, icon: "", position: ""});
                }
            }
        )
    }

    return (
        <div className="integration_dropdown_wrap">
            <select
                className={integrationType !== "" ? "active" : ""}
                name="integration_type"
                onChange={(e) => handleChange(e)}
                onFocus={(e) => HandleFocus(e.target)}
                onBlur={(e) => HandleBlur(e.target)}
                value={integrationType || undefined}
            >
                <option value=""></option>
                <option
                    value="mailchimp">
                    MailChimp
                </option>
                <option
                    value="shopify">
                    Shopify
                </option>
            </select>
            <label htmlFor="mailchimp_list_id">Select Integration Type</label>
        </div>
    );
};

export default IntegrationType;
