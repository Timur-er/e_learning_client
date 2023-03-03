import React, {useEffect, useState} from 'react';
import {courseFormModel} from "./CourseFormModel";
import CustomTextField from "../../CustomTextField/CustomTextField";
import {Grid} from "@mui/material";
import CustomSelect from "../../CustomSelect/CustomSelect";
import {getAllLabels} from "../../../http/courseAPI";


const InfoForm = () => {
    const [labels, setLabels] = useState([]);

    const getLabels = async () => {
        const fetchedLabels = await getAllLabels();
        setLabels(fetchedLabels.data)
    }

    useEffect(() => {
        getLabels()
    }, [])

    const renderInputs = courseFormModel.map((inputOptions, index) => {
        return (
            <Grid item md={6} key={index}>
                <CustomTextField key={index} id={index.toString()} {...inputOptions} />
            </Grid>
        )
    })

    return (
        <>
            <Grid display='flex' flexDirection='column' gap='20px'>
                <Grid container spacing='20px'>
                    {renderInputs}

                    <Grid item md={6}>
                        <CustomSelect labels={labels} options={{
                            name: "course_info.course_labels", placeholder: "Course labels", type: "select"}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default InfoForm;