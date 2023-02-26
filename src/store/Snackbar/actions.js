import {CLOSE_SNACKBAR, OPEN_SNACKBAR} from "./types";

export const openSnackbarAction = (message, type) => ({type: OPEN_SNACKBAR, payload: {is_open: true, message, type}});
export const closeSnackbarAction = () => ({type: CLOSE_SNACKBAR, payload: {is_open: false, message: '', type: ''}});
