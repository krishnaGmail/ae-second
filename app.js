'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var companypRouter = require('./routes/company');
var projectRouter = require('./routes/projects');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/ae-second')));
app.use(session({ secret: 'vsurve', saveUninitialized: false, resave: false }));

app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/company', companypRouter);
app.use('/api/project', projectRouter);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ae-second/index.html'));
});
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
