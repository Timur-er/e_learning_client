import {LOGIN_FUNCTIONS, LOGIN_USER, LOGOUT} from "./types";
import initialStore from '../initialStore';

export function userReducer(user = initialStore.user, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case LOGIN_FUNCTIONS:
            return {...user, ...action.payload};
        case LOGOUT:
            return {...initialStore.user}
        default:
            return user;
    }
}