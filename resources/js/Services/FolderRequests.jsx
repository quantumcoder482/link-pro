import axios from 'axios';
import EventBus from '../Utils/Bus';


/**
 * Submit a request to add a new link
 * return object
 */
export const addFolder = (packets) => {

    return axios.post('/folder/new', packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});
            const folder_id = response.data.id;
            const position = response.data.position;

            return {
                success : true,
                id: folder_id,
                position : position,
            }

        })
    .catch(error => {
        if (error.response) {
            //EventBus.dispatch("error", { message: error.response.data.errors.header_img[0] });
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }
    });
}

/**
 * Submit a request to delete folder
 * return object
 */
export const deleteFolder = (packets, folderID) => {

    return axios.put('/dashboard/folder/delete/' + folderID, packets)
    .then(
        (response) => {
            const links = response.data.links;
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});

            return {
                links : links,
                success : true,
            }

        })
    .catch(error => {
        if (error.response) {
            //EventBus.dispatch("error", { message: error.response.data.errors.header_img[0] });
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }
    });
}

export const updateFolderName = (folderID, packets) => {

    return axios.patch('/dashboard/folder/update-name/' + folderID, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});

            return {
                success : true,
            }

        })
    .catch(error => {
        if (error.response) {
            //EventBus.dispatch("error", { message: error.response.data.errors.header_img[0] });
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }
    });
}

export default addFolder;
