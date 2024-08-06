import React, {useEffect, useState} from 'react';
import {getClientId} from '@/Services/PayPalRequests.jsx';
import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import {Link, router} from '@inertiajs/react';
import {Loader} from '@/Utils/Loader.jsx';

const PurchasePaymentButtons = ({showPaymentButtons}) => {

    const [initialOptions, setInitialOptions] = useState({});
    const [showLoader, setShowLoader] = useState({
        show: true,
        icon: "",
        position: "absolute",
        progress: null
    });

    useEffect(() => {
        getClientId().then((response) => {

            if(response.success) {
                setInitialOptions({
                    clientId : response.client,
                    intent: "capture",
                    components: "buttons",
                    vault: "false",
                    "disable-funding": "paylater,card",
                    "data-sdk-integration-source":"integrationbuilder_sc",
                })

                setShowLoader({
                    show: false,
                });
            }
        })

    }, [showPaymentButtons]);

    const ButtonWrapper = ({type}) => {
        const [{ options }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    intent: "capture",
                },
            });
        }, [type]);

        return (<PayPalButtons
            style={{
                shape: "rect",
                layout: "vertical",
                height: 45,
                disableMaxWidth: true,
                label: "checkout"
            }}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />);
    }

    const createOrder = (data, actions) => {

        return actions.order.create({
            "purchase_units": [{
                "amount": {
                    "currency_code": "USD",
                    "value": showPaymentButtons.price
                }
            }],
            "application_context": {
                "shipping_preference": "NO_SHIPPING",
                "user_action": "PAY_NOW",
                "brand_name": "LinkPro",
                "locale": "en-US",
            },
        });
    }

    const onApprove = (data, actions) => {

        actions.order.get(data.orderID)
        .then((response) => {
            router.visit(route('course.purchase.success'), {
                method: 'get',
                data: {
                    price: showPaymentButtons.price,
                    affRef: showPaymentButtons.affRef,
                    cid: showPaymentButtons.clickId,
                    offer: showPaymentButtons.offerId,
                    orderId: data.orderID,
                    pmType: "paypal",
                    status: response.status,
                    customerId: data.payerID,
                    customerName: response.payer.name.given_name
                }
            })
        })

    }

    return (
        showLoader.show ?
            <Loader
                showLoader={showLoader}
            />
            :
        <div className="payment_buttons">
            <div className="form_icon_wrap svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                </svg>
            </div>
            <h3 className="text-center mb-4 text-2xl">Choose Your Payment Method Below</h3>
            <PayPalScriptProvider options={initialOptions}>
                <ButtonWrapper type="subscription"/>
            </PayPalScriptProvider>

            <div className="button_row mt-3 w-full">
                <Link className="button black_gradient !w-full" href={showPaymentButtons.url}>
                    Checkout With Card
                </Link>
                <p className="text-center text-sm mt-1">(Credit Card, GooglePay, ApplePay, CashApp)</p>
            </div>
        </div>
    );
};

export default PurchasePaymentButtons;
