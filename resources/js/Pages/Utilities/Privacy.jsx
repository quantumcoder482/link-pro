import React from 'react';
import {Head} from '@inertiajs/react';
import {isEmpty} from 'lodash';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import PageContent from '@/Pages/Utilities/Components/PageContent.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

const Privacy = ({auth}) => {
    return (
        <>
            <Head title="Privacy Policy"/>
            {isEmpty(auth.user.userInfo) ?
                <GuestLayout>
                    <PageContent pageName="privacy"/>
                </GuestLayout>
                :
                <AuthenticatedLayout>
                    <PageContent pageName="privacy"/>
                </AuthenticatedLayout>
            }
        </>
    );
};

export default Privacy;
