import React from 'react';

const PremierPlan = ({clickMethod, type, isCurrent=false}) => {
    return (
        <div className="column premier">
            <h2 className="text-uppercase">Premier</h2>
            <ul>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                    </svg>
                    <p>Pro Features PLUS</p>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                    </svg>
                    <p>Up to 5 Unique Links</p>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                    </svg>
                    <p>Password Protected Links</p>
                </li>
            </ul>
            <div className="pricing">
                <h3 className="price">
                    <sup>$</sup>19.99<span>/ mo</span>
                </h3>
            </div>
            {isCurrent ?
                <span className="button disabled">Current</span> :
                type === 'changePlan' ?
                    <button className="open_popup button black_gradient"
                            onClick={(e) => clickMethod(e, 'premier')}
                    >
                        Upgrade To Premier
                    </button>
                    :
                    <a className="button black_gradient" href="#"
                       onClick={(e) => clickMethod(e, 'purchase', 'premier')}>
                        Go Premier
                    </a>
            }
        </div>
    );
};

export default PremierPlan;
