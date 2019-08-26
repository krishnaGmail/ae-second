 var express = require('express');
var router = express.Router();
var session = require('express-session');
router.get('/', function (req, res, next) {

    // if (req.session.vs_login) {
    //     var fname = req.session.fname;
    //     var lname = req.session.lname;
    //     var flag = req.session.flag;
    //     var name = (fname.substring(0, 1) + lname.substring(0, 1)).toUpperCase();
       
    //     res.render('home/Dashboard', { name: name, email: req.session.email, fname: fname, lname: lname, prj_total: 0, tkt_total: 0, user_total: 0, flag: flag, description:"V3iTConsulting" });
    // }
    // else {
    //     res.redirect("/");
    // }

    
    res.render('home/Dashboard',{ flag: 1 });
   
   
});


module.exports = router;