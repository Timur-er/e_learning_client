import {ADD_COURSE_ID, SAVE_DESCRIPTION, SAVE_MAIN_INFO, SAVE_QUESTIONS} from "./types";

export const addMainCourseInfo = (course) => ({type: SAVE_MAIN_INFO, payload: course});
export const addCourseDescription = (description) => ({type: SAVE_DESCRIPTION, payload: description})
export const addCourseQuestion = (questions) => ({type: SAVE_QUESTIONS, payload: questions});
export const addCurrentCourseId = (course_id) => ({type: ADD_COURSE_ID, payload: course_id})