import React from 'react';
import {
    removeMailchimpConnection
} from '@/Services/UserService.jsx';
import {isEmpty} from 'lodash';

const MailchimpLists = ({
                            currentLink,
                            setCurrentLink,
                            lists,
                            setLists,
                            name,
}) => {

    const handleChange = (e) => {

        setCurrentLink((prev) => ({
            ...prev,
            mailchimp_list_id: e.target.value,
        }));
    }

    const handleClick = (e) => {
        e.preventDefault();

        removeMailchimpConnection().then(
            (data) => {
                if (data.success) {
                    setLists([]);
                    setCurrentLink((prev) => ({
                        ...prev,
                        active_status: 0,
                    }))
                }
            }
        )
    }

    return (
        <>
            <label htmlFor="mailchimp_list_id">Mailchimp List</label>
            <select
                name={name}
                onChange={(e) => handleChange(e)}
                required
                value={currentLink.mailchimp_list_id || undefined}
            >
                <option>Select Your List</option>
                {!isEmpty(lists) && lists?.map((list) => {
                    return (
                        <option
                            key={list.list_id}
                            value={list.list_id}>{list.list_name}
                        </option>
                    )
                })}
            </select>
            {!isEmpty(lists) &&
                <div className="my_row remove_link">
                    <a href="#" onClick={(e) => handleClick(e)}>
                        Remove Connection
                    </a>
                </div>
            }
        </>
    );
};

export default MailchimpLists;
