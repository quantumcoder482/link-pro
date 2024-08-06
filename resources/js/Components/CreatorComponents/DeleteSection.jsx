import React from 'react';
import {deleteSection} from '@/Services/CreatorRequests.jsx';

const DeleteSection = ({
                           id,
                           sections,
                           setSections,
                           setOpenIndex,
                           url
}) => {

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setOpenIndex([]);

        const newSectionsArray = sections.filter((section) => {
            return section.id !== id;
        });

        const packets = {
            sections: newSectionsArray
        }

        deleteSection(packets, url)
        .then((response) => {
            if(response.success) {
                setSections(newSectionsArray)
            }
        })
    }

    return (
        <a className="button red ml-auto" href="#"
           onClick={(e) => handleDeleteClick(e)}>
            Delete Section
        </a>
    );
};

export default DeleteSection;
