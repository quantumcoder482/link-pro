import React from 'react';
import {Link} from '@inertiajs/react';

const GuestFooter = () => {
    return (
        <footer>
            <ul>
                <li><Link className="text-sm" href={route('how-it-works')}>How It Works</Link></li>
                <li><Link className="text-sm" href={route('login')}>Login</Link></li>
                <li><Link className="text-sm" href={route('register')}>Sign Up</Link></li>
                <li><Link className="text-sm" href={route('contact')}>Contact Us</Link></li>
            </ul>

            <p><small><Link href={route('terms')}>Terms And Conditions</Link> | <Link href={route('privacy')}>Privacy Policy</Link></small></p>
            <small>&copy; Copyright LinkPro LLC | All Rights Reserved </small>
        </footer>

    );
};

export default GuestFooter;
