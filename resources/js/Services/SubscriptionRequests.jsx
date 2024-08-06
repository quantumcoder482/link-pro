import React from 'react';
import axios from 'axios';
import EventBus from '@/Utils/Bus.jsx';

export const cancelSubscription = (packets) => {

    return axios.put('/subscribe/cancel', packets).then(
        (response) => {

            const returnMessage = JSON.stringify(response.data.message);
            const success = response.data.success;
            const endsAt = response.data.ends_at || null;

            if (success) {
                EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            } else {
                EventBus.dispatch("error", { message: "There was an issue changing your plan." });
                console.log("ERROR:: ", returnMessage);
            }

            return {
                success : success,
                ends_at : endsAt
            }

        },

    ).catch(error => {
        if (error.response) {
            EventBus.dispatch("error", { message: "There was an issue changing your plan." });
            console.log("catch ERROR:: ", error.response);

        } else {
            EventBus.dispatch("error", { message: "There was an issue changing your plan." });
            console.error("catch ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}
export const changePlan = (packets) => {

    return axios.post('/subscribe/change-plan', packets).then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            const success = response.data.success;
            const url = response.data.url;

            return {
                success : success,
                message : returnMessage,
                url : url
            }

        },

    ).catch(error => {
        if (error.response) {
            if(error.response.data.errors) {
                EventBus.dispatch("error", { message: error.response.data.errors });
            } else {
                console.error(error.response);
            }

        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
            message : error.response
        }
    });
}
export const resumeSubscription = (packets) => {

    return axios.post('/subscribe/resume', packets).then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            const success = response.data.success;

            if (success) {
                EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            } else {
                EventBus.dispatch("error", { message: returnMessage });
            }

            return {
                success : success,
                sub_id : response.data.sub_id
            }

        },

    ).catch(error => {
        if (error.response) {
            if(error.response.data.errors) {
                EventBus.dispatch("error", { message: error.response.data.errors });
            } else {
                console.error(error.response);
            }

        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}

export const updatePaymentMethod = (packets) => {

    return axios.post('/update-payment-method', packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            const success = response.data.success;

            if(success) {
                EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            } else {
                EventBus.dispatch("error", {message: returnMessage.replace("_", " ")});
            }

            return {
                success : success,
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            EventBus.dispatch("error",
                {message: "There was an error updating your credit card."});
            console.error("ERROR:: ", error.response.data);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}

export const getStripeBillingDate = (packets) => {

    return axios.post('/subscribe/get-stripe-billing-date', packets)
    .then(
        (response) => {

            const success   = response.data.success;
            const startDate = response.data.startDate;

            return {
                success : success,
                startDate: startDate
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            console.error("ERROR:: ", error.response.data);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}
