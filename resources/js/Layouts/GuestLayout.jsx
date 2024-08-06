import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import GuestFooter from '@/Layouts/GuestFooter.jsx';
import InputAnimations from '@/Utils/InputAnimations.jsx';
import {useEffect, useState} from 'react';

export default function Guest({ children, ...props }) {

    const {course} = props;

    const loginUrl = course ? "/" + course.slug : "";

    const [linkClasses, setLinkClasses] = useState("");

    useEffect(() => {

        if(window.innerWidth < 550) {
            setLinkClasses("");
        } else {
            setLinkClasses("button transparent");
        }

    },[])

    useEffect(() => {

        function setMobileClasses() {

            if(window.innerWidth < 550) {
                setLinkClasses("");
            } else {
                setLinkClasses("button transparent");
            }
        }

        window.addEventListener('resize', setMobileClasses);

        return () => {
            window.removeEventListener('resize', setMobileClasses);
        }

    }, []);

    return (
        <div className="guest min-h-screen flex flex-col items-center">
            <InputAnimations />
            <header className="guest_header w-full">
                <div className="column left">
                    <h1>
                        <Link href="/">
                            <ApplicationLogo />
                        </Link>
                    </h1>
                </div>
                <div className="column right mt-4 sm:mt-0">
                    <Link href={loginUrl + "/login"}>Log In</Link>
                    <Link href={route('contact')}>Contact Us</Link>
                    <Link className={linkClasses} href={route('register')}>Sign Up</Link>
                </div>
            </header>
            <main className="w-full">
                {children}
            </main>
            <GuestFooter />
        </div>
    );
}
