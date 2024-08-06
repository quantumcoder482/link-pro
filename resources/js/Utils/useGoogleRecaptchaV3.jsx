import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

export const useGoogleRecaptchaV3 = () => {

    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const siteKey = '6LdSIQIqAAAAAGFozc4ox2BuzOaVUrW6EqjDkvHT';

    useEffect(() => {
        if(window.grecaptcha) {
            setIsRecaptchaReady(true);
        } else {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => {
                setIsRecaptchaReady(true);
            }
        }

    }, [siteKey]);

    return useCallback( async (action) => {
        if (isRecaptchaReady && window.grecaptcha) {
            return await window.grecaptcha.execute(siteKey, {action});
        }
    },[siteKey, isRecaptchaReady])
};

export const checkRecaptcha = async (token, action) => {

    const packets = {
        token: token,
        action: action
    }
    return axios.post('/check-recaptcha', packets).then(
        (response) => {
            const valid = response.data.valid;

            return {
                valid : valid,
            }
        }

    ).catch(error => {
        if (error.response) {
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            valid : false,
        }
    });
}

