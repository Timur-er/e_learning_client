import * as Yup from 'yup';

const companyFormValidationSchema = Yup.object().shape({
    company_name: Yup.string()
        .required('Company name is required')
        .min(3, 'Company name must be at least 3 characters'),
    nip: Yup.string()
        .required('NIP is required')
        .length(10, 'NIP must be 10 characters'),
    address: Yup.string()
        .required('Address is required')
        .min(3, 'Address must be at least 3 characters'),
    house_number: Yup.string()
        .required('House number is required')
        .min(1, 'House number must be at least 1 character'),
    postal_code: Yup.string()
        .required('Postal code is required')
        .length(6, 'Postal code must be 6 characters'),
    city: Yup.string()
        .required('City is required')
        .min(3, 'City must be at least 3 characters'),
});

export default companyFormValidationSchema;