var express = require('express');
var router = express.Router();
var Signup = require('../models/signupDao');
var sf=require('../models/sharedfunctions');
let jwt = require('jsonwebtoken');
 router.get('/check', function (req, res, next) {
     Signup.getAllSignup(function (err, rows) {
         if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
     });
 });
router.post('/create', function (req, res, next) {
    Signup.getDistinctEmail(req.body.email, function (err, rows) {
        console.log(rows.length);
        if (err) {
            res.status(500).send({ error: 'Something failed!' });
        }
        else {
            if (rows.length > 0) {
                res.status(200).send({ success: false, msg: "Email ID already exists" });
             } else {
                Signup.addSignup(req.body, function (err, count) {                   
                    if (err) {
                        res.status(500).send({ error: 'Something failed!' });
                    }
                    var  userData={};
                    userData.fname = req.body.fname;
                    userData.lname = req.body.lname;
                    userData.email = req.body.email;
                    userData.flag = 1;
                    let token = jwt.sign({userData: userData},
                        'vsurve',
                        { expiresIn: '24h' // expires in 24 hours
                        }
                      );                         
                      res.status(200).send({ success: true , userData:userData, token:token});
                });
            }
        }
    });
});
router.post('/:id', function (req, res, next) {
    Task.deleteAll(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }
    });
});
router.delete('/:id', function (req, res, next) {
     Task.deleteTask(req.params.id, function (err, count) {
         if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }
     });
});
router.put('/:id', function (req, res, next) {
     Task.updateTask(req.params.id, req.body, function (err, rows) {
         if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
module.exports = router;