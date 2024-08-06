import axios from 'axios';
import EventBus from '../Utils/Bus';

/**
 * Submit a request to update landing page images
 * return object
 */
export const updateImage = (packets, id) => {

    return axios.patch('/creator-center/course/save-image/' + id, packets)
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
 * Submit a request to update landing page section image
 * return object
 */
export const updateSectionImage = (packets, id) => {

    return axios.patch('/creator-center/course/update-section-image/' + id, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            //EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            EventBus.dispatch("success", { message: returnMessage.replaceAll("_", " ") });

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
 * Submit a request to update landing page text
 * return object
 */
export const updateData = (packets, id, elementName) => {

    return axios.patch('/creator-center/course/save-data/' + id, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            const slug = response.data.slug

            if (!returnMessage.includes("color") && !returnMessage.includes("size")) {
                EventBus.dispatch("success", { message: returnMessage.replaceAll("_", " ") });
            }

            return {
                success : true,
                slug: slug
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            EventBus.dispatch("error",
                {message: "There was a problem saving the " + elementName});

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
 * Submit a request to add landing page section
 * return object
 */
export const addSection = (packets, id, elementName) => {

    return axios.post('/creator-center/course/add-section/' + id, packets)
    .then(
        (response) => {

            return {
                success : true,
                section: response.data.section
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            if (error.response.data.errors[elementName] !== undefined) {
                EventBus.dispatch("error",
                    {message: error.response.data.errors[elementName][0]});
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

/**
 * Submit a request to update landing page section data
 * return object
 */
export const updateSectionData = (packets, id, elementName) => {

    return axios.patch('/creator-center/course/update-section-data/' + id, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            //EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            if (!returnMessage.includes("color") && !returnMessage.includes("button") && !returnMessage.includes("size")) {
                EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            }

            return {
                success : true,
            }
        }
    )
    .catch((error) => {
        if (error.response !== undefined) {
            if (error.response.data.errors[elementName] !== undefined) {
                EventBus.dispatch("error",
                    {message: error.response.data.errors[elementName][0]});
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

export const getCourseCategories = () => {
    return axios.get('/get-course-categories')
    .then(
        (response) => {
            const categories = response.data.categories;
            //EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });

            return {
                success : true,
                categories: categories
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

export const updateSectionsPositions = (packets) => {
    return axios.patch('/creator-center/course/update-sections-positions', packets)
    .then(
        (response) => {
            const returnedResponse = response.data.message;
            //EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
            console.log(returnedResponse);
            return {
                success : true,
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
