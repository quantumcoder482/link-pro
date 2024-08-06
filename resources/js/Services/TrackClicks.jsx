import React from 'react';
import axios from 'axios';

export const TrackFolderClick = (folderID) => {

    axios.post('/folder-click/' + folderID,).then(
        (response) => {
            console.log(JSON.stringify(response.data.message));
        },
    ).catch(error => {
        if (error.response) {
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }
    });
}

export const TrackIconClick = (linkID) => {

    axios.post('/link-click/' + linkID).then(
        (response) => {
            console.log("Success");
        },

    ).catch(error => {
        if (error.response) {
            console.error(error.response);
        } else {
            console.error("ERROR:: ", error);
        }
    });
}
