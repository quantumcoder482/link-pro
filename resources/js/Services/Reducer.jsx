//import myLinksArray from '../Pages/Dashboard/Components/Link/LinkItems';

export const LINKS_ACTIONS = {
    SET_LINKS: 'set-links',
    SET_FOLDER_LINKS_ORDER: 'set-folder-links-order',
    UPDATE_LINKS_STATUS: 'update-links-status',
    UPDATE_LINKS_STATUS_FROM_FOLDER: 'update-links-status-from-folder',
    ADD_NEW_IN_FOLDER: 'add-new-in-folder',
    UPDATE_FOLDER_NAME: 'update-folder-name',
    UPDATE_LINK: 'update-link',
    UPDATE_LINK_IN_FOLDER: 'update-link-in-folder',
    UPDATE_LINKS_POSITIONS: 'update-links-positions',
}

export function reducer(userLinks, action) {

    switch (action.type) {

        case LINKS_ACTIONS.SET_LINKS:

            return action.payload.links

        case LINKS_ACTIONS.SET_FOLDER_LINKS_ORDER:

            return userLinks.map((item) => {
                if (item.id === action.payload.id && item.type === "folder") {

                    return {
                        ...item,
                        links: action.payload.links
                    }
                }

                return item
            });

        case LINKS_ACTIONS.UPDATE_LINKS_STATUS:

            return userLinks.map(item => {

                if (item.id === action.payload.id) {

                    return {
                        ...item,
                        active_status: !item.active_status,
                    }

                }
                return item;
            })

        case LINKS_ACTIONS.UPDATE_LINKS_STATUS_FROM_FOLDER:

            return userLinks.map((item) => {

                if (item.id === action.payload.folderID && item.type === "folder") {

                    const newItemLinks = item.links.map((linkItem) => {

                        if (linkItem.id === action.payload.id) {

                            return {
                                ...linkItem,
                                active_status: !linkItem.active_status,
                            }
                        }

                        return linkItem;
                    })

                    return {
                        ...item,
                        links: newItemLinks
                    }
                }
                return item;
            })
        case LINKS_ACTIONS.ADD_NEW_IN_FOLDER:

            return userLinks.map((item) => {

                if (item.id === action.payload.folderID) {

                    const itemLinks = item.links.concat(action.payload.newLinkObject)

                    return {
                        ...item,
                        active_status: action.payload.folderActive || item.active_status,
                        links: itemLinks
                    }
                }

                return item;

            })

        case LINKS_ACTIONS.UPDATE_FOLDER_NAME:

            return userLinks.map((item) => {
                if (item.id === action.payload.folderID) {
                    item.name = action.payload.name;

                    return item
                }

                return item
            })

        case LINKS_ACTIONS.UPDATE_LINK:

            return userLinks.map((item) => {
                if (item.id === action.payload.editID ) {
                    return {
                        ...item,
                        name: action.payload.currentLink.name,
                        url: action.payload.url,
                        email: action.payload.currentLink.email,
                        phone: action.payload.currentLink.phone,
                        type: action.payload.type,
                        mailchimp_list_id: action.payload.currentLink.mailchimp_list_id,
                        shopify_products: action.payload.currentLink.shopify_products,
                        shopify_id: action.payload.currentLink.shopify_id,
                        description: action.payload.currentLink.description,
                        icon: action.payload.iconPath
                    }
                }

                return item;
            })

        case LINKS_ACTIONS.UPDATE_LINK_IN_FOLDER:

            return userLinks.map((item) => {
                if (item.id === action.payload.folderID) {

                    const newItemsLinks = item.links.map((linkItem) => {

                        if (linkItem.id === action.payload.editID) {

                            return  {
                                ...linkItem,
                                name: action.payload.currentLink.name,
                                url: action.payload.url,
                                email: action.payload.currentLink.email,
                                phone: action.payload.currentLink.phone,
                                type: action.payload.type,
                                mailchimp_list_id: action.payload.currentLink.mailchimp_list_id,
                                shopify_products: action.payload.currentLink.shopify_products,
                                shopify_id: action.payload.currentLink.shopify_id,
                                description: action.payload.currentLink.description,
                                icon: action.payload.iconPath
                            }
                        }

                        return linkItem
                    })

                    return {
                        ...item,
                        links: newItemsLinks
                    }
                }

                return item;
            })

        case LINKS_ACTIONS.UPDATE_LINKS_POSITIONS:

            return action.payload.links.map((item) => {
                if (item.id === action.payload.folderID) {
                    //const itemLinks = item.links.concat(newLinkObject)
                    const newOrder = item.links.map((link, index) => {
                        return {
                            ...link,
                            position: index
                        }
                    })

                    return {
                        ...item,
                        active_status: action.payload.folderActive === false ? action.payload.folderActive : item.active_status,
                        links: newOrder
                    }
                }

                return item;
            })

        default:
            return userLinks;
    }
}
export const FOLDER_LINKS_ACTIONS = {
    SET_FOLDER_LINKS: 'set-folder-links',
    UPDATE_FOLDER_LINKS_STATUS: 'update-folder-links-status',
    UPDATE_FOLDER_LINKS: 'update-folder-links',
}

export function folderLinksReducer(folderLinks, action) {

    switch (action.type) {

        case FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS:

            return action.payload.links

        case FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS_STATUS:

            return folderLinks.map(item => {

                if (item.id === action.payload.id) {

                    return {
                        ...item,
                        active_status: !item.active_status,
                    }

                }
                return item;
            })

        case FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS:

            return folderLinks.map((item) => {
                if (item.id === action.payload.editID) {
                    return {
                        ...item,
                        name: action.payload.currentLink.name,
                        url: action.payload.url,
                        email: action.payload.currentLink.email,
                        phone: action.payload.currentLink.phone,
                        mailchimp_list_id: action.payload.currentLink.mailchimp_list_id,
                        shopify_products: action.payload.currentLink.shopify_products,
                        shopify_id: action.payload.currentLink.shopify_id,
                        type: action.payload.type,
                        description: action.payload.currentLink.description,
                        icon: action.payload.iconPath
                    }
                }

                return item;
            })

        default:

            return folderLinks;
    }
}
