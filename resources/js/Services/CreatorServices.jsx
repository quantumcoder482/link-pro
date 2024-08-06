import {arrayMove} from '@dnd-kit/sortable';
import isJSON from 'validator/es/lib/isJSON.js';
import {generateHTML} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {Color} from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';

export const handleDragEndAction = ( event,
                                     setSections,
                                     updateSectionsPositions,
                                     setShowTiny
) => {

    const {active, over} = event;
    let newArray = [];

    if (active.id !== over.id) {

        setSections((sections) => {
            const oldIndex = sections.map(function(e) {
                return e.id;
            }).indexOf(active.id);

            const newIndex = sections.map(function(e) {
                return e.id;
            }).indexOf(over.id);

            newArray = arrayMove(sections, oldIndex, newIndex);
            return newArray;
        });

        const packets = {
            sections: newArray
        }

        updateSectionsPositions(packets).then(() => {
            setShowTiny(false);
            setShowTiny(true);
        });

    }

    return newArray;
}

export const convertText = (text) => {
    let parsedText = "";
    //have to check if text is in old editor format using blocks as a key
    if (text && text !== "" && isJSON(text)) {
        parsedText = JSON.parse(text);
        if(parsedText.hasOwnProperty('blocks')) {
            parsedText['blocks'] = parsedText['blocks'].map(
                (block) => {
                    if (!block.text) {
                        block.text = '';
                    }

                    return block;
                });

            parsedText = {
                type: "blocks",
                text: parsedText
            };
        } else {
            const convertedText = generateHTML(parsedText, [
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

            parsedText = {
                type: "html",
                text: convertedText
            }
        }
    }

    return parsedText;
}
