import Cookies from 'universal-cookie';
const cookies = new Cookies();

const HELPERS = {
    USER_API_URL: 'http://backend.localhost:8080/api/user',
    getUserHTTPOpts: () =>  {
        const token = cookies.get('auth_token')
        return {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token}
    }
}

export default HELPERS;