import axios from 'axios';
import EventBus from '@/Utils/Bus.jsx';

export const saveSubscription = (packets) => {

    return axios.post('/subscribe/paypal-success', packets).then(
        (response) => {

            return {
                success : response.data.success,
                message : JSON.stringify(response.data.message),
            }
        },

    ).catch(error => {
        if (error.response) {
            if (error.response.data.errors) {
                EventBus.dispatch("error",
                    {message: error.response.data.errors});
            } else {
                console.error(error.response);
            }

        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success: false
        }
    });
}

export const updatePlan = (packets) => {
    return axios.post('/subscribe/change-plan', packets).then(
        (response) => {

            return {
                success : response.data.success,
                message : JSON.stringify(response.data.message),
                url     : response.data.url
            }
        },

    ).catch(error => {
        if (error.response) {
            if (error.response.data.errors) {
                EventBus.dispatch("error",
                    {message: error.response.data.errors});
            } else {
                console.error(error.response);
            }

        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success: false
        }
    });
}

export const updatePaymentMethod = (packets) => {
    return axios.post('/subscribe/paypal-payment-method', packets).then(
        (response) => {

            return {
                success : response.data.success,
                message : JSON.stringify(response.data.message),
            }
        },

    ).catch(error => {
        if (error.response) {
            if (error.response.data.errors) {
                EventBus.dispatch("error",
                    {message: error.response.data.errors});
            } else {
                console.error(error.response);
            }

        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success: false
        }
    });
}

export const getClientId = () => {

    return axios.post('/subscribe/get-paypal-client').then(
        (response) => {
            return {
                success: response.data.success,
                client : response.data.payPalClient,
            }
        },

    ).catch(error => {

        console.error(error);

        return {
            success: false
        }
    });
}

export const getPlanId = (planName, env) => {

    if (env === "production") {
        return planName === "pro" ? "P-6MH1893903516972EMX5QADY" : "P-5CL62356R3238071JMX5QANA"
    } else {
        return planName === "pro" ? "P-5XM03253A6686724NMYGYLEQ" : "P-17R924989P608662RMYGYLWQ"
    }
}
