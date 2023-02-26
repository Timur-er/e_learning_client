import React from "react";
import {
    AUTH_PAGE,
    CERTIFICATES,
    COURSE_PAGE, COURSE_STATISTIC,
    COURSE_TEST_PAGE,
    COURSES,
    CREATE_COURSE, DISCOUNT_CODE, FAVOURITES,
    USERS
} from "./consts";
import CoursesPage from "../Pages/CoursesPage/CoursesPage/CoursesPage";
import CertificatesPage from "../Pages/CertificatesPage/CertificatesPage";
import CreateCoursePage from "../Pages/CreateCoursePage/CreateCoursePage";
import CoursePage from "../Pages/CoursePage/CoursePage";
import CourseTestPage from "../Pages/CourseTestPage/CourseTestPage";
import AuthPage from "../Pages/AuthPage/AuthPage";
import {ADMIN, GUEST, USER} from "./roles";
import UsersPage from "../Pages/UsersPage/UsersPage";
import FavouritesPage from "../Pages/FavouritesPage/FavouritesPage";
import CourseStatisticPage from "../Pages/CourseStatisticPage/CourseStatisticPage";
import DiscountCodesPage from "../Pages/DiscountCodesPage/DiscountCodesPage";

export const routes = [
    {
        title: 'Courses',
        path: COURSES,
        element: <CoursesPage/>,
        icon: '',
        permission: [
            GUEST,
            USER,
            ADMIN
        ]
    },
    {
        path: `${COURSE_PAGE}/:course_id`,
        element: <CoursePage/>,
        permission: [
            GUEST,
            USER,
            ADMIN
        ]
    },
    {
        title: 'Login page',
        path: AUTH_PAGE,
        element: <AuthPage/>,
        permission: [GUEST]
    },
    {
        title: 'Certificates',
        path: CERTIFICATES,
        element: <CertificatesPage />,
        icon: '',
        permission: [
            USER,
            ADMIN,
        ]
    },
    {
        title: 'Favourites',
        path: FAVOURITES,
        element: <FavouritesPage/>,
        icon: '',
        permission: [
            USER,
            ADMIN,
            GUEST
        ]
    },
    {
        title: 'Courses statistic',
        path: COURSE_STATISTIC,
        element: <CourseStatisticPage/>,
        icon: '',
        permission: [
            ADMIN,
        ]
    },
    {
        title: 'Discount codes',
        path: DISCOUNT_CODE,
        element: <DiscountCodesPage/>,
        icon: '',
        permission: [
            ADMIN,
        ]
    },
    {
        path: `${COURSE_TEST_PAGE}/:course_id`,
        element: <CourseTestPage/>,
        permission: [
            USER,
            ADMIN,
        ]
    },
    {
        title: 'Create course',
        path: CREATE_COURSE,
        element: <CreateCoursePage/>,
        icon: '',
        permission: [
            ADMIN
        ]
    },
    {
        title: 'Users',
        path: USERS,
        element: <UsersPage/>,
        icon: '',
        permission: [
            ADMIN
        ]
    }
]
