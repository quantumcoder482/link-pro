import axios from 'axios';

export const getPageStats = (packets) => {

    return axios.post('/stats/page', packets).then(
        (response) => {
            const returnData = response.data;
            //EventBus.dispatch("success", { message: returnMessage });
            return {
                success : true,
                data: returnData["data"]
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

export const getLinkStats = (packets) => {

    return axios.post('/stats/link', packets).then(
        (response) => {
            const returnData = response.data.data;
            //EventBus.dispatch("success", { message: returnMessage });

            return {
                success : true,
                linkStats: returnData["currentData"],
                deletedStats: returnData["pastData"]
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

export const getFolderStats = (packets) => {

    return axios.post('/stats/folder', packets).then(
        (response) => {
            const returnData = response.data.data;
            //EventBus.dispatch("success", { message: returnMessage });

            return {
                success : true,
                currentData: returnData["currentData"],
                /*pastData: returnData["pastData"]*/
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

export const getAffiliateStats = (url, packets) => {

    return axios.post(url, packets).then(
        (response) => {
            const returnData = response.data.data;
            return {
                success : true,
                affiliateData: returnData["affiliateData"],
                totals: returnData["totals"]
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

//export default getPageStats;

