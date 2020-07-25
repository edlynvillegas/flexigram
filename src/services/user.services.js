import axios from 'axios';
import HELPERS from '../helpers'
import { refreshToken, logOutUser } from './auth.services'
import Cookie from 'universal-cookie'
const cookies = new Cookie();

axios.interceptors.response.use(undefined, err => {
    const error = err.response;
    const token = cookies.get('auth_token')
    // if error is 401 & has token
    if (token) {
        if (error.status===401 && error.config && !error.config.__isRetryRequest) {
            // request for a new token
            return refreshToken(token).then(response => {
                cookies.set('auth_token', response.data.ref_token)
                // update the error config with new token
                error.config.__isRetryRequest = true;
                error.config.headers.Authorization = `Bearer ${response.data.ref_token}`
                return axios(error.config);
            });
        }
    } else {
        return logOutUser()
            .then(res => {
                cookies.remove('auth_token')
                console.log('** User forced log out! **')
            })
    }
});

export const getUserInfo = () => {
    return axios.get(HELPERS.USER_API_URL+'/info', {headers: HELPERS.getUserHTTPOpts(), withCredentials: true})
}

export const sharePost = (data) => {
    return axios.post(HELPERS.USER_API_URL+'/share-post', data, {headers: HELPERS.getUserHTTPOpts(), withCredentials: true})
}