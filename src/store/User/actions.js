import {LOGIN_USER, LOGIN_FUNCTIONS, LOGOUT} from "./types";

export const loginUser = user => ({type: LOGIN_USER, payload: user});
export const authFunctionsActions = login => ({type: LOGIN_FUNCTIONS, payload: login})
export const logoutUser = () => ({type: LOGOUT})