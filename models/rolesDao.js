var db = require('../config/db');

var Role = {

    getAllRoles: function (callback) {

        return db.exec("Select * from MALASHREE.ROLE", callback);

    },
    getRoleById: function (id, callback) {

        return db.exec("select * from MALASHREE.ROLE where Id=?", [id], callback);
    },
    getRoleId: function (id, callback) {
       // select * from "MALASHREE"."ROLE" where domain_idfk=142;
      db.prepare('select * from "MALASHREE"."ROLE" where domain_idfk=?', function (err, statement) {
        if (err) {
            return console.error('Prepare error:', err);
        }
        return statement.exec([id], callback) ;
    });
    },     
    addRole: function (Role,roleid,changid,email,domid,langid,callback) {
        console.log("inside service---"+domid);
       console.log("inside service---"+roleid);
        var data = [            
            roleid,domid,langid,changid,Role.DESCRIPTION,'0',email,Role.ROLENAME];
            db.prepare('insert into MALASHREE.ROLE(ROLE_ID,DOMAIN_IDFK,LANGUAGE_IDFK,CHANGE_ID,DESCRIPTION,DEFAULTDATA,CREATEDBY,ROLENAME) values(?,?,?,?,?,?,?,?)', function (err, statement) {               
                    if (err) {
                        return console.error('Prepare error:', err);
                    }
                    return statement.exec(data, callback) ;      
            });         
    },
    addActiveRoleEle: function (Role,roleid,email,eleid,actid,changid,domid,langid,callback) {     
        var data = [
            roleid,domid,actid,eleid,changid,19,langid,email];            
            db.prepare('insert into "MALASHREE"."ACTIVEROLEELEMENT"(ROLE_IDFK,DOMAIN_IDFK,ACTIVITY_IDFK,ELEMENT_IDFK,CHANGE_ID,STATUS_IDFK,LANGUAGE_IDFK,CREATEDBY) values(?,?,?,?,?,?,?,?)', function (err, elestatement) {
                    if (err) {
                        return console.error('Prepare error:', err);
                    }
                    return elestatement.exec(data, callback) ;      
            });         
    },
    getElement: function (desc, callback) {                
           db.prepare('select * from "MALASHREE"."ELEMENT" where description=?',function (err, statement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return statement.exec([desc], callback) ;                  
                       
        });         
    },
       getActivity: function (desc, callback) {                
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