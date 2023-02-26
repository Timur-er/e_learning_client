import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {Form, Formik} from "formik";
import {Checkbox, FormControlLabel, Grid, Radio, RadioGroup} from "@mui/material";
import personalFormModel from "./PersonalForm/personalFormModel";
import CustomTextField from "../CustomTextField/CustomTextField";
import personalFormInitialValues from "./PersonalForm/personalFormInitialValues";
import companyFormInitialValues from "./CompanyForm/companyFormInitialValues";
import companyFormModel from "./CompanyForm/companyFormModel";
import personalFormValidationSchema from "./PersonalForm/personalFormValidationSchema";
import companyFormValidationSchema from "./CompanyForm/companyFormValidationSchema";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId} from "../../store/User/selectors";
import {buyCourse} from "../../http/courseAPI";

const BuyCourseForm = ({ price }) => {
    // personal - true, campaign - false
    const [personalOrCampaign, setPersonalOrCampaign] = useState('personal')
    const [formModel, setFormModel] = useState([]);
    const [initialValues, setInitialValues] = useState({})
    const [havePromo, setHavePromo] = useState(false);
    const [validationSchema, setValidationSchema] = useState({})
    const {course_id} = useParams()
    const user_id = useSelector(getUserId)


    const changeForm = (e, formik) => {
        e.preventDefault();
        setPersonalOrCampaign(prevState => {
            if (prevState === 'personal') {
                return 'company'
            } else {
                return 'personal'
            }
        })
    };

    const buyCourseHandler = (e) => {
        console.log(e);
        console.log(user_id);
        console.log(course_id);
    }


    useEffect(() => {

        if (personalOrCampaign === 'personal') {
            setFormModel(personalFormModel)
            setInitialValues(personalFormInitialValues)
            setValidationSchema(personalFormValidationSchema)
        } else {
            setFormModel(companyFormModel)
            setInitialValues(companyFormInitialValues)
            setValidationSchema(companyFormValidationSchema)
        }

    }, [personalOrCampaign, formModel, initialValues])

    const renderInputs = formModel.map((inputOptions, index) => {
        return <CustomTextField key={index} id={index.toString()} {...inputOptions} />
    })


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    console.log(values);
                    // after course submit, close this window, and refresh page to show new buttons
                    // need to understand how paylane.js (pep) is working
                    await buyCourse(course_id, user_id);
                    setSubmitting(false)
                }}
            >
                {(formik) => (

                    <Form>
                        <Grid container gap='20px'>

                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={personalOrCampaign}
                                onChange={(e) => changeForm(e, formik)}
                            >
                                <FormControlLabel value='personal' control={<Radio />} label="Chcę fakturę na osobę fizyczną" />
                                <FormControlLabel value='company' control={<Radio />} label="Chcę fakturę na firmę" />
                            </RadioGroup>

                            {renderInputs}

                            <Grid container gap='20px'>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={havePromo}
                                                  onChange={() => setHavePromo(prevState => !prevState)}
                                        />}
                                    label="I have a promo code"
                                />

                                {havePromo && <CustomTextField {...{name: 'discount_code', type: 'string', placeholder: 'Discount code'}}/>}

                            </Grid>


                            <Button type='submit' variant='contained' fullWidth style={{fontWeight: 'bold'}}>
                                Buy course for {price}
                            </Button>
                        </Grid>

                    </Form>
                )}
            </Formik>
        </>
    );

};

export default BuyCourseForm;