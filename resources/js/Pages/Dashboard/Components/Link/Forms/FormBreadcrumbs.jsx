import React from 'react';
import {BiChevronLeft, BiChevronsLeft} from 'react-icons/bi';

const FormBreadcrumbs = ({
                             folderID,
                             editID,
                             setEditID,
                             setEditFolderID,
                             setAccordionValue,
                             showLinkForm,
                             setShowLinkForm,
                             setIntegrationType,
                             setInputType
}) => {

    return (
        <div className="breadcrumb_links">
            {folderID  ?
                <>
                    {editID || showLinkForm ?
                        <a className="back" href="#"
                           onClick={(e) => {
                               e.preventDefault();
                               setShowLinkForm(false)
                               setEditID(null)
                               setAccordionValue(null);
                           }}
                        >
                            <BiChevronLeft />
                            Folder
                        </a>
                        :
                        ""
                    }
                    <a className="back" href="#"
                       onClick={(e) => {
                           e.preventDefault();
                           setEditFolderID(false);
                           setShowLinkForm(false);
                           setEditID(null);
                           setAccordionValue(null);
                       }}
                    >
                        <BiChevronsLeft />
                        Icons
                    </a>
                </>
                :
                <a className="back" href="#"
                   onClick={(e) => {
                       e.preventDefault();
                       setShowLinkForm(false)
                       setEditID(null)
                       setEditFolderID(false)
                       setIntegrationType(null)
                       setInputType(null)
                       setAccordionValue(null);
                   }}
                >
                    <BiChevronLeft />
                    Back To Icons
                </a>
            }
        </div>
    );
};

export default FormBreadcrumbs;
