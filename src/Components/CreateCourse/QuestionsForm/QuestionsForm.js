import React from 'react';
import {Card, Grid} from "@mui/material";
import CustomTextField from "../../CustomTextField/CustomTextField";
import DeleteIcon from "@mui/icons-material/Delete";
import {FieldArray} from "formik";
import Button from "@mui/material/Button";
import styles from './questionsForm.module.scss';

const QuestionsForm = ({ formik }) => {
    return (
        <>
            <FieldArray name={'questions'}>
                {({push, remove}) => (
                    <Grid display='flex' flexDirection='column' gap='20px'>
                        <Grid container spacing='20px' >
                            {formik.values.questions.map((question, questionIndex) => {
                                const questionTitle = `questions[${questionIndex}].question`;
                                const answers = `questions[${questionIndex}].answers`;
                                const titleOptions = {
                                    type: 'string',
                                    name: questionTitle,
                                    placeholder: 'Question'
                                }

                                return (
                                    <Grid item md={6} xs={12} sm={6} id={questionIndex} key={questionIndex}>
                                        <Card style={{padding: '20px'}}>
                                            <Grid display='flex' justifyContent='center' alignItems='center' marginBottom='20px'>
                                                <CustomTextField id={questionIndex.toString()} {...titleOptions}/>
                                                <DeleteIcon className={styles.form__deleteIcon}
                                                            onClick={() => remove(questionIndex)}/>
                                            </Grid>


                                            <FieldArray name={answers}>
                                                {({push: p, remove: r}) => (
                                                    <Grid display='flex' gap='20px' flexDirection='column'>
                                                        {
                                                            question.answers.map((answer, answerIndex) => {
                                                                const answerItem = `questions[${questionIndex}].answers[${answerIndex}].answer`
                                                                const is_correct = `questions[${questionIndex}].answers[${answerIndex}].is_correct`
                                                                const inputOptions = {type: 'string', name: answerItem, placeholder: 'Answer'}

                                                                const checkboxOptions = {type:'checkbox', name: is_correct, placeholder: ''}

                                                                return (
                                                                    <Grid key={answerItem} display='flex' justifyContent='center' alignItems='center'>
                                                                        <CustomTextField id={answerIndex.toString()} {...inputOptions}/>

                                                                        <CustomTextField id={answerIndex.toString()} {...checkboxOptions}/>

                                                                        <DeleteIcon
                                                                            className={styles.form__deleteIcon}
                                                                            onClick={() => r(answerIndex)}/>
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                        <Button variant='outlined'
                                                                onClick={() => p({answer: '', is_correct: false})}>
                                                            add answer
                                                        </Button>
                                                    </Grid>
                                                )}
                                            </FieldArray>
                                        </Card>
                                    </Grid>

                                )
                            })}
                        </Grid>

                        <Grid display='flex' flexDirection='column' gap='20px'>
                            <Button variant='outlined' onClick={() => {
                                push({
                                    question: '',
                                    answers: [
                                        {
                                            answer: '',
                                            is_correct: false,
                                        }
                                    ]
                                })
                            }}>Add question</Button>
                        </Grid>

                    </Grid>
                )}
            </FieldArray>
        </>
    );
};

export default QuestionsForm;