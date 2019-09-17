var db = require('../config/db');

var company = {    
    getStatusId: function(domid,apptable,desc,callback){
       return db.prepare('select status_id as statusid from MALASHREE.STATUS WHERE APPLICABLETABLE=? AND DESCRIPTION=? AND DOMAIN_IDFK=?',function (err, statement) {
       if (err) {
        return console.error('Prepare error:', err);
    }
      return statement.exec([apptable,desc,domid], callback) ;
    });
    },
    getAllDomain: function (companydesc, callback) {
        var descriptionL = companydesc.toLowerCase();
        db.prepare('select distinct description AS descriptiondata from MALASHREE.DOMAIN where lower(description)=?', function (err, checkstatement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return checkstatement.exec([descriptionL], callback)
        });
    },
    getDomainById: function (email, callback) {     
        db.prepare('select * from "MALASHREE"."DOMAIN" where createdby =?', function (err, checkstatement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return checkstatement.exec([email], callback)
        });
    },
    getContactIdByEmail: function (email, callback) {     
        db.prepare('select contact_id,partner_idfk from "MALASHREE"."PARTNERCONTACT" where email=?', function (err, checkstatement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return checkstatement.exec([email], callback)
        });
    }, 
    getAllLanguage: function (callback) {
        return db.exec('select LANGUAGE_ID from "MALASHREE"."LANGUAGE"', callback);
    },
    addDomain: function (company,domid,changid,langid,email, callback) {
        db.prepare('insert into MALASHREE.DOMAIN(DOMAIN_ID,LANGUAGE_IDFK,CHANGE_ID,DESCRIPTION,CREATEDBY) values(?,?,?,?,?)', function (err, statement) {
              if (err) {
                return console.error('Prepare error:', err);
            }            
            return statement.exec([domid, langid, changid, company.description,email], callback)
        });
    },
    addPartner: function (company,partnerid,changid,langid,domid,stsid,email,callback) {
        db.prepare('insert into MALASHREE.PARTNER(PARTNER_ID,DOMAIN_IDFK,CHANGE_ID,PARTNERNAME,STATUS_IDFK,LANGUAGE_IDFK,INDUSTRYTYPE,CREATEDBY) values(?,?,?,?,?,?,?,?)', function (err, parstatement) {
             if (err) {
                return console.error('Prepare error:', err);
            }         
            return parstatement.exec([partnerid,domid,changid,company.partnername,stsid,langid,company.industrytype,email], callback);
        });
    },
    updateFlag: function (email, callback) {
        db.prepare('UPDATE "MALASHREE"."SIGNUP" SET flag=? where email=?', function (err, upparstatement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return upparstatement.exec(['0', email], callback);
        });
    },
    addContacts: function (contactid,domid,partnerid,changeid,fname,lname,email,phoneno,stsid,cemail, callback) {
                 db.prepare('insert into "MALASHREE"."PARTNERCONTACT"(CONTACT_ID,DOMAIN_IDFK,PARTNER_IDFK,change_id,FIRSTNAME,LASTNAME,EMAIL,phone,MOBPHONE,othercontact,fax,STATUS_IDFK,CREATEDBY)values(?,?,?,?,?,?,?,?,?,?,?,?,?)', function (err, contactstmt) {
            if (err) {
                return console.error('Prepare error:', err);
                console.log("err==="+err);
            }            
            return contactstmt.exec([contactid,domid,partnerid,changeid,fname,lname,email,123456,3242343256,991634667,45666,stsid,cemail], callback);
        });
    },
    addCredens: function (data, contactid,password,partnerid,domid,changeid,cemail, callback) {     
        db.prepare('insert into "MALASHREE"."PARTNERCREDEN"(contact_idfk,partner_idfk,domain_idfk,change_id,password,CREATEDBY,CREATEDDATE) values(?,?,?,?,?,?,?)', function (err, contactstmt) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return contactstmt.exec([contactid,partnerid,domid,changeid,password,cemail,'2019-08-29 00:00:00'], callback);
        });
    },
    getDomainByEmail: function (email, callback) {
        db.prepare('select dom.domain_id,dom.description from MALASHREE.SIGNUP sig, MALASHREE.DOMAIN dom where sig.email=?', function (err, checkstatement) {
            if (err) {
                return console.error('Prepare error:', err);
            }
            return checkstatement.exec([email], callback);
        });
    },

}
module.exports = company;