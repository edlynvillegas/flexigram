var path = require('path')

module.exports = {
    getKeyUsingBearer: (BearerKey) => {
        let getToken = BearerKey;
        let getTokenresult = getToken.slice(7, getToken.length);
        return getTokenresult;
    },
    generateFormErrorMessage: (error) => {
        const error_msg = {
            'duplicate/email': { email: 'Email address is already in use by another account' },
            'duplicate/username': { username: 'Username is already taken' },
            'auth/wrong-password': { password: 'Password is invalid' },
            'auth/user-not-found': { email: 'No user found with this email' }
        }
        return error_msg[error.code]
    },
    parseCookies: (req_cookies) => {
        var cookies = {};
        if (req_cookies) {
            req_cookies.split(';').forEach(cookie => {
                var parts = cookie.match(/(.*?)=(.*)$/)
                cookies[parts[1].trim()] = (parts[2] || '').trim()
            })
            return cookies;
        }
        return null;
    },
    UPLOAD_PATH: path.join(__dirname, '../../../tmp/flexigram')
}