import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
import {isEmpty} from 'lodash';
import ColumnComponent from '@/Pages/AllCourses/ColumnComponent.jsx';

const Courses = ({purchasedCourses, unPurchasedCourses}) => {

    return (
        <AuthenticatedLayout>
            <Head title="Courses" />
            <div className="creator course_creator">
                <div id="links_page" className="live_page course">
                    <div className="my_row courses_grid all_courses">
                        <div className="container">
                            {!isEmpty(purchasedCourses) &&
                                <section className="section_wrap my_row">
                                    <h2 className="page_title">Your Courses</h2>
                                    <div className="sections">
                                        {purchasedCourses.map((course) => {

                                            return (

                                               <ColumnComponent
                                                   key={course.id}
                                                   course={course}
                                                   type="purchased"
                                               />
                                            )
                                        })}
                                    </div>
                                </section>
                            }
                            <section className="section_wrap my_row">
                                <h2 className="page_title">Available Courses</h2>
                                <div className="sections">

                                    {unPurchasedCourses.map((course) => {

                                        return (
                                            <ColumnComponent
                                                key={course.id}
                                                course={course}
                                                type="available"
                                            />
                                        )
                                    })}

                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

export default Courses;
