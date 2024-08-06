import React from 'react';
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import {router} from '@inertiajs/react';

const PaymentComponent = ({
                              userInfo,
                              plan,
                              status,
                              setShowPaymentButtons,
}) => {

    const {pm_type, pm_last_four} = userInfo;

    const handleButtonClick = (e) => {
        e.preventDefault();
        if(pm_type === "paypal") {
            router.get("/subscribe?plan=" + plan + "&type=change_payment_method");
        } else {
            setShowPaymentButtons((prev) => ({
                ...prev,
                show: true,
                type: "change_payment_method",
                plan: plan,
                pmType: pm_type
            }));
        }
    }

    return (
        <>
            <h2 className="text-uppercase">Billing Info</h2>
            <p className="mb-4">Your current payment method is: </p>
            {pm_type === 'card' ?
                <>
                    <h3>Credit</h3>
                    <div className="image_wrap !p-0">
                        <BsFillCreditCard2FrontFill />
                    </div>
                    <p>Last 4 numbers of card on file: </p>
                    <p><span>{pm_last_four || ""}</span></p>
                </>
                :
                <div className="image_wrap">
                    {pm_type && pm_type.includes('apple') &&
                        <img src={Vapor.asset('images/apple-pay.svg')} alt=""/>
                    }
                    {pm_type && pm_type.includes('google') &&
                        <img src={Vapor.asset('images/googlepay.png')} alt=""/>
                    }
                    {pm_type && pm_type.includes('cashapp') &&
                        <img src={Vapor.asset('images/cashapp.png')} alt=""/>
                    }
                    {pm_type && pm_type.includes('link') &&
                        <img src={Vapor.asset('images/link-by-stripe.png')} alt="" />
                    }
                    {pm_type && pm_type.includes('paypal') &&
                        <img src={Vapor.asset('images/paypal.png')} alt=""/>
                    }
                </div>
            }
            {status !== 'canceled' &&
                <a target="_blank"
                   href="#"
                   className="button blue text-uppercase mt-auto"
                   onClick={handleButtonClick}
                >
                    Change Payment Method
                </a>
            }
        </>
    );
};

export default PaymentComponent;
