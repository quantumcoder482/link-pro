import React from 'react';
import {redirectToOnboarding} from '@/Services/UserService.jsx';
import {router} from '@inertiajs/react';

const PayOutComponent = ({setShowLoader, total, setShowMessageAlertPopup}) => {

    const handleClick = (e) => {
        e.preventDefault();

        if (total > 100) {
            setShowLoader({
                show: true,
                position: 'fixed',
                icon: ""
            })
            redirectToOnboarding().then(response => {
                if (response.success) {
                    window.location.href = response.url
                }

                setShowLoader({
                    show: false,
                    position: "",
                    icon: ""
                })
            })
        } else {
            setShowMessageAlertPopup({
                show: true,
                text: "You must earn at least $100 before setting up your payment information."
            })
        }
    }

    return (
        <div className="my_row payout mt-5">
            <h2 className="text-uppercase">Payout Information</h2>
            <div className="lg:inline-flex align-center justify-center">
                <div className="p-5 text-left lg:w-3/4 w-full">
                    <p>In order to be paid out as an affiliate or course creator you will need to submit your payment details by clicking the button and following the prompts. Once you earn $100 or more we will send your payment.</p>
                </div>
                <div className="p-5 lg:w-1/3 w-full">
                    <a target="_blank"
                       href="#"
                       className="button blue text-uppercase self-center"
                       onClick={handleClick}
                    >
                        Submit Payout Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PayOutComponent;
