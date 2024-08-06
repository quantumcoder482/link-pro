import React from 'react';

const FormButtons = () => {

    return (
        <div className="my_row button_row">
            <a href="/plans" className="button transparent gray">
                Skip
            </a>
            <button className="button blue" type="submit">
                Continue
            </button>
        </div>

    );
};

export default FormButtons;
