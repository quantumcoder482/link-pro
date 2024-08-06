import React, {useContext, useState} from 'react';
import {MdAddCircleOutline} from 'react-icons/md';
import {FiChevronDown} from 'react-icons/fi';
import {PageContext} from '../../Dashboard.jsx';
import AddPageForm from './AddPageForm';
import {Link} from '@inertiajs/react';

const PageNav = ({
                     allUserPages,
                     setAllUserPages,
                     userSub,
                     subStatus,
                     setShowUpgradePopup,
                     pageNames
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const { pageSettings, setPageSettings } = useContext(PageContext);

    const pageList = allUserPages.filter(element => element.id !== pageSettings["id"]);

    const handleClick = (e) => {
        e.preventDefault();

        const type = e.target.dataset.type

        if (type !== undefined && type === 'disabled') {

            enablePopup("access this link");

        } else if (userSub) {

            const {name} = {...userSub};

            if ( subStatus && name === "premier") {

                if (allUserPages.length === 5) {
                    enablePopup("a custom plan to add more links");
                } else {
                    setIsEditing(true);
                }

            } else {
                enablePopup("add more links");
            }

        } else {
            enablePopup("add more links");
        }
    }

    const enablePopup = (text) => {

        setShowUpgradePopup({
            show: true,
            text: text,
        });
    }

    return (
        <div className="page_menu_row">
            <div className="current_page" id={pageSettings["id"]} key={pageSettings["id"]}>
                <p>{pageSettings["name"]}</p>
            </div>
            <div className="menu_wrap">

                <div className={allUserPages.length > 1 ? "menu_icon add_border" : "menu_icon"}>
                    {allUserPages.length > 1 ?
                        <FiChevronDown/>
                        :
                        <MdAddCircleOutline/>
                    }

                    <div className="menu_content">
                        <ul className="page_menu">
                            <li>
                                <a onClick={(e) => { handleClick(e) }} href="#">Add New Link</a>
                            </li>
                            { pageList.map((page) => {

                                return (
                                    page["disabled"] || !userSub || userSub.name !== "premier" ?
                                        <li key={page["id"]} className="disabled_link" data-type="disabled" onClick={(e) => { handleClick(e) }} >
                                            {page["name"]}
                                        </li>
                                        :
                                        <li id={page["id"]} key={page["id"]}>
                                            <Link href={"/dashboard/pages/" + page["id"]}>{page["name"]}</Link>
                                        </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

            </div>

            {isEditing ?
                <div className="edit_form popup new_page_form">
                    <div className="form_wrap">
                        <AddPageForm
                            setIsEditing={setIsEditing}
                            setAllUserPages={setAllUserPages}
                            allUserPages={allUserPages}
                            pageNames={pageNames}
                        />
                    </div>

                </div>
                :
                ""
            }
        </div>
    );
}

export default PageNav;
