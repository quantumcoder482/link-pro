import React, {useContext, createRef, useState, useRef, useEffect, useCallback} from 'react';
import IntegrationType from './IntegrationType';
import {isEmpty} from 'lodash';
import MailchimpIntegration from './Mailchimp/MailchimpIntegration';
import ShopifyIntegration from './Shopify/ShopifyIntegration';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import IconList from '../IconList';
import {
    PageContext,
    UserLinksContext,
} from '../../../Dashboard.jsx';
import {
    canvasPreview,
    useDebounceEffect,
    onImageLoad,
    getFileToUpload,
    createImage, resizeFile,
} from '@/Services/ImageService.jsx';
import {
    addLink,
    checkURL,
    updateLink,
} from '@/Services/LinksRequest.jsx';
import {
    LINKS_ACTIONS,
} from '@/Services/Reducer.jsx';
import EventBus from '../../../../../Utils/Bus';
import MailchimpLists from './Mailchimp/MailchimpLists';
import AllProducts from './Shopify/AllProducts';
import StoreDropdown from './Shopify/StoreDropdown';
import SelectedProducts from './Shopify/SelectedProducts';
import {HandleBlur, HandleFocus} from '@/Utils/InputAnimations.jsx';
import CropTools from '@/Utils/CropTools';

const IntegrationForm = ({
                             setAccordionValue,
                             accordionValue,
                             editID,
                             setShowLinkForm,
                             setEditID,
                             setShowMessageAlertPopup,
                             setShowLoader,
                             setIntegrationType,
                             integrationType,
                             connectionError,
                             shopifyStores,
                             setShopifyStores,
                             redirectedType,
                             setStoreID,
                             storeID
}) => {

    const [customIconArray, setCustomIconArray] = useState([]);
    const { userLinks, dispatch } = useContext(UserLinksContext);
    const  { pageSettings } = useContext(PageContext);
    const iconRef = createRef(null)
    const [completedIconCrop, setCompletedIconCrop] = useState(null);
    // if a custom icon is selected
    const [iconSelected, setIconSelected] = useState(false);

    //image cropping
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = iconRef;
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 });
    const [customIcon, setCustomIcon] = useState(null);
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(1)

    // Mailchimp integration
    const [lists, setLists] = useState([]);

    const [charactersLeft, setCharactersLeft] = useState();

    //Shopify Integration
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [displayAllProducts, setDisplayAllProducts] = useState(false);
    const [showAddStore, setShowAddStore] = useState(false);

    const [currentLink, setCurrentLink] = useState (
        userLinks.find(function(e) {
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
            type: null,
        }
    );

    useDebounceEffect(
        null,
        completedIconCrop,
        null,
        imgRef,
        previewCanvasRef,
        scale,
        rotate
    )

    useEffect(() => {
        if(currentLink.shopify_products && currentLink.shopify_id) {
            setSelectedProducts(currentLink.shopify_products)
            setIntegrationType("shopify")
        }

        if (currentLink.mailchimp_list_id) {
            setIntegrationType("mailchimp")
        }
    },[])

    useEffect(() => {
        if(currentLink.name) {
            setCharactersLeft(11 - currentLink.name.length);
        } else {
            setCharactersLeft(11);
        }

    },[charactersLeft])

    useEffect(() => {
        if (!customIcon) {
            return
        }
        const objectUrl = URL.createObjectURL(customIcon)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [customIcon]);

    const selectCustomIcon = async (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            return;
        }

        await resizeFile(files[0]).then((image) => {
            createImage(image, setUpImg);
            setCrop(undefined)
            setIconSelected(true);
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // check if more another mailchimp form already exists.
        if (checkForMailchimpForm() === undefined || !checkForMailchimpForm() || integrationType === "shopify") {

            if (iconSelected) {

                const image = getFileToUpload(previewCanvasRef?.current)
                image.then((value) => {
                    submitWithCustomIcon(value);
                })


            } else {

                let URL = currentLink.url;

                let packets;

                switch (integrationType) {
                    case "mailchimp":
                        packets = {
                            name: currentLink.name,
                            mailchimp_list_id: currentLink.mailchimp_list_id,
                            icon: currentLink.icon,
                            page_id: pageSettings["id"],
                            type: "mailchimp",
                        };
                        break;
                    case "shopify":
                        packets = {
                            name: currentLink.name,
                            shopify_products: currentLink.shopify_products,
                            shopify_id: currentLink.shopify_id,
                            icon: currentLink.icon,
                            page_id: pageSettings["id"],
                            type: "shopify",
                        };
                        break;
                }

                const func = editID ? updateLink(packets, editID) : addLink(packets);

                func.then((data) => {

                    if (data.success) {

                        if (editID) {
                            dispatch({
                                type: LINKS_ACTIONS.UPDATE_LINK,
                                payload: {
                                    editID: editID,
                                    currentLink: currentLink,
                                    url: URL,
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
                                type: currentLink.type,
                                mailchimp_list_id: currentLink.mailchimp_list_id,
                                shopify_products: currentLink.shopify_products,
                                shopify_id: currentLink.shopify_id,
                                icon: currentLink.icon,
                                position: data.position,
                                active_status: true
                            }

                            dispatch({
                                type: LINKS_ACTIONS.SET_LINKS,
                                payload: {
                                    links: newLinks.concat(
                                        newLinkObject)
                                }
                            })
                        }

                        setCurrentLink({});
                        setAccordionValue(null);
                        setShowLinkForm(false);
                        setIntegrationType(null);
                        setEditID(null);
                        setStoreID(0);
                    }
                })
            }
        } else {
            setShowMessageAlertPopup({
                show: true,
                text: "Only 1 Mailchimp subscribe form is allowed per page."
            });
        }
    };

    const submitWithCustomIcon = (image) => {

        if(currentLink.name &&
            (
                currentLink.mailchimp_list_id ||
                currentLink.shopify_products
            )
        ) {

            setShowLoader({show: true, icon: "upload", position: "fixed"})
            window.Vapor.store(
                image,
                {
                    visibility: "public-read",
                    progress: progress => {
                        setShowLoader(prev => ({
                            ...prev,
                            progress: Math.round(progress * 100)
                        }))
                    }
                }
            ).then(response => {

                let URL = currentLink.url;
                if (URL) {
                    URL = checkURL(currentLink.url, null, true);
                }

                let packets;

                switch (integrationType) {
                    case "mailchimp":
                        packets = {
                            name: currentLink.name,
                            mailchimp_list_id: currentLink.mailchimp_list_id,
                            icon: response.key,
                            page_id: pageSettings["id"],
                            ext: response.extension,
                            type: "mailchimp",
                        };
                        break;
                    case "shopify":
                        packets = {
                            name: currentLink.name,
                            shopify_products: currentLink.shopify_products,
                            shopify_id: currentLink.shopify_id,
                            icon: response.key,
                            page_id: pageSettings["id"],
                            ext: response.extension,
                            type: "shopify",
                        };
                        break;
                }

                const func = editID ? updateLink(packets, editID) : addLink(packets);

                func.then((data) => {

                    if (data.success) {

                        const iconPath = data.iconPath;

                        if (editID) {
                            dispatch({
                                type: LINKS_ACTIONS.UPDATE_LINK,
                                payload: {
                                    editID: editID,
                                    currentLink: currentLink,
                                    url: URL,
                                    iconPath: iconPath
                                }})

                        } else {
                            let newLinks = [...userLinks];

                            const newLinkObject = {
                                id: data.link_id,
                                name: currentLink.name,
                                url: URL,
                                email: currentLink.email,
                                phone: currentLink.phone,
                                type: currentLink.type,
                                mailchimp_list_id: currentLink.mailchimp_list_id,
                                shopify_products: currentLink.shopify_products,
                                shopify_id: currentLink.shopify_id,
                                icon: iconPath,
                                position: data.position,
                                active_status: true
                            }

                            dispatch({
                                type: LINKS_ACTIONS.SET_LINKS,
                                payload: {
                                    links: newLinks.concat(newLinkObject)
                                }})
                        }

                        setCustomIconArray(customIconArray => [
                            ...customIconArray,
                            iconPath
                        ]);

                        setShowLinkForm(false);
                        setAccordionValue(null);
                        setEditID(null)
                        setIntegrationType(null);
                        setCurrentLink({})

                    }
                    setShowLoader({show: false, icon: null, progress: null});
                })

            }).catch(error => {
                console.error(error);
                EventBus.dispatch("error", { message: "There was an error saving your image." });
                setShowLoader({show: false, icon: null, progress: null});
            });
        } else {
            EventBus.dispatch("error", { message: "Icon Destination and Name is Required" });
        }
    }

    const handleLinkName = useCallback ( (e) => {
        let value = e.target.value;
        setCharactersLeft(11 - value.length);

        setCurrentLink((prevState) => ({
            ...prevState,
            name: value
        }))
    },[])

    const checkForMailchimpForm = () => {
        const link = userLinks.find(function(e) {
            return e.mailchimp_list_id
        })

        if(link?.id === editID) {
            return false
        }

        return link;
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditID(null);
        setShowLinkForm(false);
        setIntegrationType(null);
        setAccordionValue(null);
        setCompletedIconCrop({});
        setCustomIcon(null)
        setIconSelected(false);
        setUpImg(null);
        setCurrentLink({});
        document.getElementById('left_col_wrap').style.minHeight = "unset";
    }

    return (
        <>
            <IntegrationType
                integrationType={integrationType}
                setIntegrationType={setIntegrationType}
                setShowLoader={setShowLoader}
                setLists={setLists}
                setShopifyStores={setShopifyStores}
                redirectedType={redirectedType}
                setShowAddStore={setShowAddStore}
            />
            {(integrationType === "mailchimp" && isEmpty(lists)) &&
                <MailchimpIntegration
                    connectionError={connectionError}
                    integrationType={integrationType}
                    editID={editID}
                    pageID={pageSettings["id"]}
                />
            }
            {( (integrationType === "shopify" && isEmpty(shopifyStores)) || showAddStore ) &&
                <ShopifyIntegration
                    connectionError={connectionError}
                    integrationType={integrationType}
                    editID={editID}
                    showAddStore={showAddStore}
                    setShowAddStore={setShowAddStore}
                    pageID={pageSettings["id"]}
                />
            }
            {   (integrationType === "mailchimp" && !isEmpty(lists)) ||
                (integrationType === "shopify" && !isEmpty(shopifyStores) && !showAddStore ) ?

                <form onSubmit={handleSubmit} className="link_form">
                    <div className="my_row">

                        {iconSelected &&
                            <div className="crop_section">
                                <p>Crop Icon</p>
                                <CropTools
                                    rotate={rotate}
                                    setRotate={setRotate}
                                    scale={scale}
                                    setScale={setScale}
                                />
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    onComplete={(c) => setCompletedIconCrop(c)}
                                    aspect={aspect}
                                >
                                    <img
                                        onLoad={(e) => onImageLoad(e, aspect, setCrop)}
                                        src={upImg}
                                        ref={imgRef}
                                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                        alt="Crop Me"/>
                                </ReactCrop>
                                <div className="icon_col">
                                    <p>Icon Preview</p>
                                    <canvas
                                        ref={previewCanvasRef}
                                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                        style={{
                                            backgroundSize: `cover`,
                                            backgroundRepeat: `no-repeat`,
                                            width: iconSelected ? `100%` : 0,
                                            height: iconSelected ? `100%` : 0,
                                            borderRadius: `20px`,
                                        }}
                                    />
                                </div>
                            </div>
                        }

                        {!displayAllProducts &&
                            <div className="icon_row">
                                <div className="icon_box">

                                    <div className="uploader">
                                        <label htmlFor="custom_icon_upload" className="custom text-uppercase button blue">
                                            Upload Image
                                        </label>
                                        <input id="custom_icon_upload" type="file" className="custom" onChange={selectCustomIcon} accept="image/png, image/jpeg, image/jpg, image/gif"/>
                                        <div className="my_row info_text file_types text-center mb-2">
                                            <p className="m-0 char_count w-100 ">Allowed File Types: <span>png, jpg, jpeg, gif</span>
                                            </p>
                                        </div>
                                    </div>

                                    <IconList
                                        currentLink={currentLink}
                                        setCurrentLink={setCurrentLink}
                                        accordionValue={accordionValue}
                                        setCharactersLeft={setCharactersLeft}
                                        integrationType={integrationType}
                                        editID={editID}
                                        customIconArray={customIconArray}
                                        setCustomIconArray={setCustomIconArray}
                                        redirectedType={redirectedType}
                                    />

                                </div>
                            </div>
                        }

                    </div>
                    {!displayAllProducts &&

                        <div className="my_row mt-4">
                            <div className="input_wrap">
                                <input
                                    className={currentLink.name !== "" ? "active" : ""}
                                    name="name"
                                    type="text"
                                    value={currentLink.name ||
                                        ""}
                                    onChange={(e) => handleLinkName(e)}
                                    onFocus={(e) => HandleFocus(e.target)}
                                    onBlur={(e) => HandleBlur(e.target)}
                                />
                                <label>Link Name</label>
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

                    }
                    <div className="my_row my-4">

                        {integrationType === "mailchimp" ?
                            <MailchimpLists
                                lists={lists}
                                setLists={setLists}
                                currentLink={currentLink}
                                setCurrentLink={setCurrentLink}
                                setIntegrationType={setIntegrationType}
                            />
                            :
                            ""
                        }

                        {integrationType === "shopify" &&
                            <div className="my_row products_wrap">
                                {displayAllProducts ?
                                    <AllProducts
                                        selectedProducts={selectedProducts}
                                        setSelectedProducts={setSelectedProducts}
                                        allProducts={allProducts}
                                        setDisplayAllProducts={setDisplayAllProducts}
                                        setCurrentLink={setCurrentLink}
                                    />

                                    :
                                    <>
                                        <StoreDropdown
                                            currentLink={currentLink}
                                            setCurrentLink={setCurrentLink}
                                            setSelectedProducts={setSelectedProducts}
                                            setShowAddStore={setShowAddStore}
                                            shopifyStores={shopifyStores}
                                            storeID={storeID}
                                        />
                                        <SelectedProducts
                                            currentLink={currentLink}
                                            setDisplayAllProducts={setDisplayAllProducts}
                                            setAllProducts={setAllProducts}
                                            setShowLoader={setShowLoader}
                                            storeID={storeID}
                                        />
                                    </>
                                }
                            </div>
                        }

                    </div>

                    {!displayAllProducts &&
                        <div className="my_row button_row">
                            <button className="button green" type="submit">
                                Save
                            </button>
                            <a href="#" className="button transparent gray" onClick={(e) => handleCancel(e)}>
                                Cancel
                            </a>
                            <a className="help_link" href="mailto:help@link.pro">Need Help?</a>
                        </div>
                    }
                </form>
                :
                ""
            }

        </>
    );
};

export default IntegrationForm;
