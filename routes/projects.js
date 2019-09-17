var express = require('express');
var router = express.Router();
var  jwt_verify= require('../models/jwt');
var project = require('../models/projectDao');

var company=require('../models/companyDao');
var sequence=require('../models/sequenceDao');
var sf=require('../models/sharedfunctions');


router.get('/getRecentFiveProjectList', jwt_verify.checkToken,function (req, res, next) 
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

module.exports = router;

