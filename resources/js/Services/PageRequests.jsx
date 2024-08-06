import axios from 'axios';
import EventBus from '../Utils/Bus';

export const addPage = (packets) => {

    return axios.post('/dashboard/page/new', packets).then(
        (response) => {
            const page_id = JSON.stringify(response.data.page_id);
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage });

            return {
                success : true,
                page_id : page_id,
            }
        },

    ).catch(error => {
        if (error.response) {
            if(error.response.data.errors.name) {
                EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
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

export const updatePageName = (packets, pageID) => {

    return axios.patch('/dashboard/page/update-name/' + pageID,
        packets).then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});

            return {
                success : true,
            }
        }
    ).catch((error) => {
        if (error.response) {
            if (error.response.data.errors) {
                EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
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

export const headerImage = (packets, pageID) => {

    return axios.patch('/dashboard/page/update-header-image/' + pageID, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage });
            const imgPath = response.data.imgPath;

            return {
                success : true,
                imgPath : imgPath
            }
        }
    ).catch(error => {
        if (error.response) {
            EventBus.dispatch("error", { message: error.response.data.errors.header_img[0] });
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}

export const profileImage = (packets, pageID, pageDefault) => {

    return axios.patch('/dashboard/page/update-profile-image/' + pageID, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            const imgPath = response.data.imgPath;

            EventBus.dispatch("success", { message: returnMessage });

            if(pageDefault){
                document.querySelector('#user_image').src = imgPath;
            }

            return {
                success: true,
                imgPath: imgPath
            }

        }
    ).catch(error => {
        if (error.response.data.errors.profile_img !== undefined) {
            EventBus.dispatch("error", { message: error.response.data.errors.profile_img[0] });
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false
        }
    });
}

export const pageTitle = (packets, pageID) => {

    return axios.patch('/dashboard/page/update-title/' + pageID,
        packets).then(
        response => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});
        }
    ).catch(error => {
        if (error.response) {
            EventBus.dispatch("error", { message: error.response.data.errors.title[0] });
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }

    });
}

export const pageBio = (packets, pageID) => {

    return axios.patch('/dashboard/page/update-bio/' + pageID,
        packets).then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});
        }
    ).catch(error => {
        //console.error("ERROR:: ", error.response.data.errors.bio[0]);

        if (error.response) {
            EventBus.dispatch("error", {message: error.response.data.errors.bio[0]});
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }
    });
}

export const updateProfileLayout = (packets, pageID) => {

    return axios.patch('/dashboard/page/update-profile-layout/' + pageID,
        packets).then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);

            return {
                message: returnMessage
            }
        }
    ).catch(error => {
        //console.error("ERROR:: ", error.response.data.errors.bio[0]);

        if (error.response) {
            EventBus.dispatch("error", {message: "Something went wrong"});
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }
    });

}

export const previewButtonRequest = (setShowPreviewButton, setShowPreview) => {

    if (window.innerWidth < 993) {
        setShowPreviewButton(true)
    } else {
        setShowPreviewButton(false)
        setShowPreview(false)
        document.querySelector('body').classList.remove('fixed');
    }
}
