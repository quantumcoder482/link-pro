import React, {useEffect, useState} from 'react';
import isJSON from 'validator/es/lib/isJSON.js';
import {convertText} from '@/Services/CreatorServices.jsx';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';

const SectionText = ({text}) => {

    const [textValue, setTextValue] = useState(null);

    useEffect(() => {
        if (text && isJSON(text)) {
            const content = convertText(text);
            if (content.type === "blocks") {
                setTextValue(draftToHtml(content.text));
            } else {
                setTextValue(content.text);
            }
        } else if (text) {
            setTextValue(text)
        }



    },[text])

    const createMarkup = (convertText) => {
        return {
            __html: DOMPurify.sanitize(convertText)
        }
    }
    return (
        <>
            {text &&
                <div dangerouslySetInnerHTML={createMarkup(textValue)}>
                </div>
            }
        </>
    );
};

export default SectionText;
