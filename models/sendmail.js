'use strict';
var nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
var sendemail = {
    projectmail: function (data)
    {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount =  nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        console.log('projectname in send mail',data.PROJECTNAME);
        var transporter = nodemailer.createTransport({
            host: 'mail.demo.vsurve.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'ticket@demo.vsurve.com', // generated ethereal user
                pass: '2DX2Pf3eZH' // generated ethereal password
            },
            tls: {rejectUnauthorized: false}
        });

        var mailOptions = {
            from: '"VSURVE Team" <ticket@demo.vsurve.com>',
            to: 'abel.pratley@v3it.com',
            subject: 'New Project  '+data.PROJECTNAME+'  added to your vsurve Account',
            text: 'Hey there, it’s our first message sent with Nodemailer ',
            html: "<html> " +
			"<head> " +
			"<title>Project Email</title> " +
			"<meta http-equiv='Content-Type' content='text/html; charset=utf-8'> " +
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'> " +
			"<meta name='viewport' content='width=device-width, initial-scale=1.0 '> " +
			"<link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800' rel='stylesheet'> " +
			"</head> " +
			"<body style='margin:0px; padding:0px;' bgcolor='#fff'> " +
			"<table   width='100%' > " +
			"<tbody> " +
			"<tr> " +
			"<td> " +
			"<table  style='width:700px;padding:50px;margin:auto' width='700' > " +
			"<!--Header section--> " +
			"<tbody> " +
			"<tr> " +
			"<td style='padding: 0px;'> " +
			"<table width='100%'   valign='bottom' style='border: 2px solid #c12628;border-radius:10px;'> " +
			" <tbody> " +
			"<tr> " +
			"<td style='padding: 25px;background: #fff;' valign='top' align='center'><a href='https://demo.vsurve.com/' target='_blank'><img src='https://www.v3it.com/vsurve/logo.png'></a></td> " +
			"</tr> " +
			"<tr> " +
			"<td > " +
			"<table   width='100%' style='padding: 25px; '> " +
			"<tbody> " +
			"<tr> " +
			"<td > " +
			"<p>Hi <span style='font-weight: 600;color: #000;' > data.EMAIL,</span> </p> " +
			"<p>You have been added to project <span style='font-weight: 600;color: #000;'>("+data.PROJECTNAME+")</span> by <a style='font-weight: 600;text-decoration: none;color: #000;' href='mailto:someone@example.com'>data.EMAIL</a></p> " +
			"</td> " +
			"</tr> " +
			"</tbody> " +
			"</table> " +
			"</td> " +
			"</tr> " +
			"<tr> " +
			"<td > " +
			"<table   width='100%' style='padding: 0px 25px 25px 25px '> " +
			"<tbody> " +
			"<tr> " +
			"<td > " +
			"<table  style='padding: 25px; " +
			"background: #f7f9fa; " +
			"border-radius: 10px; " +
			"width: 100%;'> " +
			"<tbody> " +
			"<tr> " +
			"<th style='font-size: 14px;padding: 10px 0px;width: 50%;text-align: left;border-bottom: 1px solid #eaeaed;'>PROJECT NAME</th> " +
			"<th style='font-size: 14px;padding: 10px 0px;text-align: center;border-bottom: 1px solid #eaeaed;width: 10%;'> : </th> " +
			"<td style='font-size: 14px;padding: 10px 0px;border-bottom: 1px solid #eaeaed;'>"+data.PROJECTNAME+" </td> " +
			"</tr> " +
			"<tr> " +
			"<th style='font-size: 14px;padding: 10px 0px;width: 50%;text-align: left;border-bottom: 1px solid #eaeaed;'>PRIORITY</th> " +
			"<th style='font-size: 14px;padding: 10px 0px;text-align: center;border-bottom: 1px solid #eaeaed;width: 10%;'> : </th> " +
			"<td style='font-size: 14px;padding: 10px 0px;border-bottom: 1px solid #eaeaed;'>"+data.PRIORITY+"</td> " +
			"</tr> " +
			"<tr> " +
			"<th style='font-size: 14px;padding: 10px 0px;width: 50%;text-align: left;border-bottom: 1px solid #eaeaed;'>PLANSTART DATE</th> " +
			"<th style='font-size: 14px;padding: 10px 0px;text-align: center;border-bottom: 1px solid #eaeaed;width: 10%;'> : </th> " +
			"<td style='font-size: 14px;padding: 10px 0px;border-bottom: 1px solid #eaeaed;'>" +data.PLANSTARTDATE +"</td> " +
			"</tr> " +
			"<tr> " +
			"<th style='font-size: 14px;padding: 10px 0px;width: 50%;text-align: left;border-bottom: 1px solid #eaeaed;'>PLANEND DATE</th> " +
			"<th style='font-size: 14px;padding: 10px 0px;text-align: center;border-bottom: 1px solid #eaeaed;width: 10%;'> : </th> " +
			"<td style='font-size: 14px;padding: 10px 0px;border-bottom: 1px solid #eaeaed;'>"+ data.PLANENDDATE +"</td> " +
			"</tr> " +
			"<tr> " +
			"<th style='font-size: 14px;padding: 10px 0px;width: 50%;text-align: left;border-bottom: 1px solid #eaeaed;'>STATUS</th> " +
			"<th style='font-size: 14px;padding: 10px 0px;text-align: center;border-bottom: 1px solid #eaeaed;width: 10%;'> : </th> " +
			"<td style='font-size: 14px;padding: 10px 0px;border-bottom: 1px solid #eaeaed;'>"+data.PRIORITY+"</td> " +
			"</tr> " +
			"<tr> " +
			"<th style='font-size: 14px;padding: 10px 0px;width: 50%;text-align: left;'>CRETATED BY</th> " +
			"<th style='font-size: 14px;padding: 10px 0px;text-align: center;width: 10%;'> : </th> " +
			"<td style='font-size: 14px;padding: 10px 0px;'>"+data.PRIORITY+" "+data.PRIORITY+"</td> " +
			"</tr> " +
			"</tbody> " +
			"</table> " +
			"</td> " +
			"</tr> " +
			"</tbody> " +
			"</table> " +
			"</td> " +
			"</tr> " +
			"<tr> " +
			"<td style='border-top: 1px solid #eaeaed;'> " +
			"<table   width='100%' style='padding: 25px; '> " +
			"<tbody> " +
			"<tr> " +
			"<td > " +
			"<p style='font-size: 14px;font-style: italic;color: #7e818c;'>For any queries write to <a style='font-weight: 600;text-decoration: none;color: #000;' href='mailto:vsurve@v3it.com'>vsurve@v3it.com</a></p> " +
			"</td> " +
			"</tr> " +
			"</tbody> " +
			"</table> " +
			"</td> " +
			"</tr> " +
			"</tbody> " +
			"</table> " +
			"</td> " +
			"</tr> " +
			"</tbody> " +
			"</table> " +
			"</td> " +
			"</tr> " +
			"</tbody> " +
			"</table> " +
			"</body> " +
			"</html>",
			
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s',info);
        });
        
    },
}

module.exports=sendemail;