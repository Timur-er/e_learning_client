const initialValues = {
    course_info: {
        course_title: '',
        short_description: '',
        lector: '',
        lector_description: '',
        video_link: '',
        price: '',
        course_duration: '',
        course_level: '',
        course_area: '',
        attempts: '',
        percentage: ''
    },
    course_description: [
        {
            descriptionTitle: '',
            descriptionItem: ''
        },
        {
            descriptionTitle: '',
            descriptionItem: ''
        }
    ],
    questions: [
        {
            question: '',
            answers: [
                {
                    answer: '',
                    is_correct: false,
                }
            ]
        },
        {
            question: '',
            answers: [
                {
                    answer: '',
                    is_correct: false,
                }
            ]
        }
    ]
}

export default initialValues;