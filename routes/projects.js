var express = require('express');
var router = express.Router();
var  jwt_verify= require('../models/jwt');
var project = require('../models/projectDao');

var company=require('../models/companyDao');
var sequence=require('../models/sequenceDao');


router.get('/getRecentFiveProjectList', jwt_verify.checkToken, function (req, res, next) 
{
    if(req.decoded.userData.domid)
    {
        project.getRecentFiveProject(req.decoded.userData.domid,function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
    
        });
    }
    else
    {
        rows=[];
        res.json(rows);
       
    }
    
});
router.post('/Projectservice/addproject', jwt_verify.checkToken, function (req, res, next) {
    tokenData=req.decoded.userData;
    company.getAllLanguage(function (err, langrows) {
        company.getStatusId(tokenData.domid, 'PROJECT', 'Open', function (err, statusrows) {
           
            sequence.getChangeSeq(function (err, changerows) {
                project.addProject(req.body,tokenData.domid,changerows[0].CHANGID,langrows[0].LANGUAGE_ID,statusrows[0].STATUSID,tokenData.email, function (err, count) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    company.getStatusId(tokenData.domid, 'PROJECTMEMBER', 'Active', function (err, statusrows2) {
                        sequence.getChangeSeq(function (err, changerows) {
                            project.addProjectmember(req.body,tokenData.domid,tokenData.partid,tokenData.contactid,changerows[0].CHANGID,statusrows2[0].STATUSID,tokenData.email, function(err,count){
                                if(err){
                                    res.status(500).send(err);
                                }
                                company.getStatusId(tokenData.domid, 'PROJECTRASCI', 'Active', function (err, statusrows) {
                                    sequence.getChangeSeq(function (err, changerows) {
                                        project.getPartnerTypeId(tokenData.domid, 'Member', function (err, partnerrows) {
                                            project.addProjectrasci(req.body,tokenData.domid,tokenData.partid,tokenData.contactid,changerows[0].CHANGID,statusrows[0].STATUSID,partnerrows[0].PARTYPEID,tokenData.email, function(err,count){
                                                if(err){                                                
                                                    res.status(500).send(err);
                                                }
                                                project.getmaildetails(function (err, rows) {
                                                    if (err) {
                                                        res.json(err);
                                                    }
                                                    else {
                                                        //sendemail.projectmail(rows[0]);
                                                        res.status(200).send({ success: true, msg: "" });
                                                    }
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
router.get('/Projectservice/recfiveprojectlist', jwt_verify.checkToken, function (req, res, next){
    var domid=req.decoded.userData.domid;
    project.getRecentFiveProject(domid,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
})
module.exports = router;

