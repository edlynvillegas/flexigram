const serviceAccount = require('../serviceAccountKey.json')
const CONFIG = require('../config')
const firebaseAdmin = require('firebase-admin')
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://instagram-clone-6ed51.firebaseio.com"
});

// Initialize Firebase SDK
firebase.initializeApp(CONFIG.firebase);

var fireApp = {};
fireApp.firebase = firebase;
fireApp.auth = firebase.auth();

fireApp.adminAuth = firebaseAdmin.auth();
fireApp.firestore = firebaseAdmin.firestore();

module.exports = fireApp;