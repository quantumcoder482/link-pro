import React, {useEffect} from 'react';
import TopBar from './TopBar';
import PreviewSection from './PreviewSection';
import Hero from './Hero';
import {
    UseLoadPreviewHeight,
    UseResizePreviewHeight
} from '@/Services/PreviewHooks.jsx';
import {isEmpty} from 'lodash';
import {IoIosCloseCircleOutline} from 'react-icons/io';

const Preview = ({
                     data,
                     sections,
                     setShowPreview,
                     url,
                     hoverSection,
                     nodesRef,
                     imgRef,
                     completedCrop,
                     setShowMessageAlertPopup
}) => {


    const loadPreviewHeight = UseLoadPreviewHeight();
    const resizePreviewHeight = UseResizePreviewHeight();

    useEffect(() => {

        if (hoverSection) {
            const target = document.getElementById('preview_' + hoverSection);
            if (target) {
                if (hoverSection.includes("header")) {
                    target.parentNode.scrollTop = target.offsetTop;
                } else if (hoverSection.includes("intro")) {
                    target.parentNode.parentNode.parentNode.scrollTop = target.offsetTop - 100;
                } else {
                    target.parentNode.parentNode.scrollTop = target.offsetTop + 200;
                }
            }
        }

    },[hoverSection])

    const ClosePreview = () => {
        document.querySelector('body').classList.remove('stop_scroll');
        setShowPreview(false);
    }

    return (

        <>
            <div className="close_preview" onClick={ClosePreview}>
                <IoIosCloseCircleOutline />
            </div>

            <div className="links_wrap preview creator">
                <div className="inner_content" id="preview_wrap">
                    <div className="inner_content_wrap" style={{ maxHeight: resizePreviewHeight ? resizePreviewHeight + "px" : loadPreviewHeight + "px"}}>
                        <section className="header" id="preview_header_section">
                            <TopBar
                                data={data}
                                nodesRef={nodesRef}
                                completedCrop={completedCrop}
                                imgRef={imgRef}
                            />
                        </section>
                        <section>
                            <Hero
                                data={data}
                            />
                        </section>
                        <div className="sections my_row">
                            {!isEmpty(sections) && sections.map((section, index) => {

                                return (
                                    <PreviewSection
                                        key={section.id}
                                        currentSection={section}
                                        index={index}
                                        url={url}
                                        nodesRef={nodesRef}
                                        completedCrop={completedCrop}
                                        position={index + 1}
                                        hoverSection={hoverSection}
                                        setShowMessageAlertPopup={setShowMessageAlertPopup}
                                    />
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Preview;
