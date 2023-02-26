import initialStore from "../initialStore";
import {ADD_COURSE_ID, SAVE_DESCRIPTION, SAVE_MAIN_INFO, SAVE_QUESTIONS} from "./types";

export function createCourseReducer(createCourse = initialStore.create_course, action) {
    switch (action.type) {
        case SAVE_MAIN_INFO:
            console.log('action payload - ', action.payload);
            return {...action.payload};
        case SAVE_DESCRIPTION:
            return {...action.payload, ...createCourse};
        case SAVE_QUESTIONS:
            return {...action.payload, ...createCourse};
        case ADD_COURSE_ID:
            console.log(action.payload);
            return {course_id: action.payload}
        default:
            return createCourse;
    }
}