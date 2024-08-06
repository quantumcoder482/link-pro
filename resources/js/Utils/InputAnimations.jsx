import React, {useEffect} from 'react';

export const HandleFocus = (element) => {
    return element.classList.add('active');
};

export const HandleBlur = (element) => {
    if (element.value === "") {
        return element.classList.remove('active');
    }
}

const InputAnimations = () => {

    useEffect(() => {
        const inputs = document.querySelectorAll('input.animate');

        if (inputs.length > 0) {
            inputs.forEach((inputEl) => {
                if (document.activeElement === inputEl) {
                    inputEl.classList.add('active')
                }
                inputEl.addEventListener('focus', () => {
                    inputEl.classList.add('active')
                })
                inputEl.addEventListener('blur', () => {
                    if (inputEl.value === "") {
                        inputEl.classList.remove('active')
                    }
                })

                if (inputEl.value !== "") {
                    inputEl.classList.add('active')
                }
            });
        }

        const textAreas = document.querySelectorAll('textarea.animate');
        if (textAreas.length > 0) {
            textAreas.forEach((inputEl) => {
                if (document.activeElement === inputEl) {
                    inputEl.classList.add('active')
                }
                inputEl.addEventListener('focus', () => {
                    inputEl.classList.add('active')
                })
                inputEl.addEventListener('blur', () => {
                    if (inputEl.value === "") {
                        inputEl.classList.remove('active')
                    }

                })

                if (inputEl.value !== "") {
                    inputEl.classList.add('active')
                }
            });
        }
    },[])

    return (
        <>
        </>
    );
};

export default InputAnimations;
