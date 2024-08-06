import React from 'react';
import {Head} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { IoIosCloseCircle } from "react-icons/io";

const CancelCheckout = ({type}) => {
    return (
        <AuthenticatedLayout>
            <Head title="Subscription Purchased"/>
            <div className="container">
                <div className="my_row text-center mt-4">
                    <h2 className="page_title">Checkout Canceled</h2>
                    <div className="card inline-block relative status_message">
                        <div className="cancel_icon">
                            <IoIosCloseCircle/>
                        </div>
                        <h3 className="mb-3">Change your mind?</h3>
                        {type === 'subscription' ?
                            <>
                                <p className="mb-4">You can still continue to use LinkPro on your current plan.</p>
                                <p><a href={route(
                                    'dashboard')}>Go to your Dashboard</a></p>
                                <p>OR</p>
                                <p><a href={route(
                                    'plans.get')}>CLICK HERE</a> to try a different plan.
                                </p>
                            </>
                            :
                            <>
                                <p className="mb-4">If you're not ready to purchase this course.</p>
                                <p><a href={route(
                                    'all.courses')}>CLICK HERE</a> to check out other courses that are available.
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CancelCheckout;
