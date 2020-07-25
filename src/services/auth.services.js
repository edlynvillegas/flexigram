import axios from 'axios';
import HELPERS from '../helpers'

export const signInUser = (data) => {
    return axios.post(HELPERS.USER_API_URL+'/auth/sign-in', data, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
}

export const signUpUser = (data) => {
    return axios.post(HELPERS.USER_API_URL+'/auth/sign-up', data, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
}

export const verifyToken = (token) => {
    return axios.get(HELPERS.USER_API_URL+'/auth/verify-token/'+token, {withCredentials: true})
}

export const refreshToken = (token) => {
    console.log('call refresh token')
    return axios.get(HELPERS.USER_API_URL+'/auth/refresh-token/'+token, {withCredentials: true})
}

export const logOutUser = () => {
    return axios.get(HELPERS.USER_API_URL+'/auth/logout', {headers: {'Content-Type': 'application/json'}, withCredentials: true})
}