import {loginUser} from "./actions";

export const loginUserOperation = (user_id, email, name, phone_number, birth_date, role,) => dispatch => {
    const user = {user_id, email, name, phone_number, birth_date, role, is_auth: true}
    dispatch(loginUser(user))
}