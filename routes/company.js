var express = require('express');
var router = express.Router();
var company = require('../models/companyDao');

router.post('/create', function (req, res, next) {
    company.getAllDomain(req.body.description,function (err, rows) {
        //console.log(rows.length);
        if (err) {
            res.status(500).send({ error: 'Something failed!' });
        }
        else {
            if (rows.length > 0) {
                res.status(200).send({ success: false, msg: "Workspace is already exists" });

            }else{   
                company.addDomain(req.body,function (err, rows) {
                    company.addPartner(req.body, function (err, rows) {
                        company.updateFlag(req.session.email, function (err, rows) {
                            if (err) {
                                res.status(500).send({ error: 'Something failed!' });
                            }
                            req.session.flag = 0;
                            req.session.description = req.body.description;
                            res.status(200).send({ success: true, msg: req.body.description });
                        });
                    });
                });
            }
        }
        });
    });

module.exports = router;