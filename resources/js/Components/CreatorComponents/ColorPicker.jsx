import React, {useEffect, useState, useRef} from 'react';
import {SketchPicker} from 'react-color';
import {RiCloseCircleFill} from 'react-icons/ri';
import {
    updateData,
    updateSectionData,
} from '@/Services/CourseRequests.jsx';
import {
    updateData as updateLPData,
    updateSectionData as updateLPSectionData,
} from '@/Services/LandingPageRequests.jsx';
import {LP_ACTIONS} from '@/Components/Reducers/CreatorReducers.jsx';
import {VscTriangleDown} from 'react-icons/vsc';

const ColorPicker = ({
                         label,
                         elementName,
                         data = null,
                         dispatch = null,
                         sections = null,
                         setSections = null,
                         currentSection = null,
                         saveTo
}) => {

    const [sketchPickerColor, setSketchPickerColor] = useState({
        r: "",
        g: "",
        b: "",
        a: "0",
    });
    // destructuring rgba from state
    const { r, g, b, a } = sketchPickerColor;

    const [showPicker, setShowPicker] = useState(false);
    const [pickerBg, setPickerBg] = useState({});
    const [colorValues, setColorValues] = useState({
        previous: null,
        current: null
    })

    useEffect(() => {
        setPickerBg({background: `rgba(${r} , ${g} , ${b} , ${a})`});

    },[sketchPickerColor])

    useEffect(() => {

        if(currentSection) {
            /*let element = elementName.split(/(\d+)/);
            element = element[2].replace('_', '');*/

            let color;
            if(elementName === "title_color" && !currentSection[elementName]) {
                color = 'rgba(0,0,0,1)';
            } else if (elementName === "bg_color" && !currentSection[elementName]) {
                color = 'rgba(255,255,255,1)';
            } else {
                color = currentSection[elementName];
            }

            setPickerBg({background: color});

            setColorValues((prev) => ({
                ...prev,
                previous: color
            }))
        } else {
            setPickerBg({ background: data[elementName] })
            setColorValues((prev) => ({
                ...prev,
                previous: data[elementName]
            }))
        }

    },[])

    useEffect(() => {

        function handleScroll() {
            setShowPicker(false);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    useEffect(() => {

        function handleResize() {
            setShowPicker(false);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })


    const handleOnChange = (color) => {
        setSketchPickerColor(color);
        const value = `rgba(${color.r} , ${color.g} , ${color.b} , ${color.a})`;

        if(sections) {

            /*let element = elementName.split(/(\d+)/);
            element = element[2].replace('_', '');*/

            setSections(sections.map((section) => {
                if (section.id === currentSection.id) {
                    return {
                        ...section,
                        [`${elementName}`]: value,
                    }
                }
                return section;
            }))

        } else {

            dispatch({
                type: LP_ACTIONS.UPDATE_PAGE_DATA,
                payload: {
                    value: value,
                    name: elementName
                }
            })
        }

        setColorValues((prev) => ({
            ...prev,
            current: value
        }))
    }

    const handleSave = (e) => {
        e.preventDefault();

        if (sections) {

            /*let element = elementName.split(/(\d+)/);
            element = element[2].replace('_', '');*/

            const packets = {
                [`${elementName}`]: colorValues.current,
            };

            const method = saveTo === "course" ?
                updateSectionData(packets, currentSection.id) :
                updateLPSectionData(packets, currentSection.id)
            method.then((response) => {
                if (response.success) {
                    setColorValues({
                        previous: colorValues.current,
                        current: colorValues.current
                    })
                    setShowPicker(false);
                }
            });
        } else {

            const packets = {
                [`${elementName}`]: colorValues.current,
            };

            const method = saveTo === "course" ?
                updateData(packets, data["id"], elementName) :
                updateLPData(packets, data["id"], elementName)
            method.then((response) => {
                if (response.success) {
                    setShowPicker(false);
                    setColorValues({
                        previous: colorValues.current,
                        current:  colorValues.current
                    })
                }
            })
        }
    }

    const handleClose = (e) => {

        e.preventDefault();

        if(sections) {

            /*let element = elementName.split(/(\d+)/);
            element = element[2].replace('_', '');*/

            setSections(sections.map((section) => {
                if (section.id === currentSection.id) {
                    return {
                        ...section,
                        [`${elementName}`]: colorValues.previous,
                    }
                }
                return section;
            }))

        } else {

            dispatch({
                type: LP_ACTIONS.UPDATE_PAGE_DATA,
                payload: {
                    value: colorValues.previous,
                    name: elementName
                }
            })
        }

        setColorValues({
            previous: colorValues.previous,
            current:  colorValues.previous
        })
        setPickerBg({background: colorValues.previous})

        setShowPicker(false);

    }

    const pickerRef = useRef();
    const linkRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        setShowPicker(!showPicker);

        if(!showPicker) {
            const pickerBox = pickerRef.current;

            const rect = e.target.getBoundingClientRect();
            const left = ((rect.right + rect.left) / 2) - 340 ;
            const top = rect.top - 442;

            pickerBox.style.position = "fixed";
            pickerBox.style.left = `${left}px`;
            pickerBox.style.top = `${top}px`;
        }

    }

    return (
        <article className="my_row page_settings border_wrap">
            <label>{label}</label>
            <div className="icon_wrap">
                <a ref={linkRef}
                   href="#"
                   onClick={(e) => { handleClick(e)}}
                >
                    <span className="color_wrap">
                        <span className="color_box"
                              style={pickerBg}>
                        </span>
                    </span>
                    Edit
                </a>
                <div ref={pickerRef} className="picker_container">
                    {showPicker &&
                        <div className="picker_wrapper">
                            <div className="close_icon icon_wrap">
                                <a href="#" onClick={(e) => {
                                    handleClose(e)
                                }}>
                                    <RiCloseCircleFill/>
                                </a>
                            </div>
                            <SketchPicker
                                onChange={(color) => {
                                    handleOnChange(color.rgb);
                                }}
                                color={sketchPickerColor}
                                width={300}
                            />
                            <a className="button blue" href="#"
                               onClick={(e) => {
                                   handleSave(e)
                               }}>Save</a>
                            <div className="picker_triangle">
                                <VscTriangleDown/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </article>
    );
};

export default ColorPicker;
