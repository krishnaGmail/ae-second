var userData={};
var sharedfunc = {
    curr_TimeStamp: function ()
    {
            var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            h = d.getHours(),
            m = d.getMinutes(),
            s = d.getSeconds();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            if(h<=9){
                h='0'+h;
            }
            if(m<=9){
                m='0'+m;
            }
            if(s<=9){
                s='0'+s;
            }

            //console.log("date"+[year, month, day].join('-')+ " " +h+h+":"+m+m+":"+s+s);
            var num=[year, month, day].join('-')+ " " +h+":"+m+":"+s;
            console.log('the timestamp to be inserted is ',num);
            return num;
    },
    getToDate:function(date){
        if(date!=''){
            var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            h = d.getHours(),
            m = d.getMinutes(),
            s = d.getSeconds();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            //console.log("date"+[year, month, day].join('-')+ " " +h+h+":"+m+m+":"+s+s);
            var num=[year, month, day].join('-')+ " " +"00"+":"+"00"+":"+"00";
            return num;
        }else{
            return null;
        }
    },
    setSession:function(data){
            userData.fname=data.fname;
            userData.lname=data.lname;
            userData.flag=data.flag;
            userData.email=data.email;
            
            if(data.domid)
            {
                userData.domid=data.domid; 
            } 
            else
            {
                userData.domid=0; 
            }
            if(data.description)
            {
                userData.description=data.description;               
            } 
           if(data.langid)
            {
                userData.langid=data.langid;               
            }else{
                userData.langid=0;
            }
             if(data.partid)
            {
                userData.partid=data.partid;               
            }else{
                userData.partid=0;
            }
            if(data.contactid)
            {
                userData.contactid=data.contactid;               
            }
            else{
                userData.contactid=0;
               //console.log("userData==="+userData.contactid) ;        
            }             
    },
    getSession:function()
    {       
        return userData;
    }
    
}
module.exports=sharedfunc;