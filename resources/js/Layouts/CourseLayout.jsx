import React from 'react';
import AuthenticatedFooter from '@/Layouts/AuthenticatedFooter.jsx';
import {isEmpty} from 'lodash';

const CourseLayout = ({auth, children, course}) => {

    return (
        <div id="app_wrap" className={`my_row ${!isEmpty(auth.user.userInfo) ? "member" : ""} landing_page`}>
            <div className="page_content my_row">
                <header className="my_row nav_row" style={{background: course.header_color }}>
                    <nav>
                        <div className="container">
                            <a className="logo" href="/">
                                <h1>
                                    <img src={course.logo || Vapor.asset('images/logo.png') } alt={course.title ?? ''} />
                                </h1>
                            </a>
                            <h2 id="course_title" className="title" style={{ color: course.header_text_color }}>{course.title}</h2>
                        </div>
                    </nav>
                </header>

                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default CourseLayout;
