var express = require('express');
var router = express.Router();
var company = require('../models/companyDao');
var Signup = require('../models/signupDao');
var userSession = require('../models/sharedfunctions');
var sequence = require('../models/sequenceDao');
let jwt = require('jsonwebtoken');
var  jwt_verify= require('../models/jwt');

router.post('/create', jwt_verify.checkToken, function (req, res, next) {
    
    tokenData=req.decoded.userData;
    company.getAllDomain(req.body.description, function (err, rows) {
        
        if (err) {
            res.status(500).send({ error: 'Something failed!' });
        }
        else {
            if (rows.length > 0) {
                res.status(200).send({ success: false, msg: "Workspace is already exists" });
            } else {
                sequence.getDomainSeq(function (err, domrows) {
                    domid = domrows[0].DOMID;
                    sequence.getChangeSeq(function (err, changerows) {
                        company.getAllLanguage(function (err, langrows) {
                            company.addDomain(req.body, domid, changerows[0].CHANGID, langrows[0].LANGUAGE_ID, tokenData.email, function (err, rows) {
                                company.getStatusId(domid, 'PARTNER', 'Active', function (err, statusrows) {
                                   
                                    sequence.getPartnerSeq(function (err, parnerrows) {
                                        company.addPartner(req.body, parnerrows[0].PARTNERID, changerows[0].CHANGID, langrows[0].LANGUAGE_ID, domid, statusrows[0].STATUSID, tokenData.email, function (err, rows) {
                                            Signup.getSignupbyEmail(tokenData.email, function (err, rowdata) {
                                                company.getStatusId(domid, 'PARTNERCONTACT', 'Active', function (err, statusrows) {
                                                    sequence.getContactSeq(function (err, contactrows) {
                                                        company.addContacts(contactrows[0].CONTACTID, domid, parnerrows[0].PARTNERID, changerows[0].CHANGID, rowdata[0].FIRSTNAME, rowdata[0].LASTNAME, rowdata[0].EMAIL, rowdata[0].PHONENO, statusrows[0].STATUSID, tokenData.email, function (err, rows) {
                                                            company.addCredens(req.body, contactrows[0].CONTACTID, rowdata[0].PASSWORD, parnerrows[0].PARTNERID, domid, changerows[0].CHANGID, tokenData.email, function (err, rows) {
                                                                company.updateFlag(tokenData.email, function (err, rows) {
                                                                    company.getContactIdByEmail(tokenData.email, function (err, sesionrows) {
                                                                        if (err) {
                                                                            res.status(500).send({ error: 'Something failed!' });
                                                                        }
                                                                        var  userData={};
                                                                        userData.fname = tokenData.fname;
                                                                        userData.lname = tokenData.lname;
                                                                        userData.email = tokenData.email;
                                                                        userData.flag = 0;
                                                                        userData.domid =domid;
                                                                        if (sesionrows.length > 0 ) {
                                                                            userData.partid= sesionrows[0].PARTNER_IDFK;
                                                                            userData.contactid== sesionrows[0].CONTACT_ID;
                                                                        } else {
                                                                            userData.partid= 0;
                                                                            userData.contactid = 0;
                                                                        }
                                                                        userData.description= req.body.description;
                                                                      
                                                                        let token = jwt.sign({userData: userData},
                                                                            'vsurve',
                                                                            { expiresIn: '24h' // expires in 24 hours
                                                                            }
                                                                          );                         
                                                                            res.status(200).send({ success: true , userData:userData, token:token});
                                                                              
                                                                          
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        }
    });
});

module.exports = router;