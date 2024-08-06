import React, {useEffect, useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox.jsx';
import {useGoogleRecaptchaV3, checkRecaptcha} from '@/Utils/useGoogleRecaptchaV3.jsx';
import {Loader} from '@/Utils/Loader.jsx';
import {IoWarningOutline} from 'react-icons/io5';

export default function Register({honeypot, spamDetected = false}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        [`${honeypot.nameFieldName}`]: '',
        [`${honeypot.validFromFieldName}`] : honeypot.encryptedValidFrom
    });

    const [showLoader, setShowLoader] = useState({
        show: false,
        position: 'absolute',
        progress: null,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const executeRecaptcha = useGoogleRecaptchaV3()

    const submit = async (e) => {
        e.preventDefault();
        setShowLoader(prevState => ({
            ...prevState,
            show: true
        }));

        const action = 'register'
        const token = await executeRecaptcha(action);
        checkRecaptcha(token, action).then((response)=> {
            if (response.valid) {
                post(route('register'));
            }
            setShowLoader(prevState => ({
                ...prevState,
                show: false
            }));
        })
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="container">
                <div className="my_row form_page">
                    <div className="card guest relative">
                        {showLoader.show &&
                            <Loader showLoader={showLoader} />}
                        {spamDetected ?
                            <div className="warning_message">
                                <div className="icon_wrap red">
                                    <IoWarningOutline />
                                </div>
                                <h3>You have been flagged!</h3>
                                <h3>GO AWAY!</h3>
                            </div>
                        :
                            <>
                            <div className="mb-4">
                                <h3>Take control of your social sharing!</h3>
                                <h4 className="text-center">Create your free account below to get started.</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submit}>

                                    <div className="form-group relative">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full animate"
                                            autoComplete="username"
                                            onChange={(e) => setData('email',
                                                e.target.value)}
                                            required
                                        />
                                        <InputLabel htmlFor="email" value="Email"/>
                                        <InputError message={errors.email} className="mt-2"/>
                                    </div>

                                    <div className="mt-4 form-group relative">
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full animate"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password',
                                                e.target.value)}
                                            required
                                        />
                                        <InputLabel htmlFor="password" value="Password"/>
                                        <InputError message={errors.password} className="mt-2"/>
                                    </div>

                                    <div className="mt-4 form-group relative">

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full animate"
                                            autoComplete="new-password"
                                            onChange={(e) => setData(
                                                'password_confirmation',
                                                e.target.value)}
                                            required
                                        />
                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
                                        <InputError message={errors.password_confirmation} className="mt-2"/>
                                    </div>
                                    <div className="form-group row relative" style={{
                                        position: 'absolute',
                                        opacity: 0,
                                        top: 0,
                                        left: 0,
                                        height: 0,
                                        width: 0,
                                        zIndex: -1
                                    }}>
                                        <input type="text"
                                               autoComplete="off"
                                               placeholder="Last Name"
                                               value={data.last_name}
                                               name={honeypot.nameFieldName}
                                               id={honeypot.nameFieldName}
                                               onChange={(e) => setData(
                                                   honeypot.nameFieldName,
                                                   e.target.value)}
                                        />
                                        <input autoComplete="off"
                                               type="text"
                                               name={honeypot.validFromFieldName}
                                        />
                                    </div>
                                    <div className="form-group form-check mt-2 flex align-center">
                                        <Checkbox
                                            className="form-check-input"
                                            name="terms"
                                            checked={data.remember}
                                            onChange={(e) => setData('terms',
                                                e.target.checked)}
                                            required
                                        />
                                        {/*<input className="form-check-input" type="checkbox" name="remember" id="remember" required />
    */}
                                        <label className="form-check-label" htmlFor="terms">
                                            Check here to agree to LinkPro's
                                            <Link target="_blank" href={route(
                                                'terms')}>Terms and Conditions</Link> and
                                            <Link target="_blank" href={route(
                                                'privacy')}> Privacy Policy</Link>
                                        </label>
                                    </div>
                                    <div className="block mt-4 text-center">
                                        <PrimaryButton className="button blue text-uppercase mb-4" disabled={processing}>
                                            Let's Do This
                                        </PrimaryButton>
                                        <Link
                                            href={route('login')}
                                            className="text-blue-600 font-bold text-sm hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Already on LinkPro? Login Now
                                        </Link>
                                    </div>
                                </form>
                            </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
