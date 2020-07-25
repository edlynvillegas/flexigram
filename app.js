const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var vhost = require('vhost');
var compression = require('compression');
var cors = require('cors');
require('dotenv').config()
let allowOrigin = 'http://localhost:8000';

// ADMIN
var adminAuth = require('./apis/admin/auth');
// USER
var user = require('./apis/user/user');
var userAuth = require('./apis/user/auth');

var app = express();
var front = express();
var backend = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: allowOrigin }));
app.use(cookieParser(process.env.SECRET_KEY));



backend.use(compression());
backend.use(express.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
backend.use(express.json());
backend.use(cookieParser());

backend.all("/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Authorization, Content-Type, X-Requested-With, X-User-Password");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use(vhost('localhost', front));
app.use(vhost('backend.localhost', backend));

// ADMIN
backend.use('/api/admin', adminAuth);
// USER
backend.use('/api/user', user);
backend.use('/api/user/auth', userAuth);

app.listen(8080, () => {
  console.log(`Server running at: http://localhost:8080/`);
});