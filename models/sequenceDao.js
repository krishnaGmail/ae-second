var db = require('../config/db');
var sequence = {
getDomainSeq: function (callback) {
    return db.exec('SELECT DOMAIN_ID.NEXTVAL as domid FROM DUMMY limit 1', callback);
},
getChangeSeq: function (callback) {
    return db.exec('SELECT CHANGE_ID.NEXTVAL as changid FROM DUMMY limit 1', callback);
},
getPartnerSeq: function (callback) {
    return db.exec('SELECT PARTNER_ID.NEXTVAL as partnerid FROM DUMMY limit 1', callback);
},
getStatusSeq: function (callback) {
    return db.exec('SELECT STATUS_ID.NEXTVAL as statusid FROM DUMMY limit 1', callback);
},
getContactSeq: function (callback) {
    return db.exec('SELECT CONTACT_ID.NEXTVAL as contactid FROM DUMMY limit 1', callback);
},
getRoleSeq: function (callback) {
    return db.exec('SELECT ROLE_ID.NEXTVAL as roleid FROM DUMMY limit 1', callback);
},
}
module.exports = sequence;