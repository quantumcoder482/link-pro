import React, {useState} from 'react';
import FormButtons from './FormButtons';
import addLink from '../../../Services/LinksRequest';

const Facebook = ({setStep, pageId}) => {

    const [facebookUser, setFacebookUser] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const packets = {
            name: "Facebook",
            url: "https://facebook.com/" + facebookUser,
            icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Facebook.png",
            page_id: pageId,
            folder_id: null,
        };
        addLink(packets)
        .then((data) => {
            if(data.success) {
                setStep("instagram")
            }
        })
    }

    return (
        <>
            <div className="mb-4">
                <h3>Add Your Facebook account</h3>
            </div>
            <div className="card-body">
                <div className="form_wrap">
                    <form className="register_page my_row" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center align-items-flex-start link_name">
                            <label className="pt-1">facebook.com/</label>
                            <div className="input_wrap">
                                <input name="name"
                                       type="text"
                                       placeholder="Facebook Username"
                                       onChange={(e) => setFacebookUser(e.target.value) }
                                       onKeyDown={ event => {
                                           if(event.key === 'Enter') {
                                               handleSubmit(event);
                                           }
                                       }}
                                       value={facebookUser}
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

export default Facebook;
