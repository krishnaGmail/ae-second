let jwt = require('jsonwebtoken');
var express = require('express');
var login = require('../models/loginDao');
var sf = require('../models/sharedfunctions');
var router = express.Router();
var company = require('../models/companyDao');


router.post('/check', function (req, res, next) {
    login.getLoginByEmail(req.body, function (err, rows) {        
        if (err) {
            res.status(500).send('Email not exist');
        }
        else {
            if (rows.length > 0) {
                company.getDomainById(rows[0].EMAIL, function (err, domaindata) {
                    company.getAllLanguage(function (err, langrows) {
                        company.getContactIdByEmail( rows[0].EMAIL,function (err, sesionrows) {  
                            var  userData={};
                            userData.fname = rows[0].FIRSTNAME;
                            userData.lname = rows[0].LASTNAME;
                            userData.email = rows[0].EMAIL;
                            userData.flag = rows[0].FLAG;
                            if(userData.flag==0)
                            {
                                userData.domid = domaindata[0].DOMAIN_ID;
                                userData.description = domaindata[0].DESCRIPTION;
                           
                                userData.partid=sesionrows[0].PARTNER_IDFK;
                                 userData.contactid=sesionrows[0].CONTACT_ID;
                            }
                            
                            
                           let token = jwt.sign({userData: userData},
                              'vsurve',
                              { expiresIn: '24h' // expires in 24 hours
                              }
                            );                         
                              res.status(200).send({ success: true , userData:userData, token:token});
                                
                            });
                        });
                    });
               // });               
            }
            else {
                res.status(200).send({ success: false, msg: "Invalid Email ID or Password." });
            }
        }

    });
});


module.exports = router;
