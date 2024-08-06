import React, {useEffect, useState} from 'react';
import DeleteSection from '@/Components/CreatorComponents/DeleteSection.jsx';
import {MdDragHandle, MdKeyboardArrowDown} from 'react-icons/md';
import InputComponent from '@/Components/CreatorComponents/InputComponent.jsx';
import ColorPicker from '@/Components/CreatorComponents/ColorPicker.jsx';
import ImageComponent from '@/Components/CreatorComponents/ImageComponent.jsx';
import SectionButtonOptions from '@/Components/CreatorComponents/SectionButtonOptions.jsx';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import FileComponent
    from '@/Pages/CourseCreator/Components/FileComponent.jsx';
import {getFileParts} from '@/Services/FileService.jsx';
import {updateSectionData} from '@/Services/CourseRequests.jsx';
import IOSSwitch from '@/Utils/IOSSwitch';
import ToolTipIcon from '@/Utils/ToolTips/ToolTipIcon';
import SliderComponent
    from '@/Components/CreatorComponents/SliderComponent.jsx';
import isJSON from 'validator/es/lib/isJSON.js';
import {convertText} from '@/Services/CreatorServices.jsx';

const Section = ({
                     section,
                     index,
                     sections,
                     setSections,
                     openIndex,
                     setOpenIndex,
                     videoCount,
                     textCount,
                     imageCount,
                     fileCount,
                     setHoverSection,
                     completedCrop,
                     setCompletedCrop,
                     nodesRef,
                     setShowLoader
}) => {

    const [lockVideo, setLockVideo] = useState(true);
    const [showTiny, setShowTiny]   = useState(false);

    const {
        id,
        type,
        text,
        video_title,
        title_size,
        video_link,
        lock_video,
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

    useEffect(() => {
        setLockVideo(lock_video !== null ? lock_video : true)
    },[])

    const handleSectionOpen = (rowIndex) => {
        if(openIndex.includes(rowIndex)) {
            const newArrayIndex = openIndex.filter(element => element !== rowIndex)
            setOpenIndex(newArrayIndex)
        } else {
            const newArrayIndex = openIndex.concat(rowIndex);
            setOpenIndex(newArrayIndex);
        }
    }

    const handleChange = () => {
        const newLockVideoValue = !lockVideo;
        setLockVideo(newLockVideoValue);

        const packets = {
            lock_video: newLockVideoValue,
        };

        updateSectionData(packets, section.id)
        .then((response) => {
            if(response.success) {
                setSections(
                    sections.map((section) => {
                        if(section.id === id) {
                            section.lock_video = newLockVideoValue;
                        }
                        return section;
                    })
                )
            }
        });
    }
    const handleMouseDown = () => {
        setOpenIndex([])
    }

    const getSectionTitle = () => {
        switch(type) {
            case 'video':
                const ellipsis = section.video_title?.length > 20 ? "..." : ""
                return (
                    section.video_title ?
                        section.video_title.slice(0, 20) + ellipsis :
                        type  + " " + videoCount
                )
            case 'text':
                const regex = /(<([^>]+)>)/gi;
                let parsedText = "";
                if (section.text && isJSON(section.text)) {
                    const convertedText = convertText(section.text);
                    parsedText = convertedText.text;
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

                return parsedText;
            case 'image' :
                return (
                    section.image ?
                        <img className="input_image" src={section.image} alt=""/>
                        :
                        type  + " " + imageCount
                )
            case 'file' :
                let content = "";
                if(section.file) {
                    const fileNameObj = getFileParts(section.file)
                    content = fileNameObj.name + "." + fileNameObj.type
                    content = content.length > 20 ?
                        content.slice(0, 20) + '...' :
                        content;
                } else {
                    content = type  + " " + fileCount
                }

                return (
                    content
                )
        }
    }

    return (
        <div ref={setNodeRef}
             id={`section_${index + 1}`}
             style={style}
             className="section_row"
             onMouseEnter={(e) =>
                 setHoverSection(e.target.id)
        }>
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
                    <h4>
                        {getSectionTitle()}
                    </h4>
                </div>
                <div className={`icon_wrap ${openIndex.includes(index) ? "open" : ""}`}>
                    <MdKeyboardArrowDown />
                </div>
            </div>
            <div className={`section_content my_row ${openIndex.includes(index) ? "open" : ""}`}>
                {(() => {
                    switch (type) {
                        case 'text':
                           return (
                               <>
                                   <InputComponent
                                        placeholder="Add Text"
                                        type="wysiwyg"
                                        hoverText="Add Text to Section"
                                        elementName={`text`}
                                        value={text}
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        showTiny={showTiny}
                                        setShowTiny={setShowTiny}
                                        saveTo="course"
                                   />
                                    <ColorPicker
                                        label="Background Color"
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        elementName={`background_color`}
                                        saveTo="course"
                                    />
                                    <SectionButtonOptions
                                        sectionPosition={index + 1}
                                        sections={sections}
                                        setSections={setSections}
                                        currentSection={section}
                                        id={id}
                                        buttonType="purchase"
                                        saveTo="course"
                                    />
                               </>
                           )
                        case 'video':
                            return (
                                <>
                                    <InputComponent
                                        placeholder="Video Title"
                                        type="text"
                                        maxChar={65}
                                        hoverText="Add Video Title"
                                        elementName={`video_title`}
                                        value={video_title || ""}
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        saveTo="course"
                                    />
                                    <SliderComponent
                                        label="Title Font Size"
                                        id={id}
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        value={title_size}
                                        elementName={`title_size`}
                                        sliderValues={{
                                            step: .1,
                                            min: .1,
                                            max: 5,
                                            unit: 'rem',
                                        }}
                                        saveTo="course"
                                    />
                                    <ColorPicker
                                        label="Title Color"
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        elementName={`title_color`}
                                        saveTo="course"
                                    />
                                    <InputComponent
                                        placeholder="YouTube or Vimeo Link"
                                        type="url"
                                        hoverText="Add Embed Link"
                                        elementName={`video_link`}
                                        value={video_link || ""}
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        saveTo="course"
                                    />
                                    <InputComponent
                                        placeholder="Video Text Blurb (optional)"
                                        type="wysiwyg"
                                        hoverText={`Submit Text Blurb`}
                                        elementName={`text`}
                                        value={text || ""}
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        showTiny={showTiny}
                                        setShowTiny={setShowTiny}
                                        saveTo="course"
                                    />
                                    <ColorPicker
                                        label="Background Color"
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        elementName={`background_color`}
                                        saveTo="course"
                                    />
                                    <div className="switch_wrap two_columns">
                                        <div className={`page_settings border_wrap`}>
                                            <h3>Lock Video</h3>
                                            <IOSSwitch
                                                onChange={handleChange}
                                                checked={Boolean(lockVideo)}
                                            />
                                        </div>
                                        <ToolTipIcon section="course_lock_video" />
                                    </div>
                                </>
                            )
                        case 'image' :
                            return (
                                <>
                                    <ImageComponent
                                        ref={nodesRef}
                                        completedCrop={completedCrop}
                                        setCompletedCrop={setCompletedCrop}
                                        setShowLoader={setShowLoader}
                                        currentSection={section}
                                        sections={sections}
                                        setSections={setSections}
                                        elementName={`section_${index + 1}_image`}
                                        previewType="external"
                                        saveTo="course"
                                        cropArray={{
                                            unit: "%",
                                            width: 30,
                                            x: 25,
                                            y: 25,
                                            aspect: 16 / 8
                                        }}
                                    />
                                    <SectionButtonOptions
                                        sectionPosition={index + 1}
                                        sections={sections}
                                        setSections={setSections}
                                        currentSection={section}
                                        id={id}
                                        buttonType="purchase"
                                        saveTo="course"
                                    />
                                </>
                            )
                        case 'file' :
                            return (
                                <>
                                <FileComponent
                                    elementName={`file`}
                                    setShowLoader={setShowLoader}
                                    currentSection={section}
                                    sections={sections}
                                    setSections={setSections}
                                    index={index}
                                />
                                <SectionButtonOptions
                                    sectionPosition={index + 1}
                                    sections={sections}
                                    setSections={setSections}
                                    currentSection={section}
                                    id={id}
                                    buttonType="download"
                                    saveTo="course"
                                />
                                </>
                            )
                    }

                })()}
                <DeleteSection
                    id={id}
                    sections={sections}
                    setSections={setSections}
                    setOpenIndex={setOpenIndex}
                    url={"/creator-center/course/delete-section/" + id}
                />
            </div>
        </div>
    );
};

export default Section;
