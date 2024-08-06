import React, {useState} from 'react';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Twitter from './Twitter';
import TikTok from './TikTok';

const SocialMediaForms = ({pageId, step, setStep}) => {

    return (

        <>
            {(() => {

                switch (step) {
                    case 'facebook':
                        return <Facebook
                            setStep={setStep}
                            pageId={pageId}

                        />
                    case 'instagram':
                        return <Instagram
                            setStep={setStep}
                            pageId={pageId}
                        />
                    case 'twitter':
                        return <Twitter
                            setStep={setStep}
                            pageId={pageId}
                        />
                    case 'tiktok':
                        return <TikTok
                            pageId={pageId}
                        />
                    default:
                        return null
                }

            })()}

        </>
    )
};

export default SocialMediaForms;
