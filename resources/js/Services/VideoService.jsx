import React from 'react';


export const getVideoScreenshot = (videoUrl) => {

    let split;
    if (videoUrl.includes('youtube')) {
        let embedCode = "";
        split = videoUrl.split("/embed/")[1];

        if (split.includes("?")) {
            embedCode = split.split("?")[0];
        } else {
            embedCode = split;
        }

        return "https://img.youtube.com/vi/" + embedCode + "/mqdefault.jpg";
    } else {
        split = videoUrl.split("/video/")[1];
        return "https://vumbnail.com/" + split + ".jpg";
    }
}
