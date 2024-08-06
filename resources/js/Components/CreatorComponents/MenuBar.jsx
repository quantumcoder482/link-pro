import React from 'react';
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaStrikethrough,
    FaListUl,
    FaListOl,
    FaQuoteLeft,
    FaUndo,
    FaRedo,
    FaParagraph,
    FaAlignLeft,
    FaAlignRight,
    FaAlignCenter,
    FaAlignJustify
} from 'react-icons/fa';
const MenuBar = ({editor}) => {
    if (!editor) {
        return null;
    }
    return (
        <div className="menu_bar">

            <div className="input_wrap">
                <input
                    type="color"
                    onInput={event => editor.chain().
                        focus().
                        setColor(event.target.value).
                        run()}
                    value={editor.getAttributes('textStyle').color}
                    data-testid="setColor"
                />
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
                className={editor.isActive('bold') ? 'is_active' : ''}
            >
                <FaBold/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                className={editor.isActive('italic') ? 'is_active' : ''}
            >
                <FaItalic/>
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
                className={editor.isActive('underline') ? 'is_active' : ''}
            >
                <FaUnderline/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleStrike().run();
                }}
                className={editor.isActive('strike') ? 'is_active' : ''}
            >
                <FaStrikethrough/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setParagraph().run();
                }}
                className={
                    editor.isActive('paragraph') ?
                        'is_active' :
                        ''
                }
            >
                <FaParagraph/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({level: 1}).run();
                }}
                className={
                    editor.isActive('heading', {level: 1}) ?
                        'is_active' :
                        ''
                }
            >
                H1
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({level: 2}).run();
                }}
                className={
                    editor.isActive('heading', {level: 2}) ?
                        'is_active' :
                        ''
                }
            >
                H2
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({level: 3}).run();
                }}
                className={
                    editor.isActive('heading', {level: 3}) ?
                        'is_active' :
                        ''
                }
            >
                H3
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({level: 4}).run();
                }}
                className={
                    editor.isActive('heading', {level: 4}) ?
                        'is_active' :
                        ''
                }
            >
                H4
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({level: 5}).run();
                }}
                className={
                    editor.isActive('heading', {level: 5}) ?
                        'is_active' :
                        ''
                }
            >
                H5
            </button>


            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBlockquote().run();
                }}
                className={editor.isActive('blockquote') ? 'is_active' : ''}
            >
                <FaQuoteLeft/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setTextAlign('justify').run();
            }} className={editor.isActive({textAlign: 'justify'}) ?
                'is-active' :
                ''}>
                <FaAlignJustify/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setTextAlign('left').run()
            }} className={editor.isActive({textAlign: 'left'}) ?
                'is-active' :
                ''}>
                <FaAlignLeft/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setTextAlign('center').run()
            }} className={editor.isActive({textAlign: 'center'}) ?
                'is-active' :
                ''}>
                <FaAlignCenter/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setTextAlign('right').run()
            }} className={editor.isActive({textAlign: 'right'}) ?
                'is-active' :
                ''}>
                <FaAlignRight/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBulletList().run();
                }}
                className={editor.isActive("bulletList") ? "is_active" : ""}
            >
                <FaListUl/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleOrderedList().run()
                }}
                className={editor.isActive("orderedList") ?
                    "is_active" :
                    ""}
            >
                <FaListOl/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().undo().run();
            }}>
                <FaUndo/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().redo().run();
            }}>
                <FaRedo/>
            </button>
        </div>
    );
};

export default MenuBar;
