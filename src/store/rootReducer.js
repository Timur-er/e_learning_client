import {userReducer} from "./User/userReducer";
import {combineReducers} from "redux";
import {routesReducer} from "./Routes/routesReducer";
import {createCourseReducer} from "./CreateCourse/createCourseReducer";
import {snackbarReducer} from "./Snackbar/snackbarReducer";

const rootReducer = combineReducers({
    user: userReducer,
    availableRoutes: routesReducer,
    create_course: createCourseReducer,
    snackbar: snackbarReducer,
});

export default rootReducer;