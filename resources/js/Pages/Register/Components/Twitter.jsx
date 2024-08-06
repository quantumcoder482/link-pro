import React, {useState} from 'react';
import FormButtons from './FormButtons';
import addLink from '../../../Services/LinksRequest';

const Twitter = ({setStep, pageId}) => {

    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const packets = {
            name: "Twitter",
            url: "https://twitter.com/" + username,
            icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Twitter.png",
            page_id: pageId,
            folder_id: null,
        };
        addLink(packets)
        .then((data) => {
            if(data.success) {
                setStep("tiktok")
            }
        })
    }

    return (
        <>
            <div className="mb-4">
                <h3>Add Your Twitter account</h3>
            </div>
            <div className="card-body">
                <div className="form_wrap">
                    <form className="new_page" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center align-items-flex-start link_name">
                            <label className="pt-1">twitter.com/</label>
                            <div className="input_wrap">
                                <input name="name"
                                       type="text"
                                       placeholder="Twitter Username"
                                       onChange={(e) => setUsername(e.target.value) }
                                       onKeyDown={ event => {
                                           if(event.key === 'Enter') {
                                               handleSubmit(event);
                                           }
                                       }}
                                       value={username}
                                       required
                                />
                            </div>
                        </div>

                        <FormButtons />

                    </form>
                </div>
            </div>
        </>
    );
};

export default Twitter;
