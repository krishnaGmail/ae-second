var db = require('../config/db');
var sharedfunc=require('./sharedfunctions');
var prjseq;
var project = {
    
    addProject: function (project,domid,changid,languageid,statusid,email, callback) {
        db.exec('SELECT SEQ_PROJECT_ID.NEXTVAL FROM DUMMY limit 1', function (err, rows) {
            if (err) {
                return console.error('Execute error:', err);
            }
            console.log('selected the next sequence');
            var prjseq = rows[0]['SEQ_PROJECT_ID.NEXTVAL'];
            var currts=sharedfunc.curr_TimeStamp();
            var actstartdate=sharedfunc.getToDate(project.actstartdate);
            var actenddate=sharedfunc.getToDate(project.actenddate);
            var planstartdate=sharedfunc.getToDate(project.planstartdate);
            var planenddate=sharedfunc.getToDate(project.planenddate);
            var data = [prjseq, domid, changid, languageid, project.description, project.priority,actstartdate,actenddate,planstartdate,planenddate,statusid,project.projectname,email,currts,'',null];
            db.prepare('insert into MALASHREE.PROJECT values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', function (err, statement) {
                    if (err) {
                    console.log('dberror issue'  ,err);
                    return console.error('Prepare error:', err);
                }
                console.log('inserted the sequence');
                return statement.exec(data, callback);
            });
        });
    },
   

    addProjectmember: function(project,domid,partnerid,contactid,changid,statusid,email, callback){
        db.exec('SELECT MAX(PROJECT_ID) AS PRJCTID FROM "MALASHREE"."PROJECT" LIMIT 1', function (err, rows) {
            if (err) {
                return console.error('Execute error:', err);
            }
            prjseq = rows[0]['PRJCTID'];
            var currts=sharedfunc.curr_TimeStamp();
            var data = [prjseq, domid, partnerid, contactid, changid, 'primary', '2019-03-02 00:00:00', '2019-03-02 00:00:00',statusid,email ,currts,'',null];
            db.prepare('insert into MALASHREE.PROJECTMEMBER values(?,?,?,?,?,?,?,?,?,?,?,?,?)', function (err, statement) {
                //db
                if (err) {
                    console.log('dberror issue'  ,err);
                    return console.error('Prepare error:', err);
                }
                console.log('inserted the sequence');
                return statement.exec(data, callback);      
            });
        });
    },
    addProjectrasci: function(project,domid,partnerid,contactid,changid,statusid,partypeid,email, callback){
        db.exec('SELECT MAX(PROJECT_ID) AS PRJCTID FROM "MALASHREE"."PROJECT" LIMIT 1', function (err, rows) {
            if (err) {
                return console.error('Execute error:', err);
            }
            console.log('selected the current sequence');
            prjseq = rows[0]['PRJCTID'];
            var currts=sharedfunc.curr_TimeStamp();
            var data = [prjseq, domid, partnerid, contactid, changid,partypeid, 'r,a,s,c,i', '2019-03-02 00:00:00', '2019-03-02 00:00:00',statusid,email ,'2019-03-02 00:00:00','',null];
            db.prepare('insert into MALASHREE.PROJECTRASCI values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', function (err, statement) {
                if (err) {
                    console.log('dberror issue'  ,err);
                    return console.error('Prepare error:', err);
                }
                console.log('inserted the sequence');
                return statement.exec(data, callback);      
            });
        });
    },

    getAdminProject: function (domid,callback) {
        return db.exec("select distinct(prj.project_id) as project_id,TO_VARCHAR (TO_DATE(prj.actstartdate),'MM/DD/YYYY')as actstartdate,"
        +" TO_VARCHAR (TO_DATE(prj.actenddate), 'MM/DD/YYYY')as actenddate, prj.description, "
        +"TO_VARCHAR (TO_DATE(prj.planstartdate), 'MM/DD/YYYY')as planstartdate, TO_VARCHAR (TO_DATE(prj.planenddate), 'MM/DD/YYYY')as planenddate,"
        +" prj.priority,prj.projectname,sts.description as status, prj.status_idfk, prj.createdby from MALASHREE.PROJECT prj,MALASHREE.STATUS sts,"
        +" MALASHREE.PARTNERCONTACT pcon, MALASHREE.DOMAIN dom where  prj.domain_idfk="+domid+" and prj.domain_idfk=dom.domain_id and prj.status_idfk=sts.status_id and dom.domain_id=sts.domain_idfk ORDER BY prj.project_id DESC", callback);
    },

    getmaildetails: function(callback){
            return db.exec("select  prj.project_id,prj.projectname,prj.priority,prj.domain_idfk,"
            +"TO_VARCHAR (TO_DATE(prj.planstartdate)) as planstartdate,TO_VARCHAR (TO_DATE(prj.planenddate)) as planenddate,"
            +"prj.status_idfk,pcon.email from MALASHREE.PROJECT prj,MALASHREE.PROJECTMEMBER prjmem,MALASHREE.PARTNERCONTACT pcon"
            +" where prj.project_id="+prjseq+" and prj.project_id=prjmem.project_idfk and pcon.contact_id=prjmem.contact_idfk",callback);
    },
    getRecentFiveProject:function (domid,callback) {
        return db.exec("select prj.project_id,maX(prj.projectname) as projectname,COUNT(mem.contact_idfk) as teamcount,mAX(TO_VARCHAR (TO_DATE(prj.planenddate), 'MM/DD/YYYY')) as duedate from MALASHREE.PROJECT prj, MALASHREE.PROJECTMEMBER mem where prj.domain_idfk="+domid+" and prj.project_id=mem.project_idfk  group by prj.project_id  ORDER BY prj.project_id DESC LIMIT 5", callback);
    },
    getPartnerTypeId: function(domid,desc,callback){
        return db.prepare('select partnertype_id as partypeid from MALASHREE.PARTNERTYPE WHERE  DESCRIPTION=? AND DOMAIN_IDFK=?',function (err, statement) {
        if (err) {
         return console.error('Prepare error:', err);
     }
       return statement.exec([desc,domid], callback) ;
     });
    },

};

module.exports = project;