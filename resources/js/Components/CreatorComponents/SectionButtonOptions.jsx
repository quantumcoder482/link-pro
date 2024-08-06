import React, {useEffect, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import ColorPicker from '@/Components/CreatorComponents/ColorPicker.jsx';
import InputComponent from '@/Components/CreatorComponents/InputComponent.jsx';
import SliderComponent from '@/Components/CreatorComponents/SliderComponent.jsx';
import {updateSectionData} from '@/Services/CourseRequests.jsx';
import {updateSectionData as updateLPSectionData} from '@/Services/LandingPageRequests.jsx';
import DropdownComponent
    from '@/Pages/LPCreator/Components/DropdownComponent.jsx';
import IOSSwitch from '@/Utils/IOSSwitch.jsx';

const SectionButtonOptions = ({
                                  sectionPosition,
                                  sections,
                                  setSections,
                                  currentSection,
                                  id,
                                  courses = null,
                                  buttonCourseId = null,
                                  buttonType,
                                  saveTo
}) => {

    const {
        button_position,
        button,
        button_text,
        button_size
    } = currentSection;

    const [includeButtonValue, setIncludeButtonValue] = useState(false);
    const [buttonPositionValue, setButtonPositionValue] = useState("above");

    useEffect(() => {
        setIncludeButtonValue(button || buttonType === "download")
    },[])

    useEffect(() => {
        setButtonPositionValue(button_position)
    },[])

    const handleSwitchChange = () => {
        setIncludeButtonValue(!includeButtonValue);

        const packets = {
            button: !includeButtonValue,
        };

        const method = saveTo === "course" ?
            updateSectionData(packets, id) :
            updateLPSectionData(packets, id)
        method.then((response) => {
            if(response.success) {
                setSections(
                    sections.map((section) => {
                        if(section.id === id) {
                            section.button = !includeButtonValue;
                        }

                        return section;
                    })
                )
            }
        });
    }

    const handleRadioChange = (value) => {
        setButtonPositionValue(value);

        const packets = {
            button_position: value,
        };

        const method = saveTo === "course" ?
            updateSectionData(packets, id) :
            updateLPSectionData(packets, id)
        method.then((response) => {
            if(response.success) {
                setSections(
                    sections.map((section) => {
                        if(section.id === id) {
                            section.button_position = value;
                        }

                        return section;
                    })
                )
            }
        });
    }

    return (
        <>
            {buttonType === "purchase" ?
                <div className={`switch_wrap page_settings border_wrap ${!button ? "mb-4" : "" }`}>
                    <label>Include Button</label>
                    <IOSSwitch
                        onChange={handleSwitchChange}
                        checked={Boolean(includeButtonValue)}
                    />
                </div>
                :
                ""
            }
            <div className={`button_options ${ (includeButtonValue || buttonType === "download") ? "open" : ""} ${buttonType === "download" ? "!border-0" : ""}`}>
                {buttonType === "purchase" ?
                    <article className="page_settings border_wrap">
                        <div className="radios_wrap">
                            <FormControl>
                                <FormLabel
                                    id={`section_${sectionPosition}_above`}
                                    sx={{
                                        color: '#000'
                                    }}
                                >
                                    <label>Button Location</label>
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby={`section_${sectionPosition}_above`}
                                    name={`section_${sectionPosition}_above`}
                                    onChange={(e) => {handleRadioChange(e.target.value)}}
                                >
                                    <FormControlLabel
                                        value="above"
                                        control={
                                            <Radio
                                                checked={ (buttonPositionValue === "above" || !buttonPositionValue) && true}
                                            />}
                                        label="Above"
                                    />
                                    <FormControlLabel
                                        value="below"
                                        control={
                                            <Radio
                                                checked={buttonPositionValue === "below" && true}
                                            />}
                                        label="Below"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                    </article>
                    :
                    ""
                }
                <SliderComponent
                    label="Button Size"
                    id={id}
                    value={button_size}
                    elementName="button_size"
                    sliderValues={{
                        step: 1,
                        min: 25,
                        max: 100,
                        unit: "%",
                    }}
                    saveTo={saveTo}
                    sections={sections}
                    setSections={setSections}
                />
                <ColorPicker
                    label="Button Text Color"
                    sections={sections}
                    setSections={setSections}
                    currentSection={currentSection}
                    elementName={`button_text_color`}
                    saveTo={saveTo}
                />
                <ColorPicker
                    label="Button Color"
                    sections={sections}
                    setSections={setSections}
                    currentSection={currentSection}
                    elementName={`button_color`}
                    saveTo={saveTo}
                />
                <InputComponent
                    placeholder="Update Button Text"
                    type="text"
                    maxChar={20}
                    hoverText="Submit Button Text"
                    elementName={`button_text`}
                    sections={sections}
                    setSections={setSections}
                    currentSection={currentSection}
                    value={button_text || (buttonType === "purchase" ? "Get Course" : "Download File") }
                    saveTo={saveTo}
                />
                {courses &&
                    <DropdownComponent
                        courses={courses}
                        buttonCourseId={buttonCourseId}
                        sections={sections}
                        setSections={setSections}
                        id={id}
                    />
                }
            </div>
        </>
    );
};

export default SectionButtonOptions;
