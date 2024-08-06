import React, {useState} from 'react';
import ConfirmPlanChange from '@/Pages/User/Components/ConfirmPlanChange.jsx';
import {changePlan} from '@/Services/SubscriptionRequests.jsx';
import {SubscriptionPaymentButtons} from '@/Components/Payments/SubscriptionPaymentButtons.jsx';
import ProPlan from '@/Components/PlanComponents/ProPlan.jsx';
import PremierPlan from '@/Components/PlanComponents/PremierPlan.jsx';

const ChoosePlanContent = ({
                               showSection,
                               setShowSection,
                               subscription,
                               setSubscription,
                               setShowLoader,
                               pmType,
                               env
}) => {

    const [showPaymentButtons, setShowPaymentButtons] = useState({
        show: false,
        type: "",
        plan: "",
        pmType: ""
    });

    const handleButtonClick = (e, type) => {
        e.preventDefault();
        setShowSection((prev) => ([
            ...prev,
            type
        ]))
    }

    const handleUpgradeClick = (e, subscriptionLevel) => {
        e.preventDefault();

        setShowLoader({
            show: true,
            position: 'absolute',
            icon: ""
        })

        if(pmType === "paypal") {
            /*
            * setting this to add class and shrink card for paypal button
            * */
            setShowSection((prev) => ([
                ...prev,
                "changePayPalPlan"
            ]))

            setShowPaymentButtons({
                show: false,
                type: "changePlan",
                plan: subscriptionLevel,
                pmType: pmType,
                page: "user"
            })
        } else {
            const packets = {
                plan: subscriptionLevel,
                subId: subscription.sub_id,
                pmType: pmType
            }

            changePlan(packets).then((response) => {
                if(response.success) {
                    setShowSection([]);
                    setSubscription(prev => ({
                        ...prev,
                        name: subscriptionLevel
                    }))
                }
            })
        }

        setShowLoader({
            show: false,
            position: "",
            icon: ""
        })
    }


    return (
        <div id="popup_choose_level" className="inline-block relative w-full">
            <div className={`form_page plans inline-block w-full`}>

                {showSection.includes("changePlan") || (showSection.includes("cancel")) ?
                    <ConfirmPlanChange
                        subscription={subscription}
                        showSection={showSection}
                        setShowSection={setShowSection}
                        setSubscription={setSubscription}
                        setShowLoader={setShowLoader}
                        pmType={pmType}
                        env={env}
                    />
                    :
                    showSection.includes("changePayPalPlan") ?
                        <SubscriptionPaymentButtons
                            showPaymentButtons={showPaymentButtons}
                            setShowPaymentButtons={setShowPaymentButtons}
                            env={env}
                            subId={subscription.sub_id}
                        />
                    :
                        <>
                            <div className="form_icon_wrap image">
                                <img src={ Vapor.asset('images/icon-change-plans.png') } alt="" />
                            </div>
                            <h2>Change Your Plan</h2>
                            <div className="my_row three_columns two_columns popup mt-2">
                                <div className="column free">
                                    <h2 className="text-uppercase">Free</h2>
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
                                    <div className="pricing">
                                        <h3 className="price"><sup>$</sup>0</h3>
                                    </div>
                                    <a href="#"
                                       className="button green confirm_change_plan"
                                       data-level="free-cancel"
                                       onClick={(e) => handleButtonClick(e, "cancel")}>
                                        Downgrade To Free
                                    </a>
                                </div>
                                { (!subscription.name || subscription.name === "premier") &&
                                    <ProPlan
                                        clickMethod={handleButtonClick}
                                        type="changePlan"
                                    />
                                }

                                { (!subscription.name || subscription.name === "pro") ?

                                    <PremierPlan
                                        clickMethod={handleUpgradeClick}
                                        type="changePlan"
                                    />
                                    :
                                    ""
                                }

                            </div>
                        </>
                }

            </div>
        </div>
    );
}

export default ChoosePlanContent;
