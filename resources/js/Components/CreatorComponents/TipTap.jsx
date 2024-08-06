import React from 'react';
import MenuBar from '@/Components/CreatorComponents/MenuBar.jsx';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {Color} from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';

const TipTap = ({editorState, handleEditorChange, handleSubmit}) => {

    const extensions = [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3, 4, 5],
            },
            bulletList:{
                keepAttributes: true,
            },
            hardBreak:{
                HTMLAttributes: {
                    class: 'hard-break',
                },
            }
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Color,
        Underline,
        TextStyle,
    ]

    const editor = useEditor({
        extensions: extensions,
        content: editorState,
        onUpdate({ editor }) {
            handleEditorChange(editor.getHTML())
        },
        onBlur({ editor }) {
            handleSubmit(editor.getJSON());
        }

    },[]);

    return (
        <div className="tiptap w-full">
            <MenuBar editor={editor}/>
            <EditorContent className="editor__content" editor={editor}/>
        </div>
    );
};

export default TipTap;
