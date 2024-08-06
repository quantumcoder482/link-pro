import React from 'react';
import {Head} from '@inertiajs/react';
import {isEmpty} from 'lodash';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import PageContent from '@/Pages/Utilities/Components/PageContent.jsx';

const Terms = ({auth}) => {

    return (

        <>
            <Head title="Terms and Conditions" />
            { isEmpty(auth.user.userInfo) ?
                <GuestLayout>
                    <PageContent pageName="terms" />
                </GuestLayout>
                :
                <AuthenticatedLayout>
                    <PageContent pageName="terms" />
                </AuthenticatedLayout>
            }
            </>

    );
};

export default Terms;
