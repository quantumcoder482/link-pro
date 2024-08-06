import React, {useState} from 'react';
import addLink from '../../../Services/LinksRequest';
import FormButtons from './FormButtons';

const Instagram = ({setStep, pageId}) => {

    const [igUser, setIgUser] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const packets = {
            name: "Instagram",
            url: "https://www.instagram.com/" + igUser,
            icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Instagram.png",
            page_id: pageId,
            folder_id: null,
        };
        addLink(packets)
        .then((data) => {
            if(data.success) {
                setStep("twitter")
            }
        })
    }

    return (
        <>
            <div className="mb-4">
                <h3>Add Your Instagram account</h3>
            </div>
            <div className="card-body">
                <div className="form_wrap">
                    <form className="new_page" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center align-items-flex-start link_name">
                            <label className="pt-1">instagram.com/</label>
                            <div className="input_wrap">
                                <input name="name"
                                       type="text"
                                       placeholder="Instagram Username"
                                       onChange={(e) => setIgUser(e.target.value) }
                                       onKeyDown={ event => {
                                           if(event.key === 'Enter') {
                                               handleSubmit(event);
                                           }
                                       }}
                                       value={igUser}
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

export default Instagram;
