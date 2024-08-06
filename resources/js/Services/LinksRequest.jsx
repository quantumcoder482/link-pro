import axios from 'axios';
import EventBus from '../Utils/Bus';
import {icons} from './IconObjects';

/**
 * Submit a request to add a new link
 * return object
 */
export const addLink = (packets) => {

    return axios.post('/dashboard/links/new', packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});
            const link_id = response.data.link_id;
            const position = response.data.position;
            let iconPath = null;
            if (response.data.iconPath) {
                iconPath = response.data.iconPath;
            }

            return {
                success : true,
                link_id : link_id,
                position : position,
                iconPath : iconPath
            }

        })
    .catch(error => {
        if (error.response) {
            if (error.response.data.errors.icon !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.icon[0] });
            } else if (error.response.data.errors.name !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
            } else if (error.response.data.errors.url !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.url[0] });
            } else if (error.response.data.errors.email !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.email[0] });
            } else if (error.response.data.errors.mailchimp_list_id !== undefined) {
                EventBus.dispatch("error", { message: "Mailchimp List Is Required" });
            } else if (error.response.data.errors.shopify_products !== undefined) {
                EventBus.dispatch("error", { message: "Shopify Products Are Required" });
            } else {
                console.error(error.response);
            }
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }
    });
}

/**
 * Submit a request to update a link's content
 * return object
 */
export const updateLink = (packets, editID) => {

    return axios.put('/dashboard/links/update/' + editID, packets).then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});
            let iconPath = null;

            if(response.data.path) {
                iconPath = response.data.path;
            }

            return {
                success : true,
                iconPath : iconPath
            }
        }
    ).catch(error => {
        if (error.response) {
            if (error.response.data.errors.icon !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.icon[0] });
            } else if (error.response.data.errors.name !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
            } else if (error.response.data.errors.url !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.url[0] });
            } else if (error.response.data.errors.email !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.email[0] });
            } else if (error.response.data.errors.phone !== undefined) {
                EventBus.dispatch("error", { message: error.response.data.errors.phone[0] });
            } else if (error.response.data.errors.mailchimp_list_id !== undefined) {
                EventBus.dispatch("error", { message: "Mailchimp List Is Required" });
            } else if (error.response.data.errors.shopify_products !== undefined) {
                EventBus.dispatch("error", { message: "Shopify Products Are Required" });
            } else {
                console.error(error.response);
            }

        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }

    });
}

/**
 * Submit a request to update a links position after drag and drop
 */
export const updateLinksPositions = (packets) => {

    return axios.patch("/dashboard/links/update-positions", packets).then(
        (response) => {
            console.log(JSON.stringify(response.data.message))
        }
    ).catch((error) => {
        console.error("ERROR:: ", error.response.data);
    });

}

/**
 * Submit a request to update a link
 * return object
 */
export const updateLinkStatus = (packets, itemID, url) => {

    return axios.patch(url + itemID, packets)
    .then(
        (response) => {
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", { message: returnMessage });

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

/**
 * Submit a request to delete a link
 * return object
 */

export const deleteLink = (packets, itemID) => {

    return axios.put('/dashboard/links/delete/' + itemID, packets).then(
        (response) => {
            const links = response.data.links;
            const returnMessage = JSON.stringify(response.data.message);
            EventBus.dispatch("success", {message: returnMessage});

            return {
                links : links,
                success : true,
            }
        }

    ).catch(error => {
        if (error.response) {
            console.error(error.response.data.message);
            EventBus.dispatch("error", { message: error.response.data.message });
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }
    });
}

export const checkURL = (url, name, custom, subStatus) => {

    if (custom) {

        return checkForHttp(url);

    } else {

        let icon = icons.find(icon => icon.name === name);

        if (icon && icon.required_in_url && !subStatus) {

            if (url.toLowerCase().includes(icon.required_in_url)) {

                const returnURL = checkForHttp(url);

                return {
                    success: true,
                    url: returnURL
                }

            } else {

                EventBus.dispatch("error",
                    {message: "URL does not match Icon selected"});

                return {
                    success: false,
                }
            }
        } else {
            const returnURL = checkForHttp(url);

            return {
                success: true,
                url: returnURL
            }
        }
    }
}

export const updateContentHeight = (iconsWrapRef, folder = null) => {

    const icons = document.querySelectorAll('.add_icons .icon_col');
    //const iconsWrap = document.querySelector('.icons_wrap');

        if (icons.length > 0) {
            setTimeout(() => {
                const columns = folder ? 3 : 4;
                const colHeight = icons[0].clientHeight;
                const rowCount = Math.ceil(icons.length / columns);
                const divHeight = rowCount * colHeight - (rowCount * 15);
                iconsWrapRef.current.style.minHeight = divHeight + "px";
            }, 600);
        } else {
            iconsWrapRef.current.style.minHeight = "200px";
        }
}

const checkForHttp = (url) => {

    let returnURL = null;

    if (url.includes('http')) {
        returnURL = url;
    } else {
        returnURL = 'https://' + url;
    }

    return returnURL;

}

export const getAllLinks = (pageID) => {

    return axios.get('/dashboard/page/get-links/' + pageID).then(
        (response) => {
            const userLinks = response.data.userLinks;

            return {
                success : true,
                userLinks: userLinks
            }
        }

    ).catch(error => {
        if (error.response) {
            console.error(error.response.data.message);
        } else {
            console.error("ERROR:: ", error);
        }

        return {
            success : false,
        }
    });
}

export const getColHeight = () => {

    const iconCol = document.querySelectorAll('.icons_wrap.add_icons .icon_col');
    let colHeight;

    if (iconCol.length > 0) {
        const offsetHeight = iconCol[0].clientHeight;
        colHeight = offsetHeight + 10;
    }

    return colHeight;
}

export const getColWidth = (type) => {
    const windowWidth = window.outerWidth;
    let colWidth;
    const iconsWrap = document.querySelector('.icons_wrap.add_icons');

    if (iconsWrap) {

        if (type === "main") {

            if (windowWidth < 500) {
                colWidth = (iconsWrap.clientWidth / 4) - 7;
            } else {
                colWidth = (iconsWrap.clientWidth / 4) - 10;
            }

        } else {
            if (windowWidth < 500) {
                colWidth = (iconsWrap.clientWidth / 3) - 10;
            } else {
                colWidth = (iconsWrap.clientWidth / 3) - 15;
            }
        }
    }

    return colWidth;
}

export const setStorage = (editID, integrationType, pageID) => {

    if (editID) {
        localStorage.setItem('editID', editID);
    } else {
        localStorage.setItem('showLinkForm', true);
    }

    localStorage.setItem('integrationType', integrationType);

    const date = new Date();
    date.setTime(date.getTime() + (24*60*60*1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = 'lp_page_id=' + pageID + expires + ";path=/";
}

export default addLink;
