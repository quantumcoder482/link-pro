import React, {useContext, useState} from 'react';
import {FiThumbsDown, FiThumbsUp} from 'react-icons/fi';
import {PageContext} from '../../Dashboard.jsx';
import {updatePageName} from '@/Services/PageRequests.jsx';
import ToolTipIcon from '@/Utils/ToolTips/ToolTipIcon';

const PageName = ({pageNames}) => {

    const { pageSettings, setPageSettings } = useContext(PageContext);

    const [userPageNames, setUserPageNames] = useState(pageNames);

    const [name, setName] = useState(pageSettings['name']);

    const [available, setAvailability] = useState(true);
    const [currentMatch, setCurrentMatch] = useState(true);
    const [regexMatch, setRegexMatch] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentMatch && available) {

            const packets = {
                name: name,
            };

            updatePageName(packets, pageSettings["id"] )
            .then((data) => {
                if (data.success) {
                    let prevNames = [...userPageNames];

                    prevNames = prevNames.map((item, index) => {
                        if (item === pageSettings['name']) {
                            item = name
                        }
                        return item;
                    })

                    setUserPageNames(prevNames);
                    setPageSettings({
                            ...pageSettings,
                            name: name
                        }
                    )
                    setCurrentMatch(true);

                    if (pageSettings["default"]) {
                        document.querySelector('#username').innerText = name;
                    }
                }
            })
        }
    };

    const checkPageName = (e) => {
        let value = e.target.value.toLowerCase();
        const match = userPageNames.indexOf(value);

        const regex = /^[A-Za-z0-9-_.]+$/;

        setRegexMatch(regex.test(value));
        if (value.length > 2 && value === pageSettings["name"]) {
            setAvailability(true);
            setCurrentMatch(true);
        } else if (match < 0 && value.length > 2 && regex.test(value)) {
            setAvailability(true);
            setCurrentMatch(false);
        } else {
            console.log("last one")
            setAvailability(false);
            setCurrentMatch(false);
        }

        setName(value);
    }

    return (
        <div className="edit_form page_name">
            {!regexMatch &&
                <p className="status not_available char_message">Only letters, numbers, dashes, underscores, periods allowed</p>
            }
            <label>Link.pro/</label>
           <form className="link_name">
                <input name="name" type="text" defaultValue={name}
                       onChange={ checkPageName }
                       onKeyDown={ event => {
                               if(event.key === 'Enter') {
                                   handleSubmit(event);
                               }
                           }
                       }
                       onBlur={(e) => handleSubmit(e)}
                />

               {available ?
                   <div className={"info_text my_row"}>
                       {currentMatch ?
                           <p className="status">Current</p>
                           :
                           <>
                               <a className="submit_circle" href="#"
                                  onClick={(e) => handleSubmit(e)}
                               >
                                   <FiThumbsUp />
                               </a>
                               <p className="status">Available</p>
                           </>
                       }
                   </div>
                   :
                   <div>
                       <span className="cancel_icon">
                           <FiThumbsDown />
                       </span>
                       <div className={"info_text my_row"}>
                           <p className="status not_available">Not Available</p>
                       </div>
                   </div>
               }

           </form>

            <ToolTipIcon section="name" />

        </div>

    );
}


export default PageName;
