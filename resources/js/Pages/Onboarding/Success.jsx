import React from 'react';
import {Head, Link} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {IoCheckmarkCircle} from 'react-icons/io5';

const Success = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Subscription Plans"/>
            <div className="container">
                <div className="my_row text-center mt-4">
                    <h2 className="page_title">SUCCESS!</h2>
                    <div className="card inline-block relative status_message">
                        <div className="success_icon">
                            <IoCheckmarkCircle/>
                        </div>
                        <h3 className="mb-3">We have received your information.</h3>
                        <p className="mb-4">We will contact you if there are any issues. Otherwise be on the lookout for your first payment!</p>
                        <Link className="button blue !text-white !w-full" href="/edit-account">Back to settings page</Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
);
};

export default Success;
