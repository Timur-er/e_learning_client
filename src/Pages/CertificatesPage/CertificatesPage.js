import React, {useEffect, useState} from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import Typography from "@mui/material/Typography";
import {getFinishedCourses} from "../../http/courseAPI";
import {useSelector} from "react-redux";
import {getUserId} from "../../store/User/selectors";
import CertificateCard from "../../Components/CertificateCard/CertificateCard";
import {Grid} from "@mui/material";

const CertificatesPage = () => {
    const user_id = useSelector(getUserId);
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        const finishedCourses = await getFinishedCourses(user_id)
        setCourses(finishedCourses.data)
    }

    useEffect(() => {
        getCourses()
    }, [])

    const renderCards = courses.map((course, index) => {
        const {id, course_name, short_description, certificate} = course;

        return (
            <Grid>
                <CertificateCard
                    key={id}
                    image={certificate}
                    short_description={short_description}
                    course_name={course_name}
                />
            </Grid>
        )
    })

    return (
        <PageContainer>
            <Typography variant={'h3'} color='secondary'>
                Certificates
            </Typography>

            <Grid display='flex' gap='50px'>
                {courses.length === 0 ? <Typography variant='h3' color='secondary'>There is no certificates yet</Typography> : renderCards}
            </Grid>
        </PageContainer>
    );
};

export default CertificatesPage;