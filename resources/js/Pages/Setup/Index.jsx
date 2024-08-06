import Accordion from './Components/Accordion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';

function Index() {

    return (
        <AuthenticatedLayout>
            <Head title="Setup" />
            <div className="container">
                <div className="my_row setup_page">
                    <h2 className="page_title">Setup</h2>
                    <div className="card inline-block">
                        <div id="setup" className="inline-block">
                            <div className="my_row content_wrap">
                                <div className="accordion">
                                    <Accordion />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
