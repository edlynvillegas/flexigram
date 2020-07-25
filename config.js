module.exports = {
    'secret': process.env.SECRET_KEY,
    'admin_secret': process.env.ADMIN_SECRET_KEY,
    'namespace': process.env.NAMESPACE,
    firebase: {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        databaseURL: process.env.REACT_APP_BASEURL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
    },
    emailCredentials: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    }
};
