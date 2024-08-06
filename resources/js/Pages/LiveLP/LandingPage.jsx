import React from 'react';
import SectionComponent from './SectionComponent';
import {Head} from '@inertiajs/react';

function LandingPage({page, sections}) {

    return (

        <div id="links_page" className="live_page landing_page">
            <Head title={page.title} />
            <div className="creator_wrap my_row">
                <div id="live_landing_page">
                    <header className="header">
                        <div className="top_section" style={{background: page.header_color}}>
                            <div className="logo">
                                <img src={page.logo ||
                                    Vapor.asset('images/logo.png')} alt=""/>
                            </div>
                            <div className="text_wrap">
                                <p style={{color: page.header_text_color}}>{page.slogan}</p>
                            </div>
                        </div>
                        <div className="header_image my_row sm:mb-5"
                             style={{
                                 background: 'url(' + page.hero +
                                     ') no-repeat',
                                 backgroundPosition: 'center',
                                 backgroundSize: 'cover',
                             }}
                        >
                        </div>
                    </header>
                    <div className="sections">
                        <div className="container">
                            {sections?.map(((section, index) => {

                                return (
                                    <SectionComponent section={section} key={index}/>
                                );
                            }))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LandingPage;
