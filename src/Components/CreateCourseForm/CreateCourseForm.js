import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import CustomTextField from "../CustomTextField/CustomTextField";
import {courseFormModel, courseSmallFormModel1, courseSmallFormModel2} from "../CreateCourse/InfoForm/CourseFormModel";
import styles from './CreateCourseForm.module.scss';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import validationSchema from "./courseFormValidationSchema";
import {createCourse} from "../../http/courseAPI";
import certificatesPage from "../../Pages/CertificatesPage/CertificatesPage";
import {useDispatch} from "react-redux";
import {addCurrentCourseId, addMainCourseInfo} from "../../store/CreateCourse/action";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";

const CreateCourseForm = ({}) => {
    const [image, setImage] = useState([])
    const [imageUrl, setImageUrl] = useState(null);
    const [certificate, setCertificate] = useState([]);
    const [certificateUrl, setCertificateUrl] = useState(null);
    const dispatch = useDispatch();
    const [submitForm, setSubmitForm] = useState(null);

    const renderInputs = courseFormModel.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index} {...inputOptions} />
    })

    const renderSmallInputs1 = courseSmallFormModel1.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index} {...inputOptions} />

    })

    const renderSmallInputs2 = courseSmallFormModel2.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index} {...inputOptions} />
    })

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
        // <Grid marginTop='20px' display='flex' justifyContent='center'>
        <Grid marginTop='20px'>

            <Grid>

                <Grid>
                    <Formik
                        initialValues={{
                            course_title: '',
                            short_description: '',
                            lector: '',
                            lector_description: '',
                            price: '',
                            course_duration: '',
                            course_level: '',
                            course_area: '',
                            attempts: '',
                            percentage: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            const {
                                course_title,
                                lector,
                                lector_description,
                                short_description,
                                price,
                                course_duration,
                                course_level,
                                course_area,
                                attempts,
                                percentage
                            } = values;

                            // console.log(image);
                            // dispatch(addMainCourseInfo({...values, image: image, certificate: certificate}))

                            const formData = new FormData();
                            formData.append('course_title', course_title);
                            formData.append('short_description', short_description)
                            formData.append('lector', lector);
                            formData.append('lector_description', lector_description);
                            formData.append('price', price);
                            formData.append('course_duration', course_duration);
                            formData.append('course_level', course_level);
                            formData.append('course_area', course_area);
                            formData.append('attempts', attempts);
                            formData.append('percentage', percentage);
                            formData.append('image', image);
                            formData.append('certificate', certificate);

                            const course_info = await createCourse(formData)

                            dispatch(addCurrentCourseId(course_info.data))

                        }}
                    >
                        {(formik) => (
                            <Form>
                                <Grid display='flex' flexDirection='column' gap='20px'>
                                    {/*{bindSubmitForm(formik)}*/}
                                    <Grid display='flex' flexDirection='column' gap='20px'>
                                        {renderInputs}
                                    </Grid>
                                    <Grid display='flex' gap='20px' flexDirection='column'>
                                        <Grid display='flex' gap='20px'>
                                            {renderSmallInputs1}
                                        </Grid>
                                        <Grid display='flex' gap='20px'>
                                            {renderSmallInputs2}
                                        </Grid>
                                    </Grid>



                                    <Grid display='flex' gap='20px'>
                                        <Grid md={6} className={styles.content__imageWrapper}>
                                            {imageUrl
                                                ? <img className={styles.content__image} src={imageUrl} alt="Uploaded Image"/>
                                                : (
                                                    <>
                                                        <label className={styles.label}>
                                                            <AddAPhotoIcon sx={{fontSize: 50}}/>
                                                            <input className={styles.content__download} onChange={(e) => selectFile(e)}
                                                                   type="file"/>
                                                            Add course image
                                                        </label>
                                                    </>
                                                )

                                            }
                                        </Grid>
                                        <Grid md={6} className={styles.content__imageWrapper}>

                                            {certificateUrl
                                                ? <img className={styles.content__image} src={certificateUrl} alt="Uploaded Image"/>
                                                : (
                                                    <>
                                                        <label className={styles.label}>
                                                            <AddAPhotoIcon sx={{fontSize: 50}}/>
                                                            <input className={styles.content__download} onChange={(e) => selectCertificate(e)}
                                                                   type="file"/>
                                                            Add certificate
                                                        </label>
                                                    </>
                                                )

                                            }
                                        </Grid>

                                    </Grid>

                                    <Button type='submit' variant='contained'>
                                        Submit
                                    </Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>

            </Grid>

        </Grid>
    );
};

export default CreateCourseForm;