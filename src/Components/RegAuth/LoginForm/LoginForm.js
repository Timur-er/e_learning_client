import React from 'react';
import registerFormModel from "../RegisterForm/registerFormModel";
import CustomTextField from "../../CustomTextField/CustomTextField";
import {Formik} from "formik";
import validationSchema from "../LoginForm/loginValidationSchema";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import loginFormModel from "./loginFormModel";
import {loginAPI} from "../../../http/userAPI";
import {useAuth} from "../../../hooks/auth.hook";
import {useNavigate} from "react-router-dom";
import {COURSES} from "../../../routes/consts";

const LoginForm = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const renderInputs = loginFormModel.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index} {...inputOptions} />;
    });

    return (
        <div >
            <Formik
                validationSchema={validationSchema}
                validateOnChange
                validateOnBlur
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                    const {email: userEmail, password: userPassword} = values;
                    const authUser = await loginAPI(userEmail, userPassword);
                    const {user_id, email, name, phone_number, birth_date, role} = authUser.data.user;
                    login(user_id, email, name, phone_number, birth_date, role, authUser.data.access_token);
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
                            Login
                        </Button>
                    </Box>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;