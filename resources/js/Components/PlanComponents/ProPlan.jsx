import React from 'react';

const ProPlan = ({
                     clickMethod,
                     type,
                     isCurrent=false
}) => {
    return (
        <div className="column pro">
            <h2 className="text-uppercase">Pro</h2>
            <ul>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                    </svg>
                    <p>Free Features PLUS</p>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                    </svg>
                    <p>Unlimited Icons</p>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                    </svg>
                    <p>Custom Icons</p>
                </li>
            </ul>
            <div className="pricing">
                <h3 className="price">
                    <sup>$</sup>4.99<span>/ mo</span></h3>
            </div>
            <div className="button_row">
                {isCurrent ?
                    <span className="button disabled">Current</span> :

                    type === 'purchase' ?
                        <a className="button blue_gradient" href="#" onClick={(e) => clickMethod(
                            e, 'purchase', 'pro')}>
                            Get Pro
                        </a>
                        :
                        <a href="#"
                           className="button blue_gradient confirm_change_plan"
                           data-level="pro"
                           onClick={(e) => clickMethod(e, 'changePlan')}
                        >
                            Downgrade To Pro
                        </a>
                }

            </div>
        </div>
    );
};

export default ProPlan;
