import React, {useCallback, useEffect, useState} from 'react';
import {icons} from '@/Services/IconObjects.jsx';
import {
    getIcons,
} from '@/Services/IconRequests.jsx';
import {getIconPaths} from '@/Services/ImageService.jsx';
import {getCourseCategories} from '@/Services/CourseRequests.jsx';
import DropdownComponent from './Forms/DropdownComponent';
import {HandleFocus, HandleBlur} from '@/Utils/InputAnimations.jsx';
import {isEmpty} from 'lodash';
import {usePage} from '@inertiajs/react';

const IconList = ({
                      currentLink,
                      setCurrentLink,
                      accordionValue,
                      setCharactersLeft,
                      setInputType = null,
                      integrationType = null,
                      editID,
                      customIconArray = null,
                      setCustomIconArray = null,
}) => {

    const { auth } = usePage().props;
    const authUser = auth.user.userInfo?.id;

    const [isDefaultIcon, setIsDefaultIcon] = useState(false);

    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [iconList, setIconList] = useState([]);
    const [filteredIcons, setFilteredIcons] = useState([]);
    const [filteredByCat, setFilteredByCat] = useState([]);
    const [courseCategories, setCourseCategories] = useState([]);

    const [activeIcon, setActiveIcon] = useState(null)

    const [iconsWrapClasses, setIconsWrapClasses] = useState("");

    useEffect(() => {

        if (accordionValue === "offer") {
            getCourseCategories().then((data) => {
                if (data.success) {
                    setCourseCategories(data.categories);
                }
            })
        }
    },[])

    useEffect(() => {

        let url;

        switch(accordionValue) {
            case "offer":
                url = '/get-aff-icons';
                break;
            case "custom":
            case "integration":
                url = '/get-custom-icons';
                break;
            case "standard":
                url = '/get-standard-icons'
                break;
            default:
                break;
        }

        getIcons(url).then((data) => {
            if(data.success) {

                if (accordionValue === "standard") {
                    setIconList(getIconPaths(data.iconData));
                } else if (accordionValue === "custom" || accordionValue === "integration") {
                    setCustomIconArray(data.iconData);
                } else {
                    //offerArray = data.iconData;
                    setIconList(data.iconData)
                }

                setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            }
        })

    },[accordionValue])

    useEffect(() => {

        if (accordionValue === "integration" && !editID) {
            setIsDefaultIcon(true)

            if (integrationType === "mailchimp") {
                setCurrentLink(prevState => ({
                    ...prevState,
                    icon: "https://local-lp-user-images.s3.us-east-2.amazonaws.com/icons/Mailchimp.png",
                    type: "mailchimp"
                }))
            }

            if (integrationType === "shopify") {
                setCurrentLink(prevState => ({
                    ...prevState,
                    icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Shopify.png",
                    type: "shopify"
                }))
            }
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 500)

    },[accordionValue])

    const selectIcon = useCallback((e, source) => {
        e.preventDefault();
        const el = e.target;
        const iconType = el.dataset.icontype;
        const iconIndex = el.dataset.index || null;

        if(iconIndex !== activeIcon) {
            setActiveIcon(iconIndex);

            let name;
            if(el.dataset.name) {
                name = el.dataset.name;
                setCharactersLeft(11 - name.length);

                if( (name.toLowerCase().includes("mail") && !name.toLowerCase().includes("mailchimp") )
                    || name.toLowerCase().includes("yahoo")
                    || name.toLowerCase().includes("outlook") ) {
                    setInputType("email");
                } else if (name.toLowerCase() === "phone" || name.toLowerCase() === "facetime") {
                    setInputType("phone");
                } else {
                    setInputType("url");
                }

            } else {
                name = currentLink.name;
            }

            let url = null;
            if(iconType === "standard") {
                let icon = icons.find(icon => icon.name === name);
                if (icon?.prefix) {
                    url = icon.prefix;
                }
            }

            if(iconType === "offer") {
                //url = window.location.origin + "/" + el.dataset.creator + "/course-page/" + el.dataset.slug + "?a=" + authUser;
                url = window.location.origin + "/offers/" + el.dataset.offer + "/" + authUser
                setInputType("offer")
            }

            setCurrentLink(prevState => ({
                ...prevState,
                name: name,
                icon: source,
                url: url,
                type: iconType,
                course_id: el.dataset.course || ""
            }))

            setTimeout(function(){
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: "nearest",
                });

            }, 500)

        } else {
            setActiveIcon(null);
        }
    });

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }

    useEffect(() => {

        if (accordionValue === "standard") {
            setFilteredIcons(iconList?.filter((i) => {
                const iconName = i.name && i.name.toLowerCase().replace(" ", "");
                const userInput = searchInput.toLowerCase().replace(" ", "");
                return iconName && iconName.match(userInput);
            }))
        } else {

            const filterList = filteredByCat.length > 0 ?
                filteredByCat :
                iconList;

            setFilteredIcons(filterList?.filter((i) => {
                const offerName = i.name && i.name.toLowerCase().replace(" ", "");
                const userInput = searchInput.toLowerCase().replace(" ", "");
                return offerName && offerName.match(userInput);
            }))

        }

    },[iconList, searchInput])

    useEffect(() => {

        let classes = "";

        if(accordionValue === "integration") {
            classes = "outer integration_icons";
        }

        if(activeIcon !== null ||
            (customIconArray && customIconArray.length < 5 &&
                (accordionValue === "custom" ||
                    accordionValue === "integration") ) ) {
            classes += " active";
        }

        setIconsWrapClasses(classes);

    },[activeIcon, customIconArray]);

    const switchIconsList = () => {

        switch(accordionValue) {

            case "custom" :

                return (
                    !isEmpty(customIconArray) ? customIconArray.map((iconPath, index) => {
                        const newPath = iconPath?.replace("public", "/storage");

                        return (
                            <div key={index} className="icon_col">
                                <img alt=""
                                     className={`img-fluid icon_image ${parseInt(activeIcon) === parseInt(index) ? "active" : ""}`}
                                     data-icontype={accordionValue}
                                     data-index={index}
                                     src={newPath}
                                     onClick={(e) => {
                                         selectIcon(e, newPath)
                                     }}/>
                            </div>
                        )

                        })
                        :
                        <div className="info_message">
                            <p>You don't have any icons to display.</p>
                            <p>Click 'Upload Image' above to add a custom icon.</p>
                        </div>
                )

                case "integration":

                    return (
                        <>
                        <div className="icon_col default_icon">
                            <p>Default Icon</p>
                            <img alt=""
                                 className={`
                                     ${isDefaultIcon ?
                                     "active img-fluid icon_image" :
                                     "img-fluid icon_image"}
                                     ${parseInt(activeIcon) === parseInt(-1) ? "active" : ""}
                                     `}
                                 src={integrationType === "mailchimp" ?
                                     "https://local-lp-user-images.s3.us-east-2.amazonaws.com/icons/Mailchimp.png" :
                                     "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Shopify.png"}
                                 data-icontype="default"
                                 data-index={-1}
                                 onClick={(e) => {
                                     selectIcon(e, e.target.src)
                                 }}/>
                        </div>
                        <div className="custom_icons">
                            <p>Custom Icons</p>
                            <div className="icons_wrap inner">
                                {!isEmpty(customIconArray) ?
                                    customIconArray.map((iconPath, index) => {
                                        const newPath = iconPath.replace("public", "/storage");

                                        return (
                                            <div key={index}
                                                 className={`icon_col`}
                                            >
                                                <img alt=""
                                                     data-index={index}
                                                     className={`img-fluid icon_image ${parseInt(activeIcon) === parseInt(index) ? "active" : ""}`}
                                                     src={newPath}
                                                     data-icontype={accordionValue}
                                                     onClick={(e) => {
                                                         selectIcon(e, newPath)
                                                     }}/>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="info_message">
                                        <p>You don't have any icons to display.</p>
                                        <p>Click 'Upload Image' above to add a custom icon.</p>
                                    </div>
                                }
                            </div>
                        </div>
                        </>
                    )

                default:

                    return (
                        filteredIcons ?
                            filteredIcons.map((icon, index) => {

                            return (
                                <div key={index} className="icon_col">
                                    <img
                                        className={`img-fluid icon_image ${parseInt(activeIcon) === parseInt(index) ? "active" : ""}`}
                                        src={icon.path}
                                        onClick={(e) => {
                                            selectIcon(e, icon.path)
                                        }}
                                        data-name={icon.name}
                                        data-creator={icon.creator || ""}
                                        data-slug={icon.slug || ""}
                                        data-course={icon.course_id || ""}
                                        data-icontype={accordionValue}
                                        data-offer={icon.offer_id || ""}
                                        data-index={index}
                                        alt=""
                                    />
                                    <div className="hover_text icon_text">
                                        <p>
                                            {icon.name}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        iconList?.map((icon, index) => {

                            return (
                                <div key={index} className="icon_col">
                                    <img
                                        className={`img-fluid icon_image ${parseInt(activeIcon) === parseInt(index) ? "active" : ""}`}
                                        src={icon.path}
                                        onClick={(e) => {
                                            selectIcon(e, icon.path)
                                        }}
                                        data-name={icon.name}
                                        data-creator={icon.creator || ""}
                                        data-slug={icon.slug || ""}
                                        data-course={icon.course_id || ""}
                                        data-icontype={accordionValue}
                                        data-offer={icon.offer_id || ""}
                                        data-index={index}
                                        alt=""
                                    />
                                    <div className="hover_text icon_text">
                                        <p>
                                            {icon.name}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    )
        }
    }

    return (

        <>
        { (accordionValue === "standard" || accordionValue === "offer") &&
            <div className="uploader mt-3">
                {accordionValue === "offer" &&
                    <DropdownComponent
                        data={courseCategories}
                        iconList={iconList}
                        setSearchInput={setSearchInput}
                        setFilteredIcons={setFilteredIcons}
                        setFilteredByCat={setFilteredByCat}
                    />
                }
                <div className="relative my-3 my_row">
                    <input
                        className="animate"
                        name="search"
                        type="text"
                        onChange={(e) => handleChange(e)}
                        onFocus={(e) => HandleFocus(e.target)}
                        onBlur={(e) => HandleBlur(e.target)}
                        value={searchInput}/>
                    <label htmlFor="search">Search {accordionValue === "standard" ? "Icons" : "Offers"}</label>
                </div>
                {accordionValue === "standard" &&
                    <div className="my_row info_text file_types mb-2 text-center">
                        <a href="mailto:help@link.pro" className="mx-auto m-0 char_count">Don't See Your Icon? Contact Us!</a>
                    </div>
                }
            </div>
        }

            <div className={`icons_wrap my_row ${iconsWrapClasses}`}>

                {isLoading &&
                    <div id="loading_spinner" className="active">
                        <img src={Vapor.asset('images/spinner.svg')} alt="" />
                    </div>
                }

                {switchIconsList()}
            </div>

        </>


    );
}

export default IconList;
