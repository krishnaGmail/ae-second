var db = require('../config/db');

var company = {

    getAllDomain: function (companydesc, callback) {     
        var descriptionL = companydesc.toLowerCase();
        db.prepare('select distinct description AS descriptiondata from MALASHREE.DOMAIN where lower(description)=?', function (err, checkstatement) {
            //client.end();
            if (err) {
                return console.error('Prepare error:', err);
            }
            return checkstatement.exec([descriptionL], callback)
        });

    },
    addDomain: function (company, callback) {        
        db.prepare('insert into MALASHREE.DOMAIN values(?,?)', function (err, statement){
            //client.end();s
            if (err) {
                return console.error('Prepare error:', err);
            }
            return statement.exec([112, company.description], callback)
        });
    },
    addPartner: function (company, callback) {        
        db.prepare('insert into MALASHREE.PARTNER values(?,?,?,?)', function (err, parstatement) {
            //client.end();s
            if (err) {
                return console.error('Prepare error:', err);
            }
            return parstatement.exec([10009, company.partnername, company.industrytype, 112], callback) ;
        });
    },
    updateFlag: function (email, callback) {        
        db.prepare('UPDATE "MALASHREE"."SIGNUP" SET flag=? where email=?', function (err, upparstatement) {
            //client.end();s
            if (err) {
                return console.error('Prepare error:', err);
            }
            return upparstatement.exec(['0', email], callback) ;
        });
    },

    }  
    module.exports = company;