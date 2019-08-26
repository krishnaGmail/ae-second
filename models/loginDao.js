var db = require('../config/db');

var login = {
    getLoginByEmail: function (login, callback) {

        db.prepare('select * from MALASHREE.SIGNUP where EMAIL=? and PASSWORD=?', function (err, statement) {
            //db.end();
            if (err) {
                return console.error('Prepare error:', err);
            }
         return statement.exec([login.email, login.pwd], callback);
    });
}
    
};

module.exports = login;