import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth }) {

    return (
        <GuestLayout>
            <Head title="Home" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="guest_home">
                    <section className="two_col top">
                        <div className="col">
                            <h2>Unite Your Audience!</h2>
                            <h3>Infinite Possibilities.</h3>
                            <p>Connect your followers across all platforms and turn your following into revenue!</p>
                            <div id="mobile_video" className="col mobile">
                            </div>
                            <div className="bottom_row my_row">
                                <Link className="button blue" href={route('register')}>Sign up free</Link>
                                <p><em><strong>Already on LinkPro?</strong></em>
                                    <Link href={route('login')}> Log In</Link>
                                </p>
                            </div>
                        </div>
                        <div id="desktop_video" className="col desktop">
                            <div className="video_wrap">
                                <video autoPlay loop muted playsInline>
                                    <source src={Vapor.asset('videos/home-image-loop-top-2.mp4')} type="video/mp4" />
                                        <source src={Vapor.asset('videos/home-image-loop-top-2.webm')} type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </section>

                    <section className="two_col social_media">
                        <div className="col left">
                            <div className="video_wrap">
                                <video autoPlay loop muted playsInline>
                                    <source src={Vapor.asset('videos/home-image-loop-bottom.mp4')} type="video/mp4" />
                                    <source src={Vapor.asset('videos/home-image-loop-bottom.webm')} type="video/webm" />
                                </video>
                            </div>
                        </div>
                        <div className="col">
                            <h2>Link Your Platforms</h2>
                            <p>Post your exclusive LinkPro link on all of your social media accounts. Cross all of your platforms to skyrocket your brand.</p>
                        </div>
                    </section>

                    <section className="two_col laptop">
                        <div className="col">
                            <h2>Get Down To Business</h2>
                            <p>LinkPro is all about business. We're in this to build all of our clients bottom line. Join Today to let LinkPro help you leverage the intersection of media & business to kick your revenue into gear.</p>
                        </div>
                        <div className="col right">
                            <img src={Vapor.asset('images/laptop-image.png')} alt="" />
                        </div>
                    </section>

                    <section className="two_col phone">
                        <div className="col left">
                            <img src={Vapor.asset('images/img-phone.png')} alt="" />
                        </div>
                        <div className="col">
                            <h2>Self-Managed Platform</h2>
                            <p>LinkPro allows you to create your own private link, add a profile & background image, and create buttons to link all of your social media and business accounts in one place.</p>
                        </div>
                    </section>

                    <section className="two_col bottom">
                        <div className="col">
                            <h2>Cross Promote To Increase Revenue</h2>
                            <p>Contact Us to discuss how LinkPro will work directly with you to cross promote other products & services to increase your bottom line. Get paid every week for all revenue generated from our partners.</p>
                        </div>
                        <div className="col right">
                            <img src={Vapor.asset('images/bottom-image.png')} alt="" />
                        </div>
                    </section>
                </div>
            </div>
        </GuestLayout>
    );
}
