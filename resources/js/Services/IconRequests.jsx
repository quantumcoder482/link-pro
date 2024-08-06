import {useMemo} from "react";
import { generateJSON } from '@tiptap/html'
import axios from 'axios';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {Color} from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';

/**
 * Submit a request to get aff offer icons
 * return object
 */
export const getIcons = (url) => {

    return axios.get(url)
    .then(
        (response) => {
            const iconData = response.data.iconData;
            const authUser = response.data.authUser || null;

            return {
                success : true,
                iconData: iconData,
                authUser: authUser
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

export const getJsonValue = (description) => {
    return generateJSON(description, [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3, 4, 5],
            },
            bulletList:{
                keepAttributes: true,
            }
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Color,
        Underline,
        TextStyle,
    ])
}
