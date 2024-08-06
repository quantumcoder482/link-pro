import React, {useState} from 'react';
import {addSection} from '@/Services/CourseRequests.jsx';
import {addSection as addLPSection} from '@/Services/LandingPageRequests.jsx';

const ContentSelect = ({
                           sections,
                           setSections,
                           dataId,
                           setOpenIndex,
                           saveTo,
                           options
}) => {

    const [optionValue, setOptionValue] = useState("");

    const onSelectChange = (e) => {
        e.preventDefault();
        setOptionValue(e.target.value);

        const packets = {
            type: e.target.value
        }

        if (saveTo === "course") {
            addSection(packets, dataId)
            .then((response) => {
                if (response.success) {
                    setSections([
                        ...sections,
                        response.section
                    ])
                    const newIndex = sections.length;
                    setOpenIndex(prev => ([
                        ...prev,
                        newIndex
                    ]))
                    setTimeout(function() {
                        document.querySelector(
                            '.sections_wrap .section_row:last-child').
                            scrollIntoView({
                                behavior: 'smooth',
                                block: "start",
                                inline: "nearest"
                            });

                    }, 800)
                    setOptionValue("");
                }
            })
        } else {
            addLPSection(packets, dataId).then((response) => {
                if (response.success) {
                    setSections([
                        ...sections,
                        response.section
                    ])
                    const newIndex = sections.length;
                    setOpenIndex(prev => ([
                        ...prev,
                        newIndex
                    ]))
                    setTimeout(function() {
                        document.querySelector(
                            '.sections_wrap .section_row:last-child').
                            scrollIntoView({
                                behavior: 'smooth',
                                block: "start",
                                inline: "nearest"
                            });

                    }, 800)
                    setOptionValue("");
                }
            })
        }
    }

    return (
        <select
            name="add_section"
            id="add_section"
            onChange={(e) => onSelectChange(e)}
            value={optionValue}
        >
            <option value="">Select Section To Add</option>
            {options.map((option) => {
                return (
                    <option key={option.id} value={option.type}>
                        {option.label}
                    </option>
                )
            })}
        </select>
    );
};

export default ContentSelect;
