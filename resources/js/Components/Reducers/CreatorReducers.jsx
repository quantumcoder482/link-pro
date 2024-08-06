export const LP_ACTIONS = {
    UPDATE_PAGE_DATA: 'update-page-data',
}

export function pageDataReducer(data, action) {
    switch(action.type) {
        case LP_ACTIONS.UPDATE_PAGE_DATA:
            return {
                ...data,
                [`${action.payload.name}`]: action.payload.value
            }
    }
}

export const OFFER_ACTIONS = {
    UPDATE_OFFER_DATA: 'update-offer-data',
}

export function offerDataReducer(data, action) {
    switch(action.type) {
        case OFFER_ACTIONS.UPDATE_OFFER_DATA:
            return {
                ...data,
                [`${action.payload.name}`]: action.payload.value
            }
    }
}
