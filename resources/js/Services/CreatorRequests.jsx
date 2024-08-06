import axios from 'axios';
import EventBus from '../Utils/Bus';

/**
 * Submit a request to update landing page section image
 * return object
 */
export const deleteSection = (packets, url) => {

    return axios.put(url, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage.replaceAll("_", " ") });

            return {
                success : true,
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            EventBus.dispatch("error",
                {message: "There was an error deleting the section."});
            console.error("ERROR:: ", error.response.data);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}
