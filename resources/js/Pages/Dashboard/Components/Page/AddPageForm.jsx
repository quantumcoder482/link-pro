import React, {useState} from 'react';
import {FiThumbsDown, FiThumbsUp} from 'react-icons/fi';
import {addPage} from '@/Services/PageRequests.jsx';

const AddPageForm = ({setIsEditing, setAllUserPages, allUserPages, pageNames}) => {

    const [newPageName, setNewPageName] = useState(null);
    const [available, setAvailability] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const packets = {
            name: newPageName,
        };

        addPage(packets)
        .then((data) => {
            if (data.success) {
                const newElement = {
                    id: data.page_id,
                    name: newPageName,
                };

                let prevPages = [...allUserPages];
                prevPages = prevPages.concat(newElement);
                setAllUserPages(prevPages);
                setIsEditing(false);

                window.location.href = "/dashboard/pages/" + data.page_id;

            }
        })

    };

    const checkPageName = (e) => {
        let value = e.target.value.toLowerCase().replace(/\s/g, '-');
        const match = pageNames.indexOf(value);

        if (match < 0 && value !== "") {
            setAvailability(true);
        } else {
            setAvailability(false);
        }

        setNewPageName(value)
    }

    return (
        <>
            <h3>Choose Your Link Name</h3>
            <form className="new_page" onSubmit={handleSubmit}>
                <input name="name" type="text"
                       placeholder="Link Name"
                       onChange={ checkPageName }
                       onKeyDown={ event => {
                           if(event.key === 'Enter') {
                               handleSubmit(event);
                           }
                       }
                       }
                />

                { available ?
                    <a className="submit_circle" href="#"
                       onClick={(e) => handleSubmit(e)}
                    >
                        <FiThumbsUp />
                    </a>
                    :
                    <a className="cancel_icon" href="#"
                       onClick={(e) => {
                           e.preventDefault();
                           setIsEditing(false);
                       }}
                    >
                        <FiThumbsDown />
                    </a>
                }
                <p className="status">{available ? "Available" : <span className="status not_available">Not Available</span>}</p>
                <div className="my_row button_row">
                    <button className="button green" type="submit">
                        Save
                    </button>
                    <a href="#" className="button transparent gray" onClick={(e) => {e.preventDefault(); setIsEditing(false); }}>
                        Cancel
                    </a>
                </div>
            </form>
        </>
    );
};

export default AddPageForm;
