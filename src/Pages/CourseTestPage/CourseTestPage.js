import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {downloadCertificate, getCourseByID, getCourseVideo, getTestForCourse, submitCourse} from "../../http/courseAPI";
import PageContainer from "../../Components/PageContainer/PageContainer";
import {
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    Rating
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {openSnackbarAction} from "../../store/Snackbar/actions";
import {getUserId} from "../../store/User/selectors";
import Avatar from "@mui/material/Avatar";
import {COURSES} from "../../routes/consts";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '3px solid #bb9049',
    borderRadius: '5px',
    p: '40px',
};

const CourseTestPage = () => {
    const {course_id} = useParams();
    const [tests, setTests] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [videoLink, setVideoLink] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userPercentage, setUserPercentage] = useState(0);
    const [courseInfo, setCourseInfo] = useState({})
    const [checkAnswers, setCheckAnswers] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [courseComplete, setCourseComplete] = useState(false);
    const user_id = useSelector(getUserId)
    const dispatch = useDispatch();

    const getTests = async () => {
        const responseTests = await getTestForCourse(course_id);
        setTests(responseTests.data)
    }

    const getVideo = async () => {
        const responseVideo = await getCourseVideo(course_id)
        setVideoLink(`https://www.youtube.com/embed/${responseVideo.data.video_link}`);
    }

    const getCourseInfo = async () => {
        const info = await getCourseByID(course_id, user_id)
        console.log('course info - ', info);
        setCourseComplete(info.data.is_complete);
        setCourseInfo({
            ...info.data.course,
            user_attempts: info.data.user_attempts,
            is_paid: info.data.is_paid
        })
    }

    useEffect(() => {
        getTests()
        getVideo()
        getCourseInfo()
    }, [course_id, user_id, courseComplete, checkAnswers])

    const handleOpen = () => {
        setIsModalOpen(true)
        setCheckAnswers(false)
    };
    const handleClose = () => {
        setIsModalOpen(false)
    };

    const handleChange = (question, answer) => {
        setSelectedAnswers({ ...selectedAnswers, [question]: answer });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIncorrectAnswers([]);
        if (Object.keys(selectedAnswers).length !== tests.length) {
            dispatch(openSnackbarAction('You did not answer all questions!', 'error'))
        } else {
            let correctAnswers = 0;
            Object.entries(selectedAnswers).forEach(([questionId, answerId]) => {
                const correctAnswer = tests
                    .find(question => {
                        return question.id === parseInt(questionId, 10)
                    })
                    .answers.find(answer => answer.is_correct).id;
                if (answerId === correctAnswer) {
                    correctAnswers += 1;
                } else {
                    setIncorrectAnswers(prevState => [...prevState, questionId])
                }
            });

            const percentage = (correctAnswers / tests.length) * 100;
            setUserPercentage(percentage);
            const submittedCourse = await submitCourse(course_id, user_id, percentage);
            setCourseComplete(submittedCourse.data.is_complete);
            handleOpen();
        }
    };

    const checkAnswersHandler = (e) => {
        e.preventDefault();
        setCheckAnswers(true);
        setIsModalOpen(false)
    }

    const downloadCertificateHandler = async (e) => {
        e.preventDefault();
        await downloadCertificate(course_id, user_id)
    }

    const renderTests = tests.map((test, index) => {
        const {id: questionId, question, answers} = test;
        const incorrectAnswer = checkAnswers && incorrectAnswers.indexOf(`${questionId}`) >= 0;
        return (
            <Grid item md={6} xs={12} sm={6} marginTop='20px' key={index}>
                <Card style={{ height: '100%'}}>
                    <FormControl key={index} style={{ width: '100%'}}>
                        <FormLabel style={{fontSize: '24px', height: '75px', padding: '20px 20px 0 20px', fontWeight: 'bold', backgroundColor: incorrectAnswer ? '#d84e4b' : '#bc9048', color: 'white'}} >
                            {question}
                        </FormLabel>
                        <RadioGroup style={{padding: '20px'}}>
                            {answers.map((answer, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        onChange={() => handleChange(questionId, answer.id)}
                                        value={answer.id}
                                        control={<Radio key={index}/>}
                                        label={answer.answer}
                                    />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                </Card>
            </Grid>
        )
    })

    if (!courseInfo.is_paid) {
        return (
            <PageContainer>
                <Typography variant='h1' color='secondary' textAlign='center'>
                    Sorry, you failed this course, you need buy it again to submit test, ande get certificate!
                </Typography>
                <Button component={Link} to={COURSES}>
                    Go to the course page
                </Button>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <Grid container justifyContent='center' gap='40px'>
                    <Grid item md={8} display='flex' flexDirection='column' gap='80px'>
                            <iframe
                                width='100%'
                                height="600"
                                src={videoLink}
                                frameBorder="0"
                                title={courseInfo.course_info}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                        <Grid style={{}}
                              container
                              gap='20px'
                        >
                            <Grid item md={12}>
                                <Typography variant='h3' color='#bb9049'>
                                    {courseInfo.course_name}
                                </Typography>
                            </Grid>

                            <Grid container spacing='20px'>
                                <Grid item md={8}>
                                    <Typography fontSize='20px'>
                                        {courseInfo.short_description}
                                    </Typography>
                                </Grid>

                                <Grid item md={4} style={{backgroundColor: '#bb9049', color:'white', borderRadius: '5px', marginTop: '20px', padding: '20px'}}>
                                    <Typography fontSize='16px'>
                                        You have {courseInfo.user_attempts}/{courseInfo.attempts} attempts to pass this test.
                                    </Typography>
                                    <Typography fontSize='16px' marginTop='20px'>
                                        The test will be considered passed after {courseInfo.percentage}%  correct answers
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing='20px' justifyContent='center'>
                            {
                                courseComplete ? (
                                    <Grid container display='flex' justifyContent='center' gap='20px'>
                                        <Typography variant='h3' textAlign='center'>
                                            Course already completed, you can download your certificate here!
                                        </Typography>
                                        <Button variant='contained' onClick={(e) => downloadCertificateHandler(e)} fullWidth style={{fontWeight: 'bold', fontSize: '24px'}}>
                                            Download certificate
                                        </Button>
                                    </Grid>
                                ) : renderTests
                            }
                        </Grid>
                    </Grid>

                {!courseComplete && <Grid item md={8} marginTop='20px'>
                    <Button fullWidth variant='contained' style={{height: '80px'}} onClick={(e) => handleSubmit(e)}>
                        submit
                    </Button>
                </Grid>}
            </Grid>


            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{textAlign: 'center'}}>

                    <Grid gap={'20px'} display='flex' alignItems='center' flexDirection='column'>
                        <Grid item display='flex' alignItems='center' justifyContent='center'>
                            <Avatar sx={{bgcolor: userPercentage >= courseInfo.percentage ? '#bc9048' : '#4A4A4A', padding: '10px'}} >{userPercentage}%</Avatar>
                        </Grid>

                            <Typography id="modal-modal-title" variant="h5" color='#bc9048' fontWeight='bold' textAlign='center' component="h2">
                                {courseInfo.course_name}
                            </Typography>

                            <Typography color='#4A4A4A'>
                                {courseInfo.user_attempts}/{courseInfo.attempts}
                            </Typography>

                        {userPercentage >= courseInfo.percentage && <Typography color='#4A4A4A'>Congratulations!</Typography>}

                        <Box style={{backgroundColor: '#E0CAA9', padding: '10px', borderRadius: '5px', color: 'white', width: '100%'}}>
                            {userPercentage >= courseInfo.percentage
                                ? (
                                    <Box style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                        // verticalAlign: 'center'
                                    }}
                                    >
                                        <Typography fontSize='20px' fontWeight='bold'>
                                            Rate our course!
                                        </Typography>
                                        <Rating size={'large'}/>
                                    </Box>
                                ) : (
                                    <Typography>
                                        Unfortunately you don't have enough correct answers to get the certificate.
                                    </Typography>
                                )
                            }
                        </Box>

                        <Typography>
                            {userPercentage >= courseInfo.percentage ? 'You did it' : (
                                <>
                                   You have {courseInfo.user_attempts} more try
                                </>
                            )}
                        </Typography>

                        {
                            userPercentage >= courseInfo.percentage
                            ? (
                                <Button variant='contained' onClick={(e) => downloadCertificateHandler(e)} style={{width: '50%'}}>
                                    Get certificate
                                </Button>
                                ) : (
                                    <Button onClick={(e) => checkAnswersHandler(e)}>
                                        Check answers
                                    </Button>
                                )
                        }
                    </Grid>

                </Box>
            </Modal>
        </PageContainer>
    );
};

export default CourseTestPage;