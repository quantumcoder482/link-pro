import React, {useState} from 'react';
import {Head} from '@inertiajs/react';
import ContactForm from '@/Pages/Contact/ContactForm.jsx';
import {Loader} from '@/Utils/Loader.jsx';

const ContactLayout = ({honeypot, spamDetected}) => {

    const [showLoader, setShowLoader] = useState({
        show: false,
        position: 'absolute',
        progress: null,
    });

    return (
        <>
            <Head title="Contact Us"/>

            <div className="container" id="contact_page">
                <div className="my_row form_page">
                    <div className="card guest relative">
                        {showLoader.show &&
                            <Loader showLoader={showLoader} />}
                        <h2 className="page_title text-center !mb-2">Contact Us</h2>
                        <div id="contact_form" className="card-body text-center">
                            <ContactForm
                                honeypot={honeypot}
                                spamDetected={spamDetected}
                                setShowLoader={setShowLoader}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactLayout;
