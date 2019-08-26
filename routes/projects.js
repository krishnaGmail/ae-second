var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    res.render('home/project/ProjectDashboard');

});

router.get('/AddProjectMod', function (req, res, next) {

    res.render('home/project/AddProjectMod');

});


module.exports = router;

