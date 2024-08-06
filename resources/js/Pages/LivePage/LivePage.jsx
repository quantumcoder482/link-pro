import React, {useEffect, useState} from 'react';
import {Head} from '@inertiajs/react';
import {checkIcon} from '@/Services/UserService.jsx';
import Folder from '@/Components/LinkComponents/Folder.jsx';
import SubscribeForm from '@/Components/LinkComponents/SubscribeForm.jsx';
import StoreProducts from '@/Components/LinkComponents/StoreProducts.jsx';
import AccordionLinks from '@/Components/LinkComponents/AccordionLinks.jsx';
import {TrackIconClick} from '@/Services/TrackClicks.jsx';
import AdvancedIcon from '@/Components/LinkComponents/AdvancedIcon.jsx';
import IconDescription from '@/Components/LinkComponents/IconDescription.jsx';

function LivePage({links, page, subscribed}) {

    const {user_id, header_img, profile_layout, profile_img, title, bio, name} = page;

    const [headerStyle, setHeaderStyle] = useState({});
    const [iconCount, setIconCount] = useState(null);
    const [row, setRow] = useState(null);
    const [value, setValue] = useState({
        index: null,
        url: null
    });
    const [clickType, setClickType] = useState(null);

    useEffect(() => {
        if(header_img) {
            setHeaderStyle({
                background: 'url(' + header_img + ') no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom'
            })
        }
    },[])

    useEffect(() => {

        if (subscribed) {
            setIconCount(links.length)
        } else {
            setIconCount(8);
        }

    }, []);

    const accordionLinks = value.index ? links[value.index].links : null;
    const mailchimpListId = value.index ? links[value.index].mailchimp_list_id : null;
    const storeProducts = value.index ? links[value.index].shopify_products : null;
    const description = value.index ? links[value.index].description : null;

    return (
        <main className="py-4">
            <Head title={name}/>
            <div id="links_page">
                <div className="links_col my_row">
                    <div className="links_wrap live_page h-full">
                        <div className="inner_content live_page">
                            <div className={`page_header ${!header_img ? "default" : ""} `} style={headerStyle}>
                                {!header_img &&
                                    <img src={ Vapor.asset( 'images/default-img.png' ) } alt="Header Image" />
                                }
                            </div>
                            <div id={profile_layout} className="profile_content">
                                <div className={`profile_img_column ${!profile_img ? "default" : "" }`}>
                                    <div className="profile_image">
                                        <div className="image_wrap">
                                            <img src={profile_img || Vapor.asset( 'images/default-img.png' )} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile_text">
                                    {title && <h2>{title}</h2>}
                                    {bio && <p>{bio}</p>}
                                </div>
                                <div className="icons_wrap main">
                                    {links.slice(0, iconCount).map((linkItem, index) => {
                                        let {
                                            id,
                                            type,
                                            name,
                                            url,
                                            email,
                                            phone,
                                            icon,
                                            active_status,
                                            links
                                        } = linkItem;

                                        if (email) {
                                            url = "mailto:" + email;
                                        } else if (phone) {
                                            url = "tel:" + phone;
                                            if(icon.includes("Facetime")) {
                                                url = 'facetime:' + phone;
                                            }
                                        }

                                        const dataRow = Math.ceil((index + 1) / 4);

                                        let displayIcon = null;
                                        if(type !== "folder") {
                                            displayIcon = checkIcon(icon, "preview", subscribed);
                                        }

                                        let colClasses = "";
                                        if (type === "folder" || type === "mailchimp" || type === "shopify" || type === "advanced") {
                                            colClasses = "icon_col folder";
                                        } else {
                                            colClasses = "icon_col";
                                        }

                                        return (
                                            <React.Fragment key={index}>
                                                {(() => {
                                                    switch (type) {
                                                        case "folder":
                                                            return ( active_status && subscribed ?
                                                                <Folder
                                                                    id={id}
                                                                    colClasses={colClasses}
                                                                    mainIndex={index}
                                                                    links={links}
                                                                    setRow={setRow}
                                                                    value={value}
                                                                    setValue={setValue}
                                                                    dataRow={dataRow}
                                                                    name={name}
                                                                    clickType={clickType}
                                                                    setClickType={setClickType}
                                                                    subStatus={subscribed}
                                                                    viewType="live"
                                                                />
                                                                :
                                                                subscribed &&
                                                                <div className={` ${colClasses} `}>
                                                                </div>
                                                            )
                                                        case "standard":
                                                        case "offer":
                                                        case "url":
                                                        case "email":
                                                        case "phone":
                                                            return (
                                                                <div className={` ${colClasses} `}>
                                                                    {active_status ?
                                                                        <>
                                                                            <a className={!url || !displayIcon ? "default" : ""}
                                                                               target="_blank"
                                                                               href={url || "#"}
                                                                               onClick={(e) => TrackIconClick(id)}
                                                                            >
                                                                                <img src={displayIcon} alt=""/>
                                                                            </a>
                                                                            <p>
                                                                                {name?.length > 11 ? name.substring(0, 11) + "..."
                                                                                    : name || "Link Name"
                                                                                }
                                                                            </p>
                                                                        </>
                                                                        :
                                                                        ""
                                                                    }
                                                                </div>
                                                            )
                                                        case "mailchimp":
                                                        case "shopify":
                                                        case "advanced":
                                                            return (
                                                                <AdvancedIcon
                                                                    id={id}
                                                                    colClasses={colClasses}
                                                                    displayIcon={displayIcon}
                                                                    name={name}
                                                                    active_status={active_status}
                                                                    dataRow={dataRow}
                                                                    mainIndex={index}
                                                                    setRow={setRow}
                                                                    value={value}
                                                                    setValue={setValue}
                                                                    url={url}
                                                                    index={index}
                                                                    setClickType={setClickType}
                                                                    clickType={clickType}
                                                                    type={type}
                                                                    viewType="live"
                                                                />
                                                            )
                                                    }
                                                })()}

                                                {subscribed && ( (index + 1) % 4 === 0 || index + 1 === iconCount) ?
                                                    (() => {
                                                        switch (clickType) {
                                                            case "mailchimp":
                                                                return (
                                                                    <SubscribeForm
                                                                        dataRow={dataRow}
                                                                        row={row}
                                                                        mailchimpListId={mailchimpListId}
                                                                        userId={user_id}
                                                                    />
                                                                )
                                                            case "shopify":
                                                                return (
                                                                    <StoreProducts
                                                                        dataRow={dataRow}
                                                                        row={row}
                                                                        storeProducts={storeProducts}
                                                                    />
                                                                )
                                                            case "advanced":
                                                                return (
                                                                    <IconDescription
                                                                        id={id}
                                                                        dataRow={dataRow}
                                                                        row={row}
                                                                        description={description}
                                                                        url={value.url}
                                                                        viewType="live"
                                                                    />
                                                                )
                                                            case "folder":
                                                                return (
                                                                    <div className={`my_row folder ${dataRow == row ? "open" : ""}`}>
                                                                        <div className="icons_wrap inner">

                                                                            {accordionLinks?.map((innerLinkFull, index) => {
                                                                                return (
                                                                                    <AccordionLinks
                                                                                        key={index}
                                                                                        icons={innerLinkFull}
                                                                                        subStatus={subscribed}
                                                                                        viewType="live"
                                                                                    />
                                                                                )
                                                                            })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                        }
                                                    })()
                                                    :
                                                    ""
                                                }

                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="my_row user_page_footer">
                <div className="image_wrap">
                    <a href={ route('register') }>
                        <p>Powered By</p>
                        <img src={ Vapor.asset('images/logo.png') } alt="Link Pro" />
                    </a>
                </div>
            </div>
        </main>
    );
}

export default LivePage;
