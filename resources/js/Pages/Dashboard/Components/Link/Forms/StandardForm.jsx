import React, {
    useCallback,
    useEffect,
    useState,
    useContext,
} from 'react';
import IconList from '../IconList';
import InputComponent from './InputComponent';
import InputTypeRadio from './InputTypeRadio';
import {
    addLink,
    checkURL,
    updateLink,
    updateLinkStatus,
} from '@/Services/LinksRequest.jsx';
import {
    FOLDER_LINKS_ACTIONS,
    LINKS_ACTIONS,
} from '@/Services/Reducer.jsx';
import {
    FolderLinksContext,
    PageContext,
    UserLinksContext,
} from '../../../Dashboard.jsx';
import {HandleFocus, HandleBlur} from '@/Utils/InputAnimations.jsx';
import {acceptTerms} from '@/Services/UserService.jsx';
import IconDescription from './IconDescription.jsx';
import {getJsonValue} from '@/Services/IconRequests.jsx';

const StandardForm = ({
                          accordionValue,
                          setAccordionValue,
                          inputType,
                          setInputType,
                          editID,
                          subStatus,
                          setShowLinkForm,
                          setEditID,
                          setShowUpgradePopup,
                          folderID,
                          affiliateStatus = null,
                          setAffiliateStatus = null,

}) => {

    const { userLinks, dispatch } = useContext(UserLinksContext);
    const { folderLinks, dispatchFolderLinks } = useContext(FolderLinksContext);
    const  { pageSettings } = useContext(PageContext);
    const [ showTerms, setShowTerms ] = useState(false);

    const [currentLink, setCurrentLink] = useState(
        userLinks.find(function(e) {
            return e.id === editID
        }) || folderLinks.find(function(e) {
            return e.id === editID
        }) ||
        {
            icon: null,
            name: null,
            url: null,
            email: null,
            phone: null,
            mailchimp_list_id: null,
            shopify_products: null,
            shopify_id: null,
            course_id: null,
            description: null,
            type: null,
        }
    );

    const [descChecked, setDescChecked] = useState(
        Boolean(
            currentLink.description &&
            currentLink.description !== "" &&
            currentLink.type === "advanced"
        ));

    const [charactersLeft, setCharactersLeft] = useState(11);

    useEffect(() => {
        if(currentLink.name) {
            setCharactersLeft(11 - currentLink.name.length);
        }

    },[charactersLeft])

    useEffect(() => {

        if(accordionValue === "standard") {
            if (currentLink.phone) {
                setInputType("phone")
            } else if (currentLink.email) {
                setInputType("email")
            } else {
                setInputType("url")
            }
        } else if (accordionValue === "offer") {
            setInputType("offer")
        }

    },[])

    const handleLinkName = useCallback( (e) => {
            let value = e.target.value;

            setCharactersLeft(11 - value.length);

            setCurrentLink((prev) => ({
                ...prev,
                name: value
            }))
        },[]);

    const handleOnClick = () => {

        if (!subStatus) {
            setShowUpgradePopup({
                show: true,
                text: "change link name"
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let URL = currentLink.url;
        let data;

        if (URL && currentLink.name) {
            data = checkURL(URL, currentLink.name, null, subStatus);
        } else {
            data = {
                success: true,
                url: URL
            }
        }

        if (data["success"]) {

            URL = data["url"];
            let packets;
            let descValue = null;
            let iconType = inputType;

            if (currentLink.description && currentLink.description !== "") {
                if(descChecked) {
                    iconType = "advanced";
                }
                descValue = getJsonValue(currentLink.description);
            }

            switch (inputType) {
                case "url":
                    packets = {
                        name: currentLink.name,
                        url: URL,
                        icon: currentLink.icon,
                        page_id: pageSettings["id"],
                        folder_id: folderID,
                        description: descValue,
                        type: iconType,
                    };
                    break;
                case "email":
                    packets = {
                        name: currentLink.name,
                        email: currentLink.email,
                        icon: currentLink.icon,
                        page_id: pageSettings["id"],
                        folder_id: folderID,
                        description: descValue,
                        type: iconType,
                    };
                    break;
                case "phone":
                    packets = {
                        name: currentLink.name,
                        phone: currentLink.phone,
                        icon: currentLink.icon,
                        page_id: pageSettings["id"],
                        folder_id: folderID,
                        description: descValue,
                        type: iconType,
                    };
                    break;
                case "offer":
                    packets = {
                        name: currentLink.name,
                        icon: currentLink.icon,
                        url: URL,
                        page_id: pageSettings["id"],
                        course_id: currentLink.course_id,
                        folder_id: folderID,
                        description: descValue,
                        type: iconType,
                    };
                    break;
                default:
                    packets = {
                        name: currentLink.name,
                        url: URL,
                        icon: currentLink.icon,
                        page_id: pageSettings["id"],
                        folder_id: folderID,
                        description: descValue,
                        type: iconType,
                    };
                    break;
            }

            const func = editID ? updateLink(packets, editID) : addLink(packets);

            func.then((data) => {

                if (data.success) {

                    if (folderID) {

                        if (editID) {
                            dispatchFolderLinks({
                                type: FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS,
                                payload: {
                                    editID: editID,
                                    currentLink: currentLink,
                                    url: URL,
                                    type: iconType,
                                    iconPath: currentLink.icon
                                }
                            })

                            dispatch({
                                type: LINKS_ACTIONS.UPDATE_LINK_IN_FOLDER,
                                payload: {
                                    folderID: folderID,
                                    editID: editID,
                                    currentLink: currentLink,
                                    url: URL,
                                    type: iconType,
                                    iconPath: currentLink.icon
                                }
                            })

                        } else {
                            let newFolderLinks = [...folderLinks];

                            const newLinkObject = {
                                id: data.link_id,
                                folder_id: folderID,
                                name: currentLink.name,
                                url: URL,
                                email: currentLink.email,
                                phone: currentLink.phone,
                                type: iconType,
                                icon: currentLink.icon,
                                course_id: currentLink.course_id,
                                position: data.position,
                                description: currentLink.description,
                                active_status: true
                            }

                            newFolderLinks = newFolderLinks.concat(
                                newLinkObject);

                            dispatchFolderLinks({
                                type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS,
                                payload: {
                                    links: newFolderLinks
                                }
                            });

                            let folderActive = null;
                            if (newFolderLinks.length === 1) {
                                folderActive = true;
                                const url = "/dashboard/folder/status/";
                                const packets = {
                                    active_status: folderActive,
                                };

                                updateLinkStatus(packets, folderID, url);
                            }

                            dispatch({
                                type: LINKS_ACTIONS.ADD_NEW_IN_FOLDER,
                                payload: {
                                    newLinkObject: newLinkObject,
                                    folderActive: folderActive,
                                    folderID: folderID
                                }
                            })

                        }

                    } else {

                        if (editID) {
                            dispatch({
                                type: LINKS_ACTIONS.UPDATE_LINK,
                                payload: {
                                    editID: editID,
                                    currentLink: currentLink,
                                    url: URL,
                                    type: iconType,
                                    iconPath: currentLink.icon
                                }
                            })

                        } else {
                            let newLinks = [...userLinks];

                            const newLinkObject = {
                                id: data.link_id,
                                name: currentLink.name,
                                url: URL,
                                email: currentLink.email,
                                phone: currentLink.phone,
                                type: iconType,
                                icon: currentLink.icon,
                                course_id: currentLink.course_id,
                                position: data.position,
                                description: currentLink.description,
                                active_status: true
                            }

                            dispatch({
                                type: LINKS_ACTIONS.SET_LINKS,
                                payload: {
                                    links: newLinks.concat(newLinkObject)
                                }
                            })
                        }
                    }

                    setCurrentLink({});
                    setAccordionValue(null);
                    setShowLinkForm(false);
                    setInputType(null);
                    setEditID(null);
                }
            })
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setEditID(null);
        setShowLinkForm(false);
        setInputType(null);
        setAccordionValue(null);
        setCurrentLink({});
        document.getElementById('left_col_wrap').style.minHeight = "unset";
    }

    const handleSubmitTerms = (e) => {
        e.preventDefault()

        acceptTerms().then((data) => {

            if (data.success && setAffiliateStatus) {
                setAffiliateStatus("approved");
                setShowTerms(false);
            }
        });

    }

    return (
        <>
        { accordionValue === "offer" && (affiliateStatus !== "approved" || !affiliateStatus) ?

            showTerms ?
                <div className="aff_terms">
                    <h3>Terms and Conditions</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, aspernatur dignissimos doloribus itaque quaerat rem repellendus vel voluptates. Aliquam doloribus eligendi iste, labore molestias nisi omnis saepe voluptatibus. Consequuntur, esse.</p>
                    <form action="" onSubmit={handleSubmitTerms}>
                        {/*<div className="checkbox_wrap">
                            <input
                                name="terms"
                                type="checkbox"
                                onChange={() => setTermsChecked(!termsChecked)}
                            />
                            <label htmlFor="terms">I Agree</label>
                        </div>*/}
                        <div className="buttons_wrap">
                            <button type="submit" className="button green" >Accept</button>
                            <a className="button transparent gray" href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setShowTerms(false);
                               }}
                            >Cancel</a>
                        </div>
                    </form>
                </div>
                :
                <div className="info_message">
                    <p>Sign up now to become an affiliate and earn money selling courses!</p>
                    <a className="button blue"
                       href="#"
                       onClick={(e) => {
                           e.preventDefault();
                           setShowTerms(true);
                       }}>Click Here To Get Approved</a>
                </div>
            :

            <form onSubmit={handleSubmit} className="link_form">
                <div className="icon_row">
                    <div className="icon_box">
                        <IconList
                            currentLink={currentLink}
                            setCurrentLink={setCurrentLink}
                            accordionValue={accordionValue}
                            setCharactersLeft={setCharactersLeft}
                            inputType={inputType}
                            setInputType={setInputType}
                            editID={editID}
                        />

                    </div>
                </div>
                <div className="my_row my-4">

                    {!subStatus &&
                        <p className="upgrade_text"><sup>*</sup>Upgrade to customize</p>
                    }
                    <div className="input_wrap mt-2">
                        <input
                            className={`${!subStatus ? "disabled " : ""} ${currentLink.name ? "active" : ""}`}
                            name="name"
                            type="text"
                            value={currentLink.name || ""}
                            onChange={(e) => handleLinkName(e)}
                            onFocus={(e) => HandleFocus(e.target)}
                            onBlur={(e) => HandleBlur(e.target)}
                            disabled={!subStatus}
                        />
                        <label>Icon Name</label>
                        {!subStatus &&
                            <span className="disabled_wrap"
                                  onClick={(e) => handleOnClick(e)}>
                            </span>
                        }
                    </div>
                    <div className="my_row info_text title">
                        <p className="char_max">Max 11 Characters Shown</p>
                        <p className="char_count">
                            {charactersLeft < 0 ?
                                <span className="over">Only 11 Characters Will Be Shown</span>
                                :
                                "Characters Left: " +
                                charactersLeft
                            }
                        </p>
                    </div>
                </div>

                {accordionValue !== "offer" &&
                    <InputTypeRadio
                        inputType={inputType}
                        setInputType={setInputType}
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                    />
                }

                <div className="my_row mb-4">
                    {accordionValue === "offer" ?
                        <div className="external_link">
                            <h3>Tracking Link:</h3>
                            {currentLink.url ?
                                <a className="inline-block" target="_blank" href={currentLink.url}>{currentLink.url}</a>
                                :
                                <p>Select An Icon Above</p>
                            }
                        </div>
                        :
                        <InputComponent
                            inputType={inputType}
                            setInputType={setInputType}
                            currentLink={currentLink}
                            setCurrentLink={setCurrentLink}
                        />
                    }
                </div>

                {!folderID &&
                    <IconDescription
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                        descChecked={descChecked}
                        setDescChecked={setDescChecked}
                    />
                }

                <div className="button_row w-full mt-4">
                    <button className="button green" type="submit">
                        Save
                    </button>
                    <a href="#" className="button transparent gray" onClick={(e) => handleCancel(e)}>
                        Cancel
                    </a>
                    <a className="help_link" href="mailto:help@link.pro">Need Help?</a>
                </div>

            </form>
        }
        </>
    );
};

export default StandardForm;
