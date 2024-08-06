import React from 'react';
import {isEmpty} from 'lodash';
import PreviewSection from './PreviewSection';
import {UseLoadPreviewHeight, UseResizePreviewHeight} from '@/Services/PreviewHooks.jsx';

const Preview = ({landingPage}) => {

    const loadPreviewHeight = UseLoadPreviewHeight(20);
    const resizePreviewHeight = UseResizePreviewHeight(20);

    const {header_color, header_text_color, hero, logo, sections, slogan} = landingPage;

    return (
        <div className="links_wrap preview creator">
            <div className="inner_content" id="preview_wrap">
                <div className="inner_content_wrap" style={{ maxHeight: resizePreviewHeight ? resizePreviewHeight + "px" : loadPreviewHeight + "px"}}>
                    <section className="header my_row" id="preview_header_section">
                        <div className="top_section" style={{
                            background: header_color || '#ffffff'
                        }}>
                            <div className="logo">
                                <img src={logo || Vapor.asset("images/logo.png") } alt=""/>
                            </div>
                            <div className="text_wrap">
                                <p style={{color: header_text_color || '#ffffff'}}>{slogan}</p>
                            </div>
                        </div>
                        {hero &&
                            <div className="header_image my_row"
                                 style={{
                                     background: "url(" + hero + ") center 25% / cover no-repeat",
                                     minHeight: '75px',
                                 }}>
                            </div>
                        }
                    </section>
                    {!isEmpty(sections) &&
                        <div className="sections">
                            {sections.map((section, index) => {

                                return (
                                    <PreviewSection
                                        key={section["id"]}
                                        section={section}
                                    />
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Preview;
