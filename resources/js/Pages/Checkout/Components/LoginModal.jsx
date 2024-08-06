import React, {useEffect, useState} from 'react';
import InputAnimations from '@/Utils/InputAnimations.jsx';
import {router, useForm} from '@inertiajs/react';
import InputError from '@/Components/InputError.jsx';

const LoginModal = ({setShowLogin}) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        identity: '',
        password: '',
    });

    const [active, setActive] = useState("");

    const [redirectUrl, setRedirectUrl] = useState("");

    useEffect(() => {
        setActive("active");
    },[])

    useEffect(() => {
        setRedirectUrl(window.location.href.replace('course', 'course-page').replace("register", "") + '&section=checkout');
    },[])

    const handleClose = (e) => {
        e.preventDefault()
        setActive("");
        setTimeout(() => {
            setShowLogin(false);
        },300)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        post(('/custom-login'), {
            preserveScroll: true,
            onSuccess: () => router.visit(redirectUrl),
        });
    }

    return (
        <div className={`modal fade form_page ${active}`} id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
            <InputAnimations />
            <div className="modal-content card guest login_form bg-white">
                <div className="standard_heading">
                    <h3 className="modal-title text-center">Log In</h3>
                </div>
                <a className="close"
                   aria-label="Close"
                   href="#"
                   onClick={e => handleClose(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                </a>
                <div className="modal-body">
                    <form id="custom_login_form" method="POST" onSubmit={(e) => handleSubmit(e)}>
                        <div className="w-full mx-auto mb-3">
                            <span className="invalid-feedback" role="alert"></span>
                        </div>
                        <div className="w-full mx-auto relative p-0 mb-4">
                            <input
                                id="identity"
                                type="text"
                                className="w-full animate"
                                name="identity"
                                value={data.identity}
                                required
                                autoFocus
                                onChange={(e) => setData('identity', e.target.value)}
                                />
                            <label htmlFor="identity">E-mail or UserName</label>
                            <InputError message={errors.identity} className="mt-2" />
                        </div>
                        <div className="w-full mx-auto relative p-0 mb-4">
                            <input id="password"
                                   type="password"
                                   className="form-control animate w-full"
                                   name="password"
                                   value={data.password}
                                   required
                                   autoComplete="current-password"
                                   onChange={(e) => setData('password', e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        {/*<div className="w-full mx-auto p-0 mb-4">
                            <div className="form-check">
                                <input className="form-check-input"
                                       type="checkbox"
                                       name="remember"
                                       id="remember"
                                       checked={data.remember}
                                       onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <label className="form-check-label ml-2" htmlFor="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>*/}
                        <div className="w-full mx-auto p-0">
                            <button type="submit" className="button blue text-uppercase">
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
