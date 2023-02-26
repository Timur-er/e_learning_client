import initialStore from "../initialStore";
import {CLOSE_SNACKBAR, OPEN_SNACKBAR} from "./types";

export function snackbarReducer(snackbar = initialStore.snackbar, action) {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return action.payload
        case CLOSE_SNACKBAR:
            return action.payload
        default:
            return snackbar
    }
}