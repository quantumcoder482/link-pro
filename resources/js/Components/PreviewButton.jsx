import {useEffect} from 'react';
import {previewButtonRequest} from '@/Services/PageRequests.jsx';

const PreviewButton = ({setShowPreview}) => {

    const ShowPreview = (e) => {
        e.preventDefault();
        setShowPreview(true);
        document.querySelector('body').classList.add('stop_scroll');
    }

    return (

        <div className="preview_button_wrap my_row">
            <a href="#" className="button blue" onClick={(e) => ShowPreview(e)}>
                Show Live Preview
            </a>
        </div>
    )
}

export default PreviewButton;
