export const courseFormModel = [
    {
        type: 'string',
        name: 'course_info.course_title',
        placeholder: 'Course title',
    },
    {
        type: 'string',
        name: 'course_info.short_description',
        placeholder: 'Course short description',
    },
    {
        type: 'string',
        name: 'course_info.lector',
        placeholder: 'Lector'
    },
    {
        type: 'string',
        name: 'course_info.lector_description',
        placeholder: 'Lectors short description',
    },
    {
        type: 'string',
        name: 'course_info.video_link',
        placeholder: 'Video link',
    },
]

export const courseSmallFormModel1 = [
    {
        type: 'string',
        name: 'course_info.course_level',
        placeholder: 'Course Level',
    },
    {
        type: 'string',
        name: 'course_info.course_area',
        placeholder: 'Course area'
    },
    {
        type: 'string',
        name: 'course_info.course_duration',
        placeholder: 'Course duration',
    },
]

export const courseSmallFormModel2 = [
    {
        type: 'string',
        name: 'course_info.attempts',
        placeholder: 'attempts',
    },
    {
        type: 'string',
        name: 'course_info.percentage',
        placeholder: 'percentage',
    },
    {
        type: 'string',
        name: 'course_info.price',
        placeholder: 'Price for course'
    },
]

export default {courseFormModel, courseSmallFormModel1, courseSmallFormModel2};
