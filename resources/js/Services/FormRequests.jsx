import React from 'react';
import axios from 'axios';
import EventBus from '@/Utils/Bus.jsx';

export const SubmitContactForm = (packets) => {

    return axios.post('/contact/send', packets)
    .then(
        (response) => {
            const success = response.data.success;

            return {
                success : success,
            }

        })
    .catch(error => {
        if (error.response) {;
            console.error("error.response: ", error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}
