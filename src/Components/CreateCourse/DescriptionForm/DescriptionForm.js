import React from 'react';
import {FieldArray} from "formik";
import {Card, Grid} from "@mui/material";
import styles from "./descriptionForm.module.scss";
import CustomTextField from "../../CustomTextField/CustomTextField";
import Button from "@mui/material/Button";

const DescriptionForm = ({formik}) => {
    return (
        <>
            <FieldArray name={'course_description'}>
                {({push, remove}) => (
                    <Grid display='flex' flexDirection='column' gap='20px'>

                        <Grid container spacing='20px'>
                            {formik.values.course_description.map((descriptionContent, descriptionContentIndex) => {
                                const descriptionTitle = `course_description[${descriptionContentIndex}].descriptionTitle`;
                                const descriptionItem = `course_description[${descriptionContentIndex}].descriptionItem`;
                                const titleOptions = {
                                    type: 'string',
                                    name: descriptionTitle,
                                    placeholder: 'Description title'
                                }

                                const inputOptions = {type: 'string', name: descriptionItem, placeholder: 'Description'}
                                return (
                                    <Grid item md={6} xs={12} sm={6} id={descriptionContentIndex} key={descriptionContentIndex}>
                                        <Card className={styles.form__form}>
                                            <div className={styles.form__input}>
                                                <CustomTextField key={descriptionContentIndex} id={descriptionContentIndex.toString()} {...titleOptions}/>
                                            </div>


                                            <CustomTextField key={descriptionContentIndex} id={descriptionContentIndex.toString()} {...inputOptions}/>
                                            <Button variant='outlined' onClick={() => remove(descriptionContentIndex)}>
                                                Delete
                                            </Button>
                                        </Card>
                                    </Grid>

                                )
                            })}
                        </Grid>

                        <Grid display='flex' flexDirection='column' gap='20px'>
                            <Button variant='outlined' onClick={() => {
                                push({
                                    descriptionTitle: '',
                                    descriptionItem: ''
                                })
                            }}>Add section</Button>
                        </Grid>

                    </Grid>
                )}
            </FieldArray>
        </>
    );
};

export default DescriptionForm;