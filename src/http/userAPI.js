import {$authHost, $host} from './index';

export const registrationAPI = async (email, name, phone_number, birth_date, password) => {
    return await $host.post('api/user/registration', {email, name, phone_number, birth_date, password});
}

export const loginAPI = async (email, password) => {
    return await $host.post('api/user/login', {email, password})
}

export const checkAuthAPI = async (token) => {
    const response = await $host.post('api/user/check', {token})
    return response
}

export const getNewAccessTokenAPI = async () => {
    const response = await $host.get('api/user/refresh');
    return response;
}

export const getAllUsers = async () => {
    const users = await $authHost.get('api/user/getAllUsers');
    return users;
}