import React, {useEffect, useState} from 'react';
import DeleteSection from '@/Components/CreatorComponents/DeleteSection.jsx';
import {MdDragHandle, MdKeyboardArrowDown} from 'react-icons/md';
import InputComponent from '@/Components/CreatorComponents/InputComponent.jsx';
import ColorPicker from '@/Components/CreatorComponents/ColorPicker';
import ImageComponent from '@/Components/CreatorComponents/ImageComponent.jsx';
import SectionButtonOptions from '@/Components/CreatorComponents/SectionButtonOptions';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import DOMPurify from 'dompurify';
import {convertText} from '@/Services/CreatorServices.jsx';
import isJSON from 'validator/es/lib/isJSON.js';

const Section = ({
                     section,
                     index,
                     completedCrop,
                     setCompletedCrop,
                     nodesRef,
                     sections,
                     setSections,
                     openIndex,
                     setOpenIndex,
                     setShowLoader,
                     handleMouseEnter,
                     showTiny,
                     setShowTiny,
                     courses,
                     imageCount,
                     textCount
}) => {

    const {
        id,
        type,
        text,
        button_course_id,
    } = section;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: section.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [sectionTitle, setSectionTitle] = useState("");

    const handleSectionOpen = (rowIndex) => {

        if(openIndex) {
            if (openIndex.includes(rowIndex)) {
                const newArrayIndex = openIndex.filter(
                    element => element !== rowIndex)
                setOpenIndex(newArrayIndex)
            } else {
                const newArrayIndex = openIndex.concat(rowIndex);
                setOpenIndex(newArrayIndex);
            }
        }
    }

    const handleMouseDown = () => {
        setOpenIndex([])
    }

    useEffect(() => {

        switch(type) {

            case 'text':
                const regex = /(<([^>]+)>)/gi;
                let parsedText = "";
                if (section.text && isJSON(section.text)) {
                    const convertedText = convertText(section.text);

                    if (convertedText.type === "blocks") {
                        parsedText = convertedText.text.blocks[0]['text'].length > 20 ?
                            convertedText.text.blocks[0]['text'].slice(0, 20) + '...' :
                            convertedText.text.blocks[0]['text'];
                    } else {
                        parsedText = convertedText.text;
                    }
                    const result = parsedText.replace(regex, "");

                    parsedText = result.length > 20 ?
                        result.slice(0, 20) + '...' :
                        result;

                } else if (section.text) {
                    const result = section.text.replace(regex, "");

                    parsedText = result.length > 20 ?
                        result.slice(0,20) + "..." :
                        result;

                } else {
                    parsedText = type + ' ' + textCount;
                }

                return setSectionTitle(parsedText);

            case 'image' :
                const content = section.image ?
                    <img className="input_image" src={section.image} alt=""/>
                    :
                    type  + " " + imageCount

                return setSectionTitle(content)

        }
    }, [sections]);

    const createMarkup = (convertText) => {
        return {
            __html: DOMPurify.sanitize(convertText)
        }
    }

    return (
        <div ref={setNodeRef}
             className={`section_row ${id}`}
             id={`section_${index + 1}`}
             style={style}
             onMouseEnter={(e) => handleMouseEnter(e)}
        >
            <div className="section_title"
                 onClick={(e) => handleSectionOpen(index)}
            >
                <div className="drag_handle creator_section"
                     onMouseDown={handleMouseDown}
                     {...attributes}
                     {...listeners}
                >
                    <MdDragHandle/>
                </div>
                <div className="title_column">
                    <h4 className="font-extrabold">{type === 'text' ?
                            <div dangerouslySetInnerHTML={createMarkup(sectionTitle)}>
                            </div> :
                            sectionTitle
                    }
                    </h4>
                </div>
                <div className={`icon_wrap ${openIndex.includes(index) ? "open" : ""}`}>
                    <MdKeyboardArrowDown />
                </div>
            </div>
            <div className={`section_content my_row ${openIndex.includes(index) ? "open" : ""}`}>
                {type === "text" &&
                    <>
                        <InputComponent
                            placeholder="Add Text"
                            type="wysiwyg"
                            hoverText={`Add Text to Section ${index + 1}`}
                            elementName={`text`}
                            value={text}
                            currentSection={section}
                            sections={sections}
                            setSections={setSections}
                            showTiny={showTiny}
                            setShowTiny={setShowTiny}
                            saveTo="landingPage"
                            index={index}
                        />
                        <ColorPicker
                            label="Background Color"
                            currentSection={section}
                            sections={sections}
                            setSections={setSections}
                            elementName={`bg_color`}
                            saveTo="landingPage"
                        />
                    </>
                }
                {type === "image" &&
                    <ImageComponent
                        ref={nodesRef}
                        completedCrop={completedCrop}
                        setCompletedCrop={setCompletedCrop}
                        setShowLoader={setShowLoader}
                        currentSection={section}
                        sections={sections}
                        setSections={setSections}
                        previewType="external"
                        elementName={`section_${index + 1}_image`}
                        saveTo="landingPage"
                        cropArray={{
                            unit: "%",
                            width: 30,
                            x: 25,
                            y: 25,
                            aspect: 16 / 8
                        }}
                    />
                }
                <div className="my_row">
                    <SectionButtonOptions
                        sectionPosition={index + 1}
                        sections={sections}
                        setSections={setSections}
                        currentSection={section}
                        buttonCourseId={button_course_id}
                        courses={courses}
                        id={id}
                        buttonType="purchase"
                        saveTo="landingPage"
                    />
                </div>
                <DeleteSection
                    id={id}
                    sections={sections}
                    setSections={setSections}
                    setOpenIndex={setOpenIndex}
                    url={'/creator-center/landing-page/delete-section/' + id}
                />
            </div>
        </div>
    );
};

export default Section;
