import * as yup from 'yup';

const validationSchema = yup.object({
    course_title: yup
        .string()
        .required('This is required field!'),
    short_description: yup
        .string()
        .required('This is required field!'),
    lector: yup
        .string()
        .required('Lector !!!'),
    lector_description: yup
        .string()
        .required('Lector description is required!'),
    price: yup
        .string()
        .required('Price is required!'),
    course_level: yup
        .string()
        .required('Course level is required field!'),
    course_area: yup
        .string()
        .required('Course area is required field!'),
    course_duration: yup
        .string()
        .required('Course duration is a required field!'),
    attempts: yup
        .string()
        .required('Attempts is a required field'),
    percentage: yup
        .string()
        .required('Percentage is a required field!')
})

export default validationSchema;