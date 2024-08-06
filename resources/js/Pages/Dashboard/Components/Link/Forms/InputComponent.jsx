import React, {useState, useEffect} from 'react';
import {HandleBlur, HandleFocus} from '@/Utils/InputAnimations.jsx';

const InputComponent = ({
                            currentLink,
                            setCurrentLink,
                            inputType,
                            setInputType,
}) => {

    const {url, email, phone} = currentLink;

    const [inputValues, setInputValues] = useState({
        name: null,
        type: null,
        value: null,
        placeholder: null,
        key: null
    })

    useEffect(() => {

        let currentInputType;

        if(url) {
            currentInputType = "url";
        } else if(email) {
            currentInputType = "email";
        } else if(phone) {
            currentInputType = "phone";
        } else {
            currentInputType = "url";
        }

        setInputType(currentInputType)
        setCurrentLink((prev) => ({
            ...prev,
            type:currentInputType
        }));

    },[])

    useEffect(() => {

        switch (inputType) {

            case 'url':
                setInputValues({
                    name: "url",
                    type: "text",
                    value: url || "",
                    placeholder: "https://linkurl.com",
                    key: "url"
                })
                break;
            case 'email':
                setInputValues({
                    name: "email",
                    type: "email",
                    value: email || "",
                    placeholder: "example@example.com",
                    key: "email"
                })
                break;
            case 'phone':
                setInputValues({
                    name: "phone",
                    type: "tel",
                    value: phone || "",
                    placeholder: "xxx-xxx-xxxx",
                    key: "phone"
                })
                break;
            default:
                setInputValues({
                    name: "url",
                    type: "text",
                    value: url || "",
                    placeholder: "https://linkurl.com",
                    key: "url"
                })
                break;
        }


    }, [inputType, currentLink]);

    const handleChange = (e, key) => {

        let key2;
        let key3;
        let iconType;

        //based on what is being submitted, set the key for current link, all other keys need to be null.
        // ***Key must match Database Column name***

        if (key === "phone") {
            key2 = "email"
            key3 = "url"
            iconType = "phone"
        } else if (key.includes("email")) {
            key2 = "phone"
            key3 = "url"
            iconType = "email"
        } else {
            key2 = "phone"
            key3 = "email"
            iconType = "url"
        }

        setCurrentLink({
            ...currentLink,
            [`${key}`]: e.target?.value || e,
            [`${key2}`]: null,
            [`${key3}`]: null,
            type: iconType
        })
    }

    const {name, type, value, placeholder, key } = inputValues;

    return (

        <div className="my_row relative mt-2">
            <input
                className={value !== "" ? "active" : ""}
                name={name}
                type={type}
                defaultValue={value || ""}
                onChange={(e) => handleChange(e, key)}
                onFocus={(e) => HandleFocus(e.target)}
                onBlur={(e) => HandleBlur(e.target)}
            />
            <label className="text-lowercase">{placeholder}</label>
        </div>

    )
}

export default InputComponent;
