import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {loginUserOperation} from "../store/User/operations";
import {getNewAccessTokenAPI} from "../http/userAPI";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const login = useCallback( (user_id, email, name, phone_number, birth_date, role, jwt_token) => {
        dispatch(loginUserOperation(user_id, email, name, phone_number, birth_date, role,))
        localStorage.setItem('jwt_token', JSON.stringify(jwt_token));
    }, [dispatch])

    useEffect( () => {
        setLoading(true)
        async function refreshUserData() {
            const token = JSON.parse(localStorage.getItem('jwt_token'));
            if (token) {
                const new_access_token = await getNewAccessTokenAPI();
                const newToken = new_access_token.data.access_token;
                const {user_id, email, name, phone_number, birth_date, role} = new_access_token.data.user;
                login(user_id, email, name, phone_number, birth_date, role, newToken);
            }
        }
        refreshUserData();
        setLoading(false)
    }, [login])

    return {login, loading}
}