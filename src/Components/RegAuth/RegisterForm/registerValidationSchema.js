import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    fullName: yup
        .string()
        .matches(
            /^[A-ZА-Я]([-']?[a-zа-я]+)*( [A-ZА-Я]([-']?[a-zа-я]+)*)+$/,
            'Invalid name',
        )
        .required('Full name is required'),
    phoneNumber: yup
        .string()
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            'Invalid phone!'
        )
        .required('Phone number is required!'),
    birthDate: yup
        .string()
        .required('Birthday is required!'),
    password: yup
        .string()
        .min(12, 'Password should be of minimum 12 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Confirm password')
        .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

export default validationSchema;
