import React, {useState} from 'react';
import CustomTextField from "../../CustomTextField/CustomTextField";
import registerFormModel from "./registerFormModel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import validationSchema from "./registerValidationSchema";
import {Formik} from "formik";
import {registrationAPI} from "../../../http/userAPI";
import {COURSES} from "../../../routes/consts";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../../hooks/auth.hook";


const RegisterForm = () => {
    const navigate = useNavigate();
    const {login} = useAuth();

    const renderInputs = registerFormModel.map((inputOptions, index) => {
        return <CustomTextField key={index} {...inputOptions} />;
    });

    return (
        <div>
            <Formik
                validationSchema={validationSchema}
                validateOnChange
                validateOnBlur
                initialValues={{
                    email: '',
                    fullName: '',
                    phoneNumber: '',
                    birthDate: '',
                    password: '',
                    confirmPassword: '',
                }}
                onSubmit={async (values, {setSubmitting}) => {
                    const {email, fullName, phoneNumber, birthDate, password} = values;
                    const newUser = await registrationAPI(email, fullName, phoneNumber, birthDate, password);
                    const { user_id, role } = newUser.data.user;
                    login(user_id, email, fullName, phoneNumber, birthDate, role, newUser.data.access_token)
                    navigate(COURSES)
                    setSubmitting(false);
                }}
            >
                {(formik) => (
                    <Box display="flex" flexDirection="column" gap={'20px'}>
                        {renderInputs}
                        <Button
                            fullWidth
                            disabled={formik.isSubmitting}
                            variant="contained"
                            type="button"
                            onClick={formik.submitForm}
                        >
                            REGISTER
                        </Button>
                    </Box>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;