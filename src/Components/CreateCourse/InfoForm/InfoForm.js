import React from 'react';
import {courseFormModel, courseSmallFormModel1, courseSmallFormModel2} from "../../CreateCourseForm/CourseFormModel";
import CustomTextField from "../../CustomTextField/CustomTextField";
import {Grid} from "@mui/material";

const InfoForm = () => {

    const renderInputs = courseFormModel.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index.toString()} {...inputOptions} />
    })

    const renderSmallInputs1 = courseSmallFormModel1.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index.toString()} {...inputOptions} />

    })

    const renderSmallInputs2 = courseSmallFormModel2.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index.toString()} {...inputOptions} />
    })

    return (
        <>
            <Grid display='flex' flexDirection='column' gap='20px'>
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
            </Grid>
        </>
    );
};

export default InfoForm;