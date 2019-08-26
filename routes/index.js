'use strict';

var express = require('express');
var login = require('../models/loginDao');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('api works');
  });

router.post('/login/check', function (req, res, next) {
    login.getLoginByEmail(req.body,function (err, rows) {
        if (err) {
            res.status(500).send('Email not exist');
        }
        
        else { 
            if (rows.length > 0)
            {
                req.session.fname = rows[0].FIRSTNAME;
                req.session.lname = rows[0].LASTNAME;
                req.session.email = rows[0].EMAIL;
                req.session.flag = rows[0].FLAG;
                req.session.vs_login = true;
                res.status(200).send({ success:true});
            }
            else
            {
                res.status(200).send({ success:false , msg:"Invalid Email ID or Password."});
            }                
        }
    });    
});


module.exports = router;
