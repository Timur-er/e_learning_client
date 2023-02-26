import * as yup from 'yup';

const validationSchema = yup.object({
    course_info: yup.object().shape({
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
        video_link: yup
            .string()
            .required('Video link is required!'),
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
    }),
    course_description: yup.array().of(yup.object().shape({
        descriptionTitle: yup.string().required('This is required field!'),
        descriptionItem: yup.string().required('Description is required field!')
    })),
    questions: yup.array().of(yup.object().shape({
        question: yup.string().required('This is required field!'),
        answers: yup.array().of(yup.object().shape({
            answer: yup.string().required('This is required field!'),
            is_correct: yup.boolean().required('This is required field!')
        }))
    }))


})

export default validationSchema;