import React from 'react';

const PageLayout = () => {
    return (
        <div className="container">
            <div className="utility_page mx-auto">
                <h2 className="page_title !mb-10">How It Works</h2>
                <div className="row flex flex-col-reverse md:flex-row gap-5">
                    <div className="column w-full">
                        <div className="image_wrap">
                            <img src={ Vapor.asset('images/how-it-works-step-1.jpg') } alt="" />
                        </div>
                    </div>
                    <div className="column w-full flex flex-col justify-center">
                        <h3 className="column_title">Step 1</h3>
                        <p>Get started by creating your free account with your <strong>email address and password.</strong>
                        </p>
                    </div>
                </div>
                <div className="row flex flex-col md:flex-row">
                    <div className="column w-full flex flex-col justify-center">
                        <h3 className="column_title">Step 2</h3>
                        <p>Choose a link name so followers can find all your <strong>socials, products, and info in one place.</strong>
                        </p>
                    </div>
                    <div className="column w-full">
                        <div className="image_wrap">
                            <img src={ Vapor.asset('images/how-it-works-step-2.jpg') } alt="" />
                        </div>
                    </div>
                </div>
                <div className="row flex flex-col-reverse md:flex-row">
                    <div className="w-full column">
                        <div className="image_wrap">
                            <img src={ Vapor.asset('images/how-it-works-step-3.jpg') } alt="" />
                        </div>
                    </div>
                    <div className="column w-full flex flex-col justify-center">
                        <h3 className="column_title">Step 3</h3>
                        <p>Keep a free account forever or <strong>upgrade for advanced features with Pro,</strong> Premium or Custom.
                        </p>
                    </div>
                </div>
                <div className="row flex flex-col md:flex-row">
                    <div className="column w-full flex flex-col justify-center">
                        <h3 className="column_title">Step 4</h3>
                        <p>Build your page with images, text, icons, and links. <strong>Post your link everywhere!</strong>
                        </p>
                    </div>
                    <div className="column w-full">
                        <div className="image_wrap">
                            <img src={ Vapor.asset('images/how-it-works-step-4.png') } alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
