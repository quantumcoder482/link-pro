import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, usePage} from '@inertiajs/react';
import PaymentComponent from '@/Pages/User/Components/PaymentComponent.jsx';
import UserForm from '@/Pages/User/Components/UserForm.jsx';
import SetFlash from '@/Utils/SetFlash.jsx';
import ChoosePlanContent from '@/Pages/User/Components/ChoosePlanContent.jsx';
import PlanComponent from '@/Pages/User/Components/PlanComponent.jsx';
import BreadCrumbs from '@/Pages/User/Components/BreadCrumbs.jsx';
import {isEmpty} from 'lodash';
import {Loader} from '@/Utils/Loader.jsx';
import {
    SubscriptionPaymentButtons
} from '@/Components/Payments/SubscriptionPaymentButtons.jsx';
import EventBus from '@/Utils/Bus.jsx';
import PayOutComponent from '@/Pages/User/Components/PayOutComponent.jsx';
import {MessageAlertPopup} from '@/Utils/Popups/MessageAlertPopup.jsx';

const User = ({
                  message = null,
                  isAffiliate = false,
                  hasOffers = false,
                  payoutInfoSubmitted = false,
                  total = false,
}) => {

    const { auth } = usePage().props;
    const permissions = auth.user.permissions;
    const [userInfo, setUserInfo] = useState(auth.user.userInfo);
    const env = auth.env;
    const [showMessageAlertPopup, setShowMessageAlertPopup] = useState({
        show: false,
        text: ""
    });
    const [showSection, setShowSection] = useState([]);
    const [subscription, setSubscription] = useState(auth.user.subscription);

    const stripeUrl = env === "production" ?
        "https://checkout.link.pro/p/login/eVa2aU4q09HyfKg144?prefilled_email=" :
        "https://checkout.link.pro/p/login/test_3cs6pE5zK02p6Nq145?prefilled_email=";

    const [showPaymentButtons, setShowPaymentButtons] = useState({
        show: false,
        type: "",
        plan: "",
        pmType: "",
        stripeUrl: stripeUrl + userInfo.email,
    });

    const [showLoader, setShowLoader] = useState({
        show: false,
        icon: "",
        position: "",
        progress: null
    });

    useEffect(() => {
        if(message) {
            EventBus.dispatch("success", {message: message});
        }
    }, []);

    return (

        <AuthenticatedLayout>
            <Head title="Edit Accouunt" />
            <SetFlash />
            <div className="container">
                {showMessageAlertPopup.show &&
                    <MessageAlertPopup
                        showMessageAlertPopup={showMessageAlertPopup}
                        setShowMessageAlertPopup={setShowMessageAlertPopup}
                    />
                }
                <div className={`user_account my_row text-center form_page plans ${permissions.includes('view subscription details') ? "mt-4" : "" }`}>
                    <h2 className="page_title">Update Account Settings</h2>
                    <div className={`card inline-block relative
                    ${(showSection.includes("changePlan") ||
                        showSection.includes("changePayPalPlan") ||
                        showPaymentButtons.show) && 'active'}`}
                    >

                        {showLoader.show &&
                            <Loader
                                showLoader={showLoader}
                            />
                        }

                        {!isEmpty(showSection) &&
                            <BreadCrumbs
                                showSection={showSection}
                                setShowSection={setShowSection}
                            />
                        }
                        {showSection.includes("plans") || (showSection.includes("cancel")) ?

                            <ChoosePlanContent
                                showSection={showSection}
                                setShowSection={setShowSection}
                                subscription={subscription}
                                setSubscription={setSubscription}
                                setShowLoader={setShowLoader}
                                pmType={userInfo.pm_type}
                                env={auth.env}
                            />

                        :
                            showPaymentButtons.show ?
                                <SubscriptionPaymentButtons
                                    showPaymentButtons={showPaymentButtons}
                                    setShowPaymentButtons={setShowPaymentButtons}
                                    env={auth.env}
                                    subId={subscription.sub_id}
                                    setUserInfo={setUserInfo}
                                    setSubscription={setSubscription}
                                    subEndDate={subscription.ends_at}
                                />
                                :
                            <div className={`w-full inline-block ${ (permissions.includes("view subscription details") &&
                                (!subscription || subscription.sub_id === "bypass") ) || (!permissions.includes("view subscription details") && permissions.includes('view courses')) ? "two_columns" : ""}`}>
                                <div className="card-body w-full inline-block">
                                    <div className=
                                             {`my_row ${permissions.includes("view subscription details") && (subscription && subscription.sub_id !== "bypass") ? "three_columns " : ""} ${ (!subscription || subscription.sub_id === "bypass") ? "two_columns" : ""}`}>
                                        <div className={`column update_info ${!permissions.includes('view subscription details') ? "!w-full" : ""}`}>
                                            <UserForm
                                                userInfo={userInfo}
                                                setUserInfo={setUserInfo}
                                            />
                                        </div>
                                        {permissions.includes('view subscription details') &&

                                            <div className="column">
                                                <PlanComponent
                                                    subscription={subscription}
                                                    setSubscription={setSubscription}
                                                    userInfo={userInfo}
                                                    showSection={showSection}
                                                    setShowSection={setShowSection}
                                                    setShowLoader={setShowLoader}
                                                    pmType={userInfo.pm_type}
                                                    setShowPaymentButtons={setShowPaymentButtons}
                                                />
                                            </div>
                                        }
                                        { (subscription && subscription.sub_id !== "bypass") &&
                                            <div className="column payment">
                                                <PaymentComponent
                                                    userInfo={userInfo}
                                                    plan={subscription.name}
                                                    status={subscription.status}
                                                    setShowPaymentButtons={setShowPaymentButtons}
                                                />
                                            </div>
                                        }
                                    </div>
                                    { (hasOffers || isAffiliate) && !payoutInfoSubmitted ?
                                        <PayOutComponent
                                            setShowLoader={setShowLoader}
                                            total={total}
                                            setShowMessageAlertPopup={setShowMessageAlertPopup}
                                        />
                                        :
                                        ""
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default User;
