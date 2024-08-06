import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/send-reset-password-email', {
            preserveScroll: true,
            onSuccess: () => reset('login'),
        })

    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="container">
                <div className="my_row form_page">
                    <div className="mb-4 card guest login_form">
                        <div className="mb-4">
                            <h3>Reset Password</h3>
                        </div>
                        <h5 className="text-center text-sm mb-4">Forgot your password? No problem. Just let us know your email address and we will email you a password
                            reset link that will allow you to choose a new one.</h5>
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className="relative">
                                    <TextInput
                                        id="login"
                                        type="email"
                                        name="login"
                                        value={data.email}
                                        className="mt-1 block w-full animate"
                                        isFocused={true}
                                        onChange={(e) => setData('login', e.target.value)}
                                    />
                                    <label htmlFor="login">E-mail</label>
                                </div>
                                <InputError message={errors.email} className="mt-2" />

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton disabled={processing}>
                                        Email Password Reset Link
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
