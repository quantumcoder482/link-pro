import React, {useCallback} from 'react';
import {changePlan} from '@/Services/SubscriptionRequests.jsx';
import {router} from '@inertiajs/react';

const ConfirmChange = ({
                           confirmChange,
                           setConfirmChange,
                           setError,
                           setShowLoader
}) => {

    const {type, plan, subId, pmType} = confirmChange;

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        setShowLoader({
            show: true,
            position: 'absolute',
            icon: ""
        })

        const packets = {
            plan: plan,
            subId: subId,
            pmType: pmType
        }

        changePlan(packets).then((response) => {

            if (response.success) {
                router.get(response.url, {message: response.message})
            } else {
                setError({
                    show: true,
                    message: response.message
                });

                setConfirmChange({
                    show: false,
                    plan: "",
                    subId: ""
                })
            }

            setShowLoader({
                show: false,
                position: "",
                icon: ""
            })
        })


    }, []);

    const handleClose = useCallback((e) => {
        e.preventDefault();

        setConfirmChange({
            show: false,
            level: ""
        })
    }, [])

    return (
        <div id="confirm_popup">
            <div className="content_wrap">
                <div className="form_icon_wrap svg check">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                </div>
                <h2>Confirm</h2>
                <div className="text_wrap">
                    <p className="confirm_text">Are you sure you want to <span id="text_type">change</span> your plan?</p>
                    {type !== "cancel" &&
                        <p>Your default payment method will automatically be used. </p>
                    }
                    <form className="button_row" action="" method="post" id="popup_form" onSubmit={(e) => handleSubmit(e)}>
                        <input className="level" name="level" type="hidden" value="" />
                        <input className="plan" name="plan" type="hidden" value="" />
                        <div className="button_row flex gap-4 mt-5">
                            <button type="submit" className="button green">Yes</button>
                            <a className="close_popup button transparent gray"
                               href="#"
                               onClick={(e) => handleClose(e)}
                            >No</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ConfirmChange;
