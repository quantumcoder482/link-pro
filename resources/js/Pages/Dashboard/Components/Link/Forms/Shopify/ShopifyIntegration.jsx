import React, {useState} from 'react';
import {setStorage} from '@/Services/LinksRequest.jsx';

const ShopifyIntegration = ({
                                connectionError,
                                integrationType,
                                editID,
                                showAddStore,
                                setShowAddStore,
                                pageID
}) => {

    const [domain, setDomain] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (domain) {

            const url = "/auth/shopify?domain=" + domain;
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
    }

    return (
        <div className="integration_wrap">
            <h3>Add your Shopify products as a LinkPro button!</h3>
            <p className="mb-4">In connecting Shopify, you are sharing your Shopify store name and Product details with LinkPro.</p>
            <p className="small my-4">Note: You will be redirected away from LinkPro to log into Shopify. You will need to either already have or create a a Shopify store of your own to use this integration.</p>

            <form id="scrollTo" onSubmit={handleSubmit} className="link_form shopify_domain">
                <label htmlFor="domain">Enter your .myshopify.com URL to log into your store.</label>
                <div className="input_wrap">
                    <input type="text"
                           name="domain"
                           placeholder="your-store-name"
                           onChange={(e) => setDomain(e.target.value)}
                           required
                    />
                    <p>.myshopify.com</p>
                </div>

                <div className="button_wrap">
                    <button className="button blue" type="submit">
                        Login To Shopify
                    </button>
                </div>
                {showAddStore &&
                    <div className="button_wrap mt-3">
                        <a href="#" className="button transparent gray" type="submit"
                            onClick={(e) =>{
                                e.preventDefault();
                                setShowAddStore(false);
                            }}
                        >
                            Cancel
                        </a>
                    </div>
                }
                <small>LinkPro will not receive any sales data. All transactions will occur on your Shopify Store.</small>
            </form>
            <div className="connection_error">
                <p>{connectionError}</p>
            </div>
        </div>
    );
};

export default ShopifyIntegration;
