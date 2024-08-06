import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import EventBus from '@/Utils/Bus.jsx';
import {updatePaymentMethod} from '@/Services/SubscriptionRequests.jsx';

const PaymentMethodsComponent = ({
                                     token,
                                     subscription,
                                     setShowSection,
                                     setShowLoader
}) => {

    //const [braintreeInstance, setBraintreeInstance] = useState(null);
    const loadRef = useRef(true);
    const dropInRef = useRef(null);

    useEffect(() => {
        const firstRender = loadRef.current;

        if(firstRender || dropInRef.current.innerHTML === "") {
            loadRef.current = false;
            const client_token = token;
            const subscriptionName = subscription.name;
            let amount;
            if (subscriptionName === "pro") {
                amount = '4.99'
            } else {
                amount = '19.99'
            }

            /*braintree.dropin.create({
                authorization: client_token,
                selector: '#bt-dropin-update',
                paypal: {
                    flow: 'vault'
                },
                googlePay: {
                    googlePayVersion: 2,
                    merchantId: '0764-6991-5982',
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPrice: amount,
                        currencyCode: 'USD'
                    },
                },
                venmo: {
                    allowDesktop: true,
                    paymentMethodUsage: 'multi_use',
                },
                applePay: {
                    displayName: 'LinkPro',
                    paymentRequest: {
                        total: {
                            label: 'LinkPro',
                            amount: amount
                        },
                        // We recommend collecting billing address information, at minimum
                        // billing postal code, and passing that billing postal code with all
                        // Apple Pay transactions as a best practice.
                        //requiredBillingContactFields: ["postalAddress"]
                    }
                },
            }, function(createErr, instance) {
                if (createErr) {
                    console.log('Create Error', createErr);
                    return;
                }

                setBraintreeInstance(instance);

            });*/
        }
    },[])

    const handleSubmit = (e) => {

        e.preventDefault();

        setShowLoader({
            show: true,
            position: 'absolute',
            icon: ""
        })

        /*braintreeInstance.requestPaymentMethod(function (err, payload) {
            if (err) {
                console.log('Request Payment Method Error', err);
                return;
            }

            let pmLastFour = null;
            if ( payload.details.lastFour !== undefined) {
                pmLastFour = payload.details.lastFour;
            }

            const packets = {
                payment_method_nonce: payload.nonce,
                pm_last_four: pmLastFour,
                pm_type: payload.type
            }

            updatePaymentMethod(packets).then((response) => {
                if (response.success) {
                    setShowSection([]);
                }

                setShowLoader({
                    show: false,
                    position: "",
                    icon: ""
                })
            })
        });*/
    }

    return (
        <div id="popup_payment_method" className="form_page checkout">
            <div className="content_wrap">
                <div className="form_icon_wrap svg blue_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>
                </div>
                <h2>Choose Another Way to Pay</h2>
                <div className="text_wrap form_wrap">
                    <form id="update_payment_method_form" action="" method="">
                        <div className="bt-drop-in-wrapper">
                            <div ref={dropInRef} id="bt-dropin-update"></div>
                        </div>
                        <a href="#"
                           className='button blue'
                           onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodsComponent;
