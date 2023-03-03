import React, {useState} from 'react';
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";
import {Form, Formik} from "formik";
import DescriptionForm from "./DescriptionForm/DescriptionForm";
import InfoForm from "./InfoForm/InfoForm";
import QuestionsForm from "./QuestionsForm/QuestionsForm";
import {Grid, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../CreateCourseForm/CreateCourseForm.module.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {createCourse} from "../../http/courseAPI";
import {useDispatch} from "react-redux";
import {openSnackbarAction} from "../../store/Snackbar/actions";

const CreateCourse = () => {
    const [image, setImage] = useState([])
    const [imageUrl, setImageUrl] = useState(null);
    const [certificate, setCertificate] = useState([]);
    const [certificateUrl, setCertificateUrl] = useState(null);
    const dispatch = useDispatch();

    const selectFile = e => {
        let image = e.target.files[0]
        setImage(image)
        setImageUrl(URL.createObjectURL(image));
    }

    const selectCertificate = e => {
        let loadCertificate = e.target.files[0];
        setCertificate(loadCertificate);
        setCertificateUrl(URL.createObjectURL(loadCertificate));
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    const {course_info, course_description, questions} = values;
                    const formData = new FormData();
                    formData.append('course_info', JSON.stringify(course_info));
                    formData.append('course_description', JSON.stringify(course_description));
                    formData.append('questions', JSON.stringify(questions));
                    formData.append('image', image);
                    formData.append('certificate', certificate);

                    console.log(values);

                    setImage([]);
                    setImageUrl(null)
                    setCertificate([]);
                    setCertificateUrl(null)

                    const course = await createCourse(formData)
                    dispatch(openSnackbarAction(course.data, 'success'))
                    // setSubmitting(false);
                    // resetForm();
                }}
            >
                {(formik) => (
                    <Form>
                        <Grid container justifyContent='center' gap='20px'>

                            <Grid item md={8} display='flex' flexDirection='column' gap='20px'>
                                <Typography variant='h3' textAlign='center' color='secondary'>
                                    Add main info for course
                                </Typography>

                                <Paper style={{padding: '20px'}}>
                                    <InfoForm />


                                    <Grid display='flex' gap='20px' marginTop='20px'>
                                        <Grid container flexDirection='column' className={styles.content__imageWrapper}>
                                            <Grid>
                                                {imageUrl && <img className={styles.content__image} src={imageUrl} alt="Uploaded Image"/>}
                                            </Grid>

                                            <Grid>
                                                <label className={styles.label}>
                                                    <AddAPhotoIcon sx={{fontSize: 50}}/>
                                                    <input className={styles.content__download} onChange={(e) => selectFile(e)}
                                                           type="file"/>
                                                    {imageUrl ? 'Change course image' : 'Add course image'}
                                                </label>
                                            </Grid>
                                        </Grid>

                                        <Grid container flexDirection='column' className={styles.content__imageWrapper}>
                                            <Grid>
                                                {certificateUrl && <img className={styles.content__image} src={certificateUrl} alt="Uploaded Image"/>}
                                            </Grid>

                                            <Grid>
                                                <label className={styles.label}>
                                                    <AddAPhotoIcon sx={{fontSize: 50}}/>
                                                    <input className={styles.content__download} onChange={(e) => selectCertificate(e)}
                                                           type="file"/>
                                                    {certificateUrl ? 'Change certificate' : 'Add certificate'}
                                                </label>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>

                            </Grid>
                            <Grid item md={8} display='flex' flexDirection='column' gap='20px'>
                                <Typography variant='h3' textAlign='center' color='secondary'>
                                    Add course description
                                </Typography>
                                <DescriptionForm formik={formik}/>
                            </Grid>
                            <Grid item md={8} display='flex' flexDirection='column' gap='20px'>
                                <Typography variant='h3' textAlign='center' color='secondary'>
                                    Add questions
                                </Typography>
                                <QuestionsForm formik={formik}/>
                            </Grid>

                            <Grid item md={8} display='flex'>
                                <Button variant='contained' fullWidth type='submit'>
                                    SUBMIT ALL FORM
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateCourse;