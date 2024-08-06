import axios from 'axios';
import EventBus from '../Utils/Bus';

/**
 * Submit a request to update offer icon
 * return object
 */
export const updateIcon = (packets, id) => {

    return axios.patch('/creator-center/offer/update-icon/' + id, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });

            return {
                success : true,
                imagePath: response.data.imagePath
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            EventBus.dispatch("error",
                {message: "There was an error saving your image."});
            console.error("ERROR:: ", error.response.data);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}

/**
 * Submit a request to update offer icon
 * return object
 */
export const updateOfferData = (packets, id) => {

    return axios.patch('/creator-center/offer/update-data/' + id, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });

            return {
                success : true,
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            EventBus.dispatch("error",
                {message: "There was an error saving offer data."});
            console.error("ERROR:: ", error.response.data);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}

/**
 * Submit a request to update offer published status
 * return object
 */
export const publishOffer = (packets, id) => {

    return axios.patch('/creator-center/offer/publish/' + id, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            const status = JSON.stringify(response.data.success);

            EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });

            return {
                success : status,
            }

        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            if (error.response.data.code == 400) {
                EventBus.dispatch("error",
                    {message: error.response.data.message});
            } else {
                EventBus.dispatch("error",
                    {message: "There was an error saving offer data."});
            }

            console.error("ERROR:: ", error.response.data);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}
