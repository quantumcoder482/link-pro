import axios from 'axios';
import EventBus from '../Utils/Bus';
import {isEmpty} from 'lodash';

export const checkSubStatus = (userSub) => {

    if (userSub) {

        const {status, ends_at, sub_id} = {...userSub};
        if (sub_id === "bypass") {
            return true;
        } else {

            if ( (status === 'active' || status === 'pending')) {
                return true;
            }

            if (ends_at) {
                const currentDate = new Date().valueOf();
                let t = ends_at.split(/[- :]/);
                let d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                const endsAt = new Date(d);

                if (endsAt > currentDate) {
                    return true;
                }
            }
        }
    }

    return false;
}

export const checkIcon = (icon, viewType, subStatus) => {
    let asset;

    if(viewType === "preview") {
        asset = Vapor.asset('images/icon-placeholder-preview.png')
    } else {
        asset = Vapor.asset('images/icon-placeholder.png');
    }

    if (icon && icon.toString().includes('custom')) {
        return subStatus ? icon : asset;
    } else {
        return icon;
    }
}

export const getMailchimpLists = () => {

    return axios.get('/mailchimp/list').then(
        (response) => {
            const lists = response.data.lists;
            return {
                success : true,
                lists : lists,
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

export const removeMailchimpConnection = () => {

    return axios.put('/mailchimp/remove-connection').then(
        (response) => {

            return {
                success : true,
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

export const getAllProducts = (storeId) => {

    return axios.get('/shopify/get-products/' + storeId).then(
        (response) => {
            const products = response.data.products

            return {
                success : true,
                products : !isEmpty(products) ? products : null,
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

export const getStores = () => {

    return axios.get('/shopify/get-stores').then(
        (response) => {
            const stores = response.data.stores

            return {
                success : true,
                stores : !isEmpty(stores) ? stores : null,
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

export const acceptTerms = () => {

    return axios.post('/store-affiliate').then(
        (response) => {
            console.log(JSON.stringify(response.data.success));

            return {
                success : true,
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

export const updateUserInfo = (packets, userId) => {

    return axios.put('/update-account/' + userId, packets).then(
        (response) => {
            const messageData = response.data.message;
            let message = "";
            if (messageData.email && messageData.password) {
                message = "Your email and password have been updated";
            } else if (messageData.email ) {
                message = "Your email has been updated";
            } else {
                message = "Your password has been updated";
            }

            EventBus.dispatch("success", { message: message });

            return {
                success : true,
            }
        },

    ).catch(error => {
        if (error.response) {
            EventBus.dispatch("error", { message: "there was a problem updating your info" });
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}
export const getUserPages = () => {

    return axios.get('/get-user-pages').then(
        (response) => {
            const pages = response.data.pages;

            return {
                success : true,
                pages : pages,
            }
        },

    ).catch(error => {
        if (error.response) {
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}

export const registerUser = (packets) => {

    return axios.post('/course-register', packets).then(
        (response) => {

            if(!response.data.success && response.data.spamDetected) {
                return {
                    success : response.data.success,
                    spamDetected: response.data.spamDetected
                }
            } else {
                const url = response.data.url;
                const errors = response.data.errors;
                return {
                    success : response.data.success,
                    url: url
                }
            }
        },

    ).catch(error => {
        if (error.response) {
            console.error("ERROR-RESPONSE-data:: ", error.response.data);
            console.error("ERROR:: ", error);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}

export const purchaseCourse = (packets) => {

    return axios.post('/checkout/purchase', packets).then(
        (response) => {

            const success = response.data.success;
            const url = response.data.url;
            const message = response.data.message;

            return {
                success: success,
                message: message,
                url : url
            }
        },

    ).catch(error => {
        if (error.response) {
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}

export const redirectToOnboarding = () => {

    return axios.post('/payment-onboarding').then(
        (response) => {
            return {
                success : true,
                url: response.data.url
            }
        },

    ).catch(error => {
        if (error.response) {
            console.error("ERROR:: ", error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}
