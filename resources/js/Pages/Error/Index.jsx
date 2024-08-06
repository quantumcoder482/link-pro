import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {isEmpty} from 'lodash';

export default function ErrorPage({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    return (

        <GuestLayout>
            <Head title={title}/>
            <div className="container">
                <div className="h-96 flex flex-col justify-top w-full text-center">
                    <h1 className="text-4xl mb-5">{title}</h1>
                    <p className="text-lg mb-10">{description}</p>
                    <a className="blue" href={route('login')}>Return To Home Page</a>
                </div>

            </div>
        </GuestLayout>
    )
}
