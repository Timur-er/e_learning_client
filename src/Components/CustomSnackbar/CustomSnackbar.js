import React, {useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getIsOpen, getSnackbarMessage, getSnackbarType} from "../../store/Snackbar/selectors";
import {closeSnackbarAction} from "../../store/Snackbar/actions";

const CustomSnackbar = () => {
    const is_open = useSelector(getIsOpen);
    const message = useSelector(getSnackbarMessage);
    const type = useSelector(getSnackbarType);
    const dispatch = useDispatch()

    const color = () => {
        switch (type) {
            case 'error':
                return '#d84e4b';
            case 'success':
                return '#519a52'
            default:
                return 'white'
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeSnackbarAction())
    };

    if (!is_open) return;

    return (
        <Snackbar
            open={is_open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                sx={{width: '100%', backgroundColor: color, color: 'white'}}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;