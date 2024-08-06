import React, {useCallback, useEffect, useState} from 'react';
import {Head, Link, usePage} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import ConfirmChange from './ConfirmChange.jsx';
import {Loader} from '@/Utils/Loader.jsx';
import {SubscriptionPaymentButtons} from '@/Components/Payments/SubscriptionPaymentButtons.jsx';
import ProPlan from '@/Components/PlanComponents/ProPlan.jsx';
import PremierPlan from '@/Components/PlanComponents/PremierPlan.jsx';
import {
    GetCurrentTime,
    GetHumanReadableTime,
} from '@/Services/TimeRequests.jsx';
function Plans({type}) {

    const { auth } = usePage().props;
    const subscriptionName = auth.user.subscription ? auth.user.subscription.name : null;
    const status = auth.user.subscription ? auth.user.subscription.status : null;
    const subId = auth.user.subscription ? auth.user.subscription.sub_id : null;
    const pmType = auth.user.userInfo.pm_type;
    const env = auth.env;

    const [showLoader, setShowLoader] = useState({
        show: false,
        icon: "",
        position: "",
        progress: null
    });

    const [error, setError] = useState({
        show: false,
        message: ""
    })

    const [confirmChange, setConfirmChange] = useState({
        show: false,
        type: "",
        plan: "",
        subId: ""
    });

    const [showPaymentButtons, setShowPaymentButtons] = useState({
        show: false,
        type: "",
        plan: "",
    });

    const [currentDateTime, setCurrentDateTime] = useState("");
    const [subEnd, setSubEnd]   = useState("");

    useEffect(() => {
        setCurrentDateTime(GetCurrentTime);
    }, []);

    useEffect(() => {
        if(auth.user.subscription) {
            setSubEnd(GetHumanReadableTime(auth.user.subscription.ends_at))
        }
    }, [])

    const isCurrentPremier = (subscriptionName === 'premier') &&
        (status === 'active' || (status === 'canceled' && currentDateTime < subEnd))


    const handleUpgradeClick = useCallback((e, plan) => {
        e.preventDefault();

        if (pmType === "paypal") {
            setShowPaymentButtons({
                show: true,
                type: "changePlan",
                plan: plan,
                pmType: pmType
            })
        } else {
            setConfirmChange({
                show: true,
                type: "changePlan",
                plan: plan,
                subId: subId,
                pmType: pmType,
            })
        }
    },[])

    const handlePurchaseClick = useCallback((e, type, planName) => {
        e.preventDefault();
        setShowPaymentButtons({
            show: true,
            type: type,
            plan: planName
        })
    },[]);

    return (
        <AuthenticatedLayout>
            <Head title="Subscription Plans"/>
            <div className="container">
                <div className="my_row form_page plans text-center">
                    <div className={`card inline-block relative ${confirmChange.show || showPaymentButtons.show ? 'active' : ""} `}>
                    {showPaymentButtons.show ?

                            <SubscriptionPaymentButtons
                                showPaymentButtons={showPaymentButtons}
                                setShowPaymentButtons={setShowPaymentButtons}
                                env={env}
                                subId={subId}
                            />

                        :
                        <>
                            {type === "register" ?
                                <>
                                    <h2 className="page_title !m-0">Welcome to Link Pro!</h2>
                                    <p className="sub_title mb-5">Continue free forever or upgrade for advanced features!</p>
                                </>
                                :
                                <h2 className="page_title">Upgrade Now For Advanced Features!</h2>
                            }


                            {showLoader.show &&
                                <Loader
                                    showLoader={showLoader}
                                />
                            }

                            <div className="card-body inline-block w-full">
                                {error.show &&
                                    <div className="my_row block text-center mb-5 p-3 border rounded-lg border-red-500">
                                        <p className="text-red-500">
                                            {error.message}
                                        </p>
                                    </div>
                                }

                                {confirmChange.show ?
                                    <ConfirmChange
                                        confirmChange={confirmChange}
                                        setConfirmChange={setConfirmChange}
                                        setError={setError}
                                        setShowLoader={setShowLoader}
                                    />
                                    :

                                    <div className={`my_row  ${
                                        (subscriptionName === 'premier') && (status === 'active' ||
                                            status === 'canceled') ?
                                            'two_columns' :
                                            'three_columns'}`}>
                                        {(!subscriptionName ||
                                            (subscriptionName !==
                                                'premier')) ||
                                        (status !== 'active' && status !==
                                            'canceled') ?
                                            <ProPlan
                                                clickMethod={handlePurchaseClick}
                                                type="purchase"
                                                isCurrent={(subscriptionName === 'pro') &&
                                                    (status === 'active' || (status === 'canceled' && currentDateTime < subEnd))}
                                            />
                                            :
                                            ''
                                        }
                                        <PremierPlan
                                            clickMethod={subscriptionName && !isCurrentPremier ? handleUpgradeClick : handlePurchaseClick}
                                            type={subscriptionName && !isCurrentPremier ? "changePlan" : "purchase"}
                                            isCurrent={isCurrentPremier}
                                        />
                                        <div className="column custom">
                                            <h2 className="text-uppercase">Custom</h2>
                                            <ul>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                    </svg>
                                                    <p>Unlimited Links</p>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                    </svg>
                                                    <p>Dedicated Account Manager</p>
                                                </li>
                                            </ul>
                                            <div className="pricing">
                                                <h3>ASK</h3>
                                            </div>
                                            <div className="button_row">
                                                <a className="button gray_gradient" href="mailto:admin@link.pro">Contact Us</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {type === "register" &&
                                    <div className="my_row">
                                        <div className="column free plans_page">
                                            <h2 className="text-uppercase">Free</h2>
                                            <div className="my_row three_columns">
                                                <div className="column">
                                                    <h4>Having trouble choosing?</h4>
                                                    <p>No Problem! Continue now free and upgrade later!</p>
                                                </div>
                                                <div className="column">
                                                    <ul>
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                            </svg>
                                                            <p>1 Unique Link</p>
                                                        </li>
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                            </svg>
                                                            <p>Up To 8 Icons</p>
                                                        </li>
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                            </svg>
                                                            <p>Add Social Links</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="column">
                                                    <Link className="button green_gradient" href={route(
                                                        'dashboard')}>Continue</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Plans;
