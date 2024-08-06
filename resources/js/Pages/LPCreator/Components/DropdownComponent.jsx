import React from 'react';
import {updateSectionData} from '@/Services/LandingPageRequests.jsx';
import {HandleFocus} from '@/Utils/InputAnimations.jsx';

const DropdownComponent = ({
                               courses,
                               buttonCourseId,
                               sections,
                               setSections,
                               id,
}) => {

    const handleChange = (e) => {

        if (e.target.value === "") {
            e.target.classList.remove('active');
        }

        const slug = e.target.options[e.target.selectedIndex].dataset.slug;
        const value = e.target.value;
        const packets = {
            button_course_id: value
        }

        updateSectionData(packets, id)
        .then((response) => {

            if(response.success) {
                setSections(
                    sections.map((section) => {
                        if(section.id === id) {
                            section.button_course_id = value;
                            section.slug = slug;
                            return section;
                        }

                        return section;
                    })
                )
            }
        });
    }

    return (
        <div className="relative">
            <select className={`animate ${buttonCourseId && "active"} `}
                    name="courses"
                    id="courses"
                    onChange={(e) => handleChange(e)}
                    value={buttonCourseId || ""}
                    onFocus={(e) => HandleFocus(e.target)}
            >
                <option></option>
                {courses?.map((course, index) => {
                    return <option key={index} value={course.id} data-slug={course.slug}>{course.title}</option>
                })}
            </select>
            <label>Select Course</label>
        </div>
    );
};

export default DropdownComponent;
