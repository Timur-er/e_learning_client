const snoop = () => {};

const initialStore = {
    user: {
        name: '',
        email: '',
        token: '',
        role: '',
        login: snoop(),
        is_auth: false
    },
    available_routes: [],
    create_course: {
        course_id: '',
        allowed_steps: [
            false,
            false,
            false,
        ]
    },
    snackbar: {
        is_open: false,
        message: '',
        type: '',
    }
}

export default initialStore;
