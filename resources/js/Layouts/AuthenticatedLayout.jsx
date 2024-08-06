import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import ProfileMenu from '@/Components/ProfileMenu.jsx';
import Menu from '@/Menu/Menu.jsx';
import AuthenticatedFooter from '@/Layouts/AuthenticatedFooter.jsx';
import InputAnimations from '@/Utils/InputAnimations.jsx';

export default function Authenticated({ children }) {

    return (
        <div id="app_wrap" className="member">
            <InputAnimations />
            <div className="my_row">
                <Menu />
                <header className="my_row nav_row">
                    <nav>
                        <div className="container">
                            <div className="content_wrap">
                                <div className="left_column">
                                    <Link className="logo" href={ route('dashboard')}>
                                        <h1>
                                            <ApplicationLogo />
                                        </h1>
                                    </Link>
                                </div>
                                <div className="right_column">
                                    <ProfileMenu />
                                </div>

                            </div>
                        </div>
                    </nav>
                </header>

                <main>{children}</main>
                <AuthenticatedFooter />
            </div>
        </div>
    );
}
