import React, {useEffect, useRef, useState} from 'react';
import {useForm} from '@inertiajs/react';
import {isEmpty} from 'lodash';
import {updateUserInfo} from '@/Services/UserService.jsx';
import EventBus from '@/Utils/Bus.jsx';

const UserForm = ({
                      userInfo,
                      setUserInfo
}) => {

    const { data, setData, put, processing, errors, clearErrors, reset, setDefaults } = useForm({
        email: null,
        password: null,
        password_confirmation: null
    });

    const passwordInput = useRef();
    const confirmPasswordInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors()

        put('/update-account/', {
            preserveScroll: true,
            onSuccess: () => {
                reset();

                let message = "";
                if (data.email && data.email !== userInfo.email && data.password) {

                    message = "Your email and password have been updated";

                    setUserInfo({
                        ...userInfo,
                        email: data.email
                    })
                } else if (data.email && data.email !== userInfo.email) {
                    setUserInfo({
                        ...userInfo,
                        email: data.email
                    })

                    message = "Your email has been updated";
                } else {
                    message = "Your password has been updated";
                }

                EventBus.dispatch("success", { message: message });
                passwordInput.current.value = null;
                confirmPasswordInput.current.value = null;

            }
        })
    }

    const handleFocus = (e) => {
        e.target.classList.add('active')
    }

    return (
        <>
            {!isEmpty(errors) && console.log(errors)}
            <h2 className="text-uppercase">Account Info</h2>
            <form method="POST" onSubmit={handleSubmit} action={`/update-account/${userInfo.id}`}>
                <div className="form_inputs">
                    <div className="user_account mb-5 my_row">
                        <h5 className="my_row mb-4 text-left">Update Email</h5>
                        <div className="input_wrap my_row relative">
                            <input id="email"
                                   type="email"
                                   className={`w-full animate bg-white ${userInfo.email ? "active" : ""} ${errors.email ? "border-danger" : ""} `}
                                   name="email"
                                   defaultValue={ userInfo.email }
                                   autoComplete="email"
                                   onChange={(e) => setData('email', e.target.value)}
                            />
                            <label className="z-2" htmlFor="email">E-Mail Address</label>
                        </div>
                        {errors.email &&
                            <small className="text-red-600 mb-3 block">{errors.email }</small>
                        }
                    </div>
                    <div className="user_account">
                        <h5 className="my_row my_row mb-4 text-left">Change Password</h5>
                        <div className="input_wrap my_row relative mb-2">
                            <input ref={passwordInput}
                                   id="password"
                                   type="password"
                                   className={`w-full animate bg-white ${data.password && "active"} ${errors.password && "border-danger"} `}
                                   name="password"
                                   autoComplete="new-password"
                                   defaultValue={ data.password }
                                   onChange={(e) => setData('password', e.target.value)}
                                   onFocus={handleFocus}
                            />
                            <label className="z-2" htmlFor="password">New Password</label>
                        </div>
                    </div>
                    <div className="input_wrap my_row relative mb-3">
                        <input ref={confirmPasswordInput}
                               id="password_confirmation"
                               type="password"
                               className={`w-full animate bg-white ${data.password && "active"} ${errors.password_confirmation && "border-danger"} `}
                               name="password_confirmation"
                               autoComplete="new-password"
                               defaultValue={ data.password_confirmation }
                               onChange={(e) => setData('password_confirmation', e.target.value)}
                               onFocus={handleFocus}
                        />
                        <label className="z-2" htmlFor="password_confirmation">Confirm New Password</label>
                    </div>
                    {errors.password &&
                        <small className="text-red-600 mb-3 block">{errors.password}</small>
                    }
                </div>
                <div className="form_buttons">
                    <button disabled={processing} type="submit" className="button blue text-uppercase">
                        Update My Info
                    </button>
                </div>
            </form>
        </>
    );
};

export default UserForm;
