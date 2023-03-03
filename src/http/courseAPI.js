import {$authHost, $downloadFile, $host} from "./index";

export const createCourse = async (course) => {
    const response = await $authHost.post('/api/courses/create', course)
    return response;
}

export const addCourseDescription = async (course_id, description) => {
    const response = await $authHost.post('/api/courses/addDescription', {course_id, ...description})
}

export const getAllCourses = async (user_id) => {
    //change to host, for non authorized user;
    const courses = await $host.get(`/api/courses/getAllCourses/${user_id}`);
    return courses;
}

export const getCourseDescriptionByID = async (course_id) => {
    const description = await $host.get(`/api/courses/getCourseDescriptionByID/${course_id}`);
    return description;
}

export const getCourseByID = async (course_id, user_id) => {
    const course = await $host.get(`/api/courses/getCourseByID/${course_id}&${user_id}`);
    return course;
}

export const buyCourse = async (course_id, user_id) => {
    // which method should i use here? post, get?
    const course = await $authHost.get(`/api/courses/buyCourse/${course_id}&${user_id}`)
    return course;
}

export const getTestForCourse = async (course_id) => {
    const tests = await $authHost.get(`/api/courses/getTestForCourse/${course_id}`)
    return tests;
}

export const getCourseVideo = async (course_id) => {
    const video = await $authHost.get(`/api/courses/getCourseVideo/${course_id}`);
    return video;
}

export const submitCourse = async(course_id, user_id, test_result) => {
    const response = await $authHost.post('/api/courses/submitCourse', {course_id, user_id, test_result});
    return response;
}

export const downloadCertificate = async(course_id, user_id) => {
    const response = await $authHost.get(`/api/courses/downloadCourse/${course_id}&${user_id}`)
    let url = response.data;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'certificate.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const getFinishedCourses = async(user_id) => {
    const response = await $authHost.get(`/api/courses/getFinishedCourses/${user_id}`);
    return response;
}

export const getAllLabels = async() => {
    const response = await $authHost.get('/api/courses/getAllCourseLabels');
    return response;
}