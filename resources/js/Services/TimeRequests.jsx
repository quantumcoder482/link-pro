import React from 'react';

export const GetCurrentTime = () => {
    const today = new Date();
    return today.setHours(0,0,0);
};

export const GetHumanReadableTime = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.setHours(23, 59, 59);
}

export const getFutureTime = (date, addMonth) => {
    const jsStartDate = new Date(date);
    const day = jsStartDate.getDay();
    const dateNow = new Date();
    const month = dateNow.getMonth();
    const newMonth = dateNow.setMonth(month + addMonth);

    const dateFormat = new Intl.DateTimeFormat("en-US",{year: 'numeric', month: '2-digit',day: '2-digit'})
    .format(dateNow.setMonth(month + addMonth));
    const split = dateFormat.split('/');
    return split[2] + "-" + split[0] + "-" + split[1] + "T00:00:00Z";
}

export const getInternetDateTimeFormat = (date) => {
    const newDate = new Date(date);
    const dateFormat = new Intl.DateTimeFormat("en-US",{year: 'numeric', month: '2-digit',day: '2-digit'})
    .format(newDate);
    const split = dateFormat.split('/');
    return split[2] + "-" + split[0] + "-" + split[1] + "T00:00:00Z";
}
