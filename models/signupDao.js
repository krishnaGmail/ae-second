var db = require('../config/db');

var signup = {

    getAllSignup: function (callback) {

        return db.exec("select * from MALASHREE.SIGNUP", callback);

    },    
    getDistinctEmail: function (signup, callback) {
        console.log("inside Email service---"+signup);
        db.prepare("select distinct email AS emaildata from MALASHREE.SIGNUP where email=?", function (err, statement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return statement.exec([signup], callback) ;
        });
    },
    addSignup: function (signup, callback) {
        console.log("inside signup service");
        // change 1st value of data array 
        var data = [ 45,signup.email, signup.fname, "1", signup.lname, signup.pwd, signup.phone];
            db.prepare('insert into MALASHREE.SIGNUP values(?,?,?,?,?,?,?)', function (err, statement) {
            
                if (err) {
                    return console.error('Prepare error:', err);
                }
                return statement.exec(data, callback) ;
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
module.exports = signup;