import * as Yup from 'yup';

const personalFormValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    address: Yup.string().required('Address is required'),
    house_number: Yup.string().required('House number is required'),
    local: Yup.string().required('Local is required'),
    postal_code: Yup.string().required('Postal code is required'),
    city: Yup.string().required('City is required'),
});

export default personalFormValidationSchema;