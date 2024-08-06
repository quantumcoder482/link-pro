import React, {useState} from 'react';
import {FiThumbsDown, FiThumbsUp} from 'react-icons/fi';
import {addPage} from '@/Services/PageRequests.jsx';
import {router} from '@inertiajs/react';
//import SocialMediaForms from './SocialMediaForms';

const CreatePageForm = ({pageNames}) => {

    const [newPageName, setNewPageName] = useState(null);
    const [available, setAvailability] = useState(false);
    const [regexMatch, setRegexMatch] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (available) {
            const packets = {
                name: newPageName,
                createPage: true,
            };

            addPage(packets).then((data) => {

                if (data.success) {
                    router.get('/plans?type=register');
                }
            })
        }
    };

    const checkPageName = (e) => {
        let value = e.target.value.toLowerCase();
        const match = pageNames.indexOf(value);

        const regex = /^[A-Za-z0-9-_.]+$/;
        setRegexMatch(regex.test(value));

        if (match < 0 && value.length > 2 && regex.test(value)) {
            setAvailability(true);
        } else {
            setAvailability(false);
        }

        setNewPageName(value)
    }

    return (

        <form className="new_page" onSubmit={handleSubmit}>
            <div className="flex justify-center items-start link_name">
                {!regexMatch &&
                    <p className="status not_available char_message register_page">Only letters, numbers, dashes, underscores, periods allowed</p>
                }
                <span className="pt-1 label">Link.pro/</span>
                <div className="input_wrap relative">
                    <input className="animate"
                           name="name"
                           type="text"
                           onChange={ checkPageName }
                           onKeyDown={ event => {
                               if(event.key === 'Enter') {
                                   handleSubmit(event);
                               }
                           }}
                           required
                    />
                    <label>Link Name</label>
                    {available ?
                        <a className="submit_circle" href="#"
                           onClick={(e) => handleSubmit(e)}
                        >
                            <FiThumbsUp/>
                        </a>
                        :
                        <span className="cancel_icon">
                             <FiThumbsDown/>
                        </span>

                    }
                    <p className="status">{available ?
                        "Available" :
                        <span className="status not_available">Not Available</span>}
                    </p>
                </div>
            </div>
            <div className="my_row button_row">
                <button className="button blue" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default CreatePageForm;
