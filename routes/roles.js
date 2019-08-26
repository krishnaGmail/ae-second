var express = require('express');
var router = express.Router();
var Role = require('../models/Roles');


router.get('/', function (req, res, next) {

    res.render('home/roles/Roles');

});
router.get('/AddNewRole', function (req, res, next) {

    res.render('home/roles/AddNewRole');

});

router.get('/rolelist', function (req, res, next) {

    Role.getAllRoles(function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json({ "data": rows });
        }

    });

});
router.post('/', function (req, res, next) {

    Role.addRole(req.body, function (err, count) {

        //console.log(req.body);
        if (err) {
            res.json(err);
        }
        else {
          console.log(req.body);//or return count for 1 & 0
            if (req.body.projectrole.length > 0) {
                Role.getElement(req.body.Element, function (err, elements) {
                    if (err) {
                        res.json(err);
                    }
                    //  console.log(elements[0].ELEMENT_ID);
                    var projectRole = req.body.projectrole.split(',');
                    // a=[1,2,3];
                    // for (var i = 0; i < projectRole.length; i++){
                    //console.log("role=="+projectRole[i]);
                    //  }
                    // console.log("The value of a is :"+projectRole);               
                    Role.getActivity(projectRole[0], function (err, rows) {
                        if (err) {
                            res.json(err);
                        }
                        // else {
                        // console.log(res.json(rows[0]));
                        //  }

                        // console.log("act=="+activitys[0]); 
                        for (var j = 0; j < rows.length; j++) {
                            var activityid = rows[0].ACTIVITY_ID;
                        }
                        // console.log("act=="+activitys[1]); 
                        Role.getRoleId(req.body.ROLEID, function (err, roleid) {
                            if (err) {
                                res.json(err);
                            }
                            console.log(req.body.ROLEID);
                            Role.addActiveRoleEle(req.body, function (err, count) {
                                if (err) {
                                    res.json(err);
                                }
                            });
                            // console.log(req.body.ROLEID);     
                        });
                        //}
                    });




                    // }

                });
            }
            //
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