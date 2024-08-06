import React, {useState} from 'react';
import axios from 'axios';

const SubscribeForm = ({
                           dataRow,
                           row,
                           mailchimpListId,
                           clickType,
                           userId
}) => {

    const [formValue, setFormValue] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {

        e.preventDefault();

        const packets = {
            email: formValue,
            listId: mailchimpListId,
            user: userId
        }

        axios.post("/mailchimp/subscribe", packets)
        .then(
            (response) => {
                const mcResponse = response.data.mcResponse;
                console.log(mcResponse);
                setSuccessful(true);
            }
        )
        .catch((error) => {
            const errorDiv = document.querySelector('#subscribe_error');

            if (error.response !== undefined) {
                const mcResponse = error.response.data.message.split("response:");
                setError(mcResponse[1]);
                errorDiv.innerHTML = "<p>" + mcResponse[1] + "</p>";
                console.error("ERROR:: ", error.response.data.message);
            } else {
                console.error("ERROR:: ", error);
            }

            return {
                success : false,
            }

        });
    }

    return (
        <>
            {mailchimpListId !== undefined &&
                <div className={`my_row folder ${dataRow == row ? "open" : ""}`}>
                    {dataRow == row &&
                        <div className="folder_content">
                            {successful ?
                                <>
                                    <h3>Success!</h3>
                                    <p>Check your email for confirmation and/or a welcome message.</p>
                                </>
                                :
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <h3>Enter Your Email To Subscribe.</h3>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValue}
                                        placeholder="Email Address"
                                        onChange={(e) => setFormValue(e.target.value)}
                                    />
                                    {error &&
                                        <p className="mx-4 !text-red-600">{error}</p>
                                    }
                                    <button className="button blue" type="submit">Submit</button>
                                </form>
                            }
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default SubscribeForm;
