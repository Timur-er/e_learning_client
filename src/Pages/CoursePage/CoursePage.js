import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import PageContainer from "../../Components/PageContainer/PageContainer";
import {
    CircularProgress,
    Drawer,
    Grid,
    List,
    ListItem, ListItemIcon, ListItemText,
    Paper,
    Rating
} from "@mui/material";
import {getAllCourses, getCourseByID, getCourseDescriptionByID} from "../../http/courseAPI";
import styles from './CoursePage.module.scss';
import Typography from "@mui/material/Typography";
import BuyCourseForm from "../../Components/BuyCourseForm/BuyCourseForm";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import {useSelector} from "react-redux";
import {getIsAuth, getUserId} from "../../store/User/selectors";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {AUTH_PAGE, COURSE_PAGE, COURSE_TEST_PAGE} from "../../routes/consts";
import Box from "@mui/material/Box";

const CoursePage = () => {
    const {course_id} = useParams()
    const [courseDetails, setCourseDetails] = useState([]);
    const isAuth = useSelector(getIsAuth);
    const [course, setCourse] = useState([]);
    const [lector, setLector] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user_id = useSelector(getUserId);
    const [isPaid, setIsPaid] = useState(false);
    const [courseLoading, setCourseLoading] = useState(true)

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        // this is test request for right side of page, change later to something else...
        let courses = await getAllCourses(user_id);
        setCourses(courses.data)
    }

    const renderCards = courses.map((course, index) => {
        const {id, image} = course;
        return (
            <Grid item key={index}>
                <Link to={`${COURSE_PAGE}/${id}`}>
                    <img src={image} alt="" style={{maxWidth: '100%'}}/>
                </Link>
            </Grid>

        )
    })

    const getData = async () => {
        try {
            setCourseLoading(true)

            const details = await getCourseDescriptionByID(course_id);
            const courseInfo = await getCourseByID(course_id, user_id);

            console.log(courseInfo);

            setCourseDetails(details.data);
            setCourse(courseInfo.data.course)
            setLector(courseInfo.data.lector);
            setIsPaid(courseInfo.data.is_paid)


        } catch (e) {
            // open snack bar later for each error!!!
            console.log(e);
        } finally {
            setCourseLoading(false)
        }
    }

    useEffect(() => {
        getData()
        getCourses()
    }, [course_id, user_id])

    if (courseLoading) {
        return (<PageContainer>
            <Grid container justifyContent='center' alignItems='center'>
                <CircularProgress color="secondary"/>
            </Grid>
        </PageContainer>)
    }

    const renderDetails = courseDetails.map((detail, index) => {
        const {title, description} = detail;
        return (
            <Grid item md={6} key={index}>
                <Paper className={styles.descriptionCard} key={index}>
                    <Typography className={styles.descriptionCard__title} variant='h6'>
                        {title}
                    </Typography>

                    <List dense={false}>
                        {description.map((desc, descIndex) => {
                            return (
                                <ListItem key={descIndex}>
                                    <ListItemIcon>
                                        <FiberManualRecordIcon fontSize='small' color='secondary'/>
                                    </ListItemIcon>
                                    <ListItemText primary={desc}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Grid>
        )
    })

    const buyCourse = (e) => {
        e.preventDefault();
        // after course is paid, I need to refresh page to show new buttons for bought course!
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <Grid
            container
            sx={{width: 500}}
            justifyContent='center'
            padding='40px 20px'
            gap='20px'

        >
            <Typography variant='h4' textAlign='center'>
                Buy course
            </Typography>
            <Typography fontSize='24px' color='#bb9049' fontWeight='bold' textAlign='center'>
                {course.course_name}
            </Typography>

            <BuyCourseForm price={course.price}/>
        </Grid>
    );

    return (
        <PageContainer>

            <Grid container spacing='20px'>
                <Grid className={styles.wrapper} display='flex' gap='80px' flexDirection='column' paddingRight='20px'
                      item md={9.5}>
                    <Grid container spacing='20px'>
                        <Grid item md={3.5}>
                            {console.log('course - ', course)}
                            <img className={styles.image} src={course.image}
                                 style={{width: '100%'}} alt=""/>
                        </Grid>
                        <Grid justifyContent='space-between'
                              item md={8.5}
                              display='flex'
                              flexDirection='column'
                              gap='20px'>
                            <Grid container gap='20px'>
                                <Typography variant='h4' color='rgba(188, 144, 72, 1)'>
                                    {course.course_name}
                                </Typography>
                                <Typography>
                                    {course.short_description}
                                </Typography>
                                <Box display='inline'>
                                    <Typography fontWeight='bold' display='inline'>
                                        {lector.lector_name}
                                    </Typography>
                                    - {lector.short_description}
                                </Box>

                                <Grid
                                    container
                                    flexDirection='column'
                                    style={{
                                        backgroundColor: 'white',
                                        border: '1px solid #bc9048',
                                        color: '#bc9048',
                                        padding: '20px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <Grid container
                                          display='flex'
                                          justifyContent='space-between'
                                    >
                                        <Grid item md={4}>
                                            <Typography textAlign='center' fontWeight='bold'>
                                                Course duration: <br/> 1 hour
                                            </Typography>
                                        </Grid>

                                        <Grid item md={4}>
                                            <Typography textAlign='center' fontWeight='bold'>
                                                Attempts: <br/> 3
                                            </Typography>
                                        </Grid>

                                        <Grid item md={4}>
                                            <Typography textAlign='center' fontWeight='bold'>
                                                Course questions: <br/> 10
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container display='flex' justifyContent='space-between'
                                          style={{paddingTop: '10px'}}>

                                        <Grid item md={4}>
                                            <Typography textAlign='center' fontWeight='bold'>
                                                Course price: <br/> 300
                                            </Typography>
                                        </Grid>

                                        <Grid item md={4}>
                                            <Typography textAlign='center' fontWeight='bold'>
                                                Certificate after: <br/> 80%
                                            </Typography>
                                        </Grid>

                                        <Grid item md={4}>
                                            <Typography textAlign='center' fontWeight='bold'>
                                                Course level: <br/> MEDIUM
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item display='flex' alignItems='center'>
                                Course rating: <Rating value={4} disabled/>
                            </Grid>

                            <Grid item display='flex' justifyContent='space-between'>
                                {isPaid
                                    ? <Button
                                        component={Link}
                                        to={`${COURSE_TEST_PAGE}/${course_id}`}
                                        variant='outlined'
                                        style={{fontSize: '18px', fontWeight: 'bold'}}
                                    >
                                        Start course
                                    </Button>
                                    : isAuth ? (
                                        <Button
                                            variant='outlined'
                                            style={{fontSize: '18px', fontWeight: 'bold'}}
                                            onClick={toggleDrawer('right', true)}>
                                            Buy course
                                        </Button>
                                    ) : <Button
                                        component={Link}
                                        to={AUTH_PAGE}
                                        variant='outlined'
                                        style={{fontSize: '18px', fontWeight: 'bold'}}>Buy course</Button>
                                }

                                <IconButton>
                                    <FavoriteIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing='20px'>
                        {renderDetails}
                    </Grid>

                    <Grid item>
                        {
                            isPaid
                                ? <Button
                                    style={{height: '80px', fontSize: '30px', fontWeight: 'bold'}}
                                    component={Link}
                                    to={`${COURSE_TEST_PAGE}/${course_id}`}
                                    variant='contained'
                                    fullWidth>
                                    Start course
                                </Button>
                                :
                                isAuth ?
                                    (
                                        <Button
                                            variant='contained'
                                            style={{height: '80px', fontSize: '30px', fontWeight: 'bold'}}
                                            fullWidth onClick={toggleDrawer('right', true)}>
                                            Buy course
                                        </Button>
                                    ) : <Button
                                        component={Link}
                                        to={AUTH_PAGE}
                                        variant='outlined'
                                        style={{fontSize: '18px', fontWeight: 'bold'}}>Buy course</Button>
                        }
                    </Grid>
                </Grid>

                <Grid item display='flex' md={2.5} alignItems='center' flexDirection='column'>
                    <Typography margin='0 auto' fontWeight='bold' variant='h5' textAlign='center' color='secondary'>
                        You might also like this courses
                    </Typography>
                    <Grid item display='flex' md={9} flexDirection='column' gap='20px' marginTop='20px'>
                        {renderCards}
                    </Grid>
                </Grid>

                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>

            </Grid>

        </PageContainer>
    );
};

export default CoursePage;