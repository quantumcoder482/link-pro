import CreatePageForm from './Components/CreatePageForm';
import React, {useState} from 'react';
import {Head} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
/*import SocialMediaForms from './Components/SocialMediaForms';
import Facebook from './Components/Facebook';
import Instagram from './Components/Instagram';
import Twitter from './Components/Twitter';
import TikTok from './Components/TikTok';*/

function CreatePage({pageNames}) {

    //const [newPageId, setNewPageId] = useState("");
    //const [step, setStep] = useState("name");

    return (
        <AuthenticatedLayout>
            <Head title="Create Page" />
            <div className="container">
                <h2 className="page_title mb-0">Choose Your Link Name</h2>
                <div id="create_page" className="my_row form_page edit_form register">
                    <div className="card guest">

                        <CreatePageForm
                            pageNames={pageNames}
                        />

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default CreatePage;
