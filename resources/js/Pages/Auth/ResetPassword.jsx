import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        login: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post('/reset-password-submit', {
            preserveScroll: true,
            onSuccess: () => reset('login'),
        })
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="container">
                <div className="my_row form_page">
                    <div className="mb-4 card guest login_form">
                        <div className="mb-4">
                            <h3>Reset Password</h3>
                        </div>
                        <h5 className="text-center text-sm mb-4">Enter your new password below</h5>
                        <form onSubmit={submit}>
                            <div className="relative">
                                <TextInput
                                    id="login"
                                    type="email"
                                    name="login"
                                    value={data.login}
                                    className={` mt-1 block w-full animate ${email && "active"} `}
                                    autoComplete="username"
                                    onChange={(e) => setData('login', e.target.value)}
                                />
                                <InputLabel htmlFor="login" value="Email" />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4 relative">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full animate"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputLabel htmlFor="password" value="Password" />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4 relative">
                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full animate"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Reset Password
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
