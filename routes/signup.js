var express = require('express');
var router = express.Router();
var Signup = require('../models/signupDao');


router.get('/', function (req, res, next) {
    if (req.session.vs_login) {
        res.redirect('/dashboard');
    }
    else {
        res.render('SignUpDetails');
    }


});

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
                    console.log(req.body);
                    if (err) {
                        res.status(500).send({ error: 'Something failed!' });
                    }
                    req.session.fname = req.body.fname;
                    req.session.lname = req.body.lname;
                    req.session.email = req.body.email;
                    req.session.flag = 1;
                    req.session.vs_login = true;
                    res.status(200).send({ success: true, msg: "" });
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