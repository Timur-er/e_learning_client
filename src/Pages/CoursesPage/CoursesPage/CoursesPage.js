import { FormControl, Grid, InputLabel, Select, Skeleton, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import CourseCard from "../../../Components/CourseCard/CourseCard";
import PageContainer from "../../../Components/PageContainer/PageContainer";
import { getAllCourses } from "../../../http/courseAPI";
import { getUserId } from "../../../store/User/selectors";
import * as Styled from "./CoursesPage_style";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const user_id = useSelector(getUserId);
    const [filteredCourses, setFilteredCourses] = useState([])
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('');

    const getCourses = async () => {
        setLoading(true)
        let courses = await getAllCourses(user_id).finally(() => setLoading(false))
        setFilteredCourses(courses.data)
        setCourses(courses.data)
    }


    useEffect(() => {
        getCourses();
    }, [user_id])

    useEffect(() => {
        const filterCourses = courses.filter(course => {
            const {course_name} = course;
            return course_name.toLowerCase().includes(filter.toLowerCase());
        })

        setFilteredCourses(filterCourses)
    }, [filter, courses])

    const renderCards = filteredCourses.map((course, index) => {
        const {id, course_name, short_description, price, enrollments, rating, image, is_paid} = course;

        return (
            <Grid item key={index}>
                <CourseCard
                    key={index}
                    course_id={id}
                    title={course_name}
                    rating={rating}
                    enrollments={enrollments}
                    description={short_description}
                    price={price}
                    image={image}
                    is_paid={is_paid}
                />
            </Grid>
        )
    })


    const renderSkeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => {
        return <Skeleton key={index} variant="rounded" sx={{bgcolor: 'rgba(187,144,73,0.1)'}} animation='wave'
                         width='600px' height='230px'/>
    })

    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(e.target.value)
    }

    const handleSelectSorting = (e) => {
        e.preventDefault();
        setSort(e.target.value)
    }

    return (
        <PageContainer>
            <Grid 
                container
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h3' color='#bb9049'>
                    Kursy
                </Typography>

                <Styled.TopInputsGrid item>
                    <TextField color="secondary"
                               variant="standard"
                               label='find by name'
                               onChange={(e) => handleFilter(e)}
                               style={{ minWidth: "150px"}}
                    />

                    <Styled.SelectsWrapper>
                        <FormControl fullWidth style={{ minWidth: "150px" }}>
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ width: "150px" }}
                            >
                                Sort by
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant='standard'
                                label="Sort by"
                                value={sort}
                                onChange={handleSelectSorting}
                            >
                                <MenuItem value='price_acs'>Price asc</MenuItem>
                                <MenuItem value='price_desc'>Price desc</MenuItem>
                            </Select>
                        </FormControl>
                    </Styled.SelectsWrapper>
                </Styled.TopInputsGrid>
            </Grid>

            <Styled.CardsGridWrapper>
                <Styled.CardsGrid container>
                    {loading
                        ? (
                            <>
                                {renderSkeletons}
                            </>
                        ) : filteredCourses.length === 0 ?
                            <Typography variant='h3' fontWeight='bold' color='#d84e4b'>THERE IS NO COURSES WITH THIS
                                NAME</Typography> : renderCards
                    }
                </Styled.CardsGrid>
            </Styled.CardsGridWrapper>
        </PageContainer>
    );
};

export default CoursesPage;