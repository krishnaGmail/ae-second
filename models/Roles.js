var db = require('../config/db');

var Role = {

    getAllRoles: function (callback) {

        return db.exec("Select * from MALASHREE.ROLE", callback);

    },
    getRoleById: function (id, callback) {

        return db.exec("select * from MALASHREE.ROLE where Id=?", [id], callback);
    },
    getRoleId: function (id, callback) {

      db.prepare("select * from MALASHREE.ROLE where Roleid=?", function (err, statement) {
        if (err) {
            return console.error('Prepare error:', err);
        }
        return statement.exec([id], callback) ;
    });
    },
    addRole: function (Role, callback) {
        console.log("inside service");
        var data = [
            Role.ROLEID,Role.DEFAULTROLE,Role.DESCRIPTION,Role.ROLENAME, 100];
            db.prepare('insert into MALASHREE.ROLE values(?,?,?,?,?)', function (err, statement) {               
                    if (err) {
                        return console.error('Prepare error:', err);
                    }
                    return statement.exec(data, callback) ;      
            });         
    },
    addActiveRoleEle: function (Role,eleid,actid,callback) {
       console.log("inside role element service--"+ eleid);
        //console.log("inside role element service ///"+ acivity);
        var data = [
            Role.ROLEID,100,actid,eleid,1];            
            db.prepare('insert into "MALASHREE"."ACTIVEROLEELEMENT"(ROLE_IDFK,DOMAIN_IDFK,ACTIVITY_IDFK,ELEMENT_IDFK,STATUS_IDFK) values(?,?,?,?,?)', function (err, elestatement) {
               //1,now(),'Jan 11, 9999 1:30:00.0 PM',111,101,1115,1011,11
                    if (err) {
                        return console.error('Prepare error:', err);
                    }
                    return elestatement.exec(data, callback) ;      
            });         
    },
    getElement: function (desc, callback) {
        console.log("inside Element service");
        console.log("desc==="+desc);
       /* var data = [
            1014,Role.DEFAULTROLE, Role.DESCRIPTION,Role.ROLENAME, 100]; */           
           db.prepare('select * from "MALASHREE"."ELEMENT" where description=?',function (err, statement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return statement.exec([desc], callback) ;                  
                       
        });         
    },
       getActivity: function (desc, callback) {
        console.log("inside ACTIVITY service");
       console.log("desc==="+desc);
       /* var data = [
            1014,Role.DEFAULTROLE, Role.DESCRIPTION,Role.ROLENAME, 100]; */           
            db.prepare('Select * from  "MALASHREE"."ACTIVITY" WHERE description=?', function (err, actstatement) {
                if (err) {
                    return console.error('Prepare error:', err);
                }
            return actstatement.exec([desc], callback) ;                 
                       
        });         
    },
    deleteRole: function (id, callback) {
        return db.query("delete from task where Id=?", [id], callback);
    },
    updateRole: function (id, Task, callback) {
        return db.query("update task set Title=?,Status=? where Id=?", [Task.Title, Task.Status, id], callback);
    },
    deleteAll: function (item, callback) {

        var delarr = [];
        for (i = 0; i < item.length; i++) {

            delarr[i] = item[i].Id;
        }
        return db.query("delete from task where Id in (?)", [delarr], callback);
    }
};
module.exports = Role;