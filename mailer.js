module.exports.sent_mail = function (req,res,nodemailer,con,todate){
    
    // var transport = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   auth: {
    //     user: "ncovreport@gmail.com",
    //     pass: "iedcrncov2019"
    //   }
    // });

    // var mailOptions = {
    //   from: '"IEDCR report" <ncovreport@gmail.com>',
    //   to: 'shakawat.hossain10@gmail.com, mostofa62@yopmail.com',
    //   subject: 'Nice Nodemailer test',
    //   text: 'Hey there, it’s our first message sent with Nodemailer ',
    //   html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
    //   attachments: [
    //     {
    //       filename: 'mailtrap.png',
    //       path: __dirname + '/assets/img/apple-icon.png',
    //       cid: 'uniq-mailtrap.png' 
    //     }
    //   ]
    // };

    // transport.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log('Message sent: %s', info.messageId);
    // });




    var query_string = "";
    if(req.body.table==1){ //culture
        query_string="UPDATE culture_result SET culture_is_circulate=1,culture_is_circulate_date='"+
        todate+"' WHERE table_gp_id="+req.body.id;   
    }else if(req.body.table==2){ //pcr
        query_string="UPDATE pcr_result SET pcr_is_circulate=1,pcr_is_circulate_date='"+
        todate+"' WHERE table_gp_id="+req.body.id;
    }else if(req.body.table==3){ //sero
    }
    
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ records: result.affectedRows }));
    });

}