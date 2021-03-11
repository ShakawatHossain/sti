var express = require('express');
const session = require('express-session');
const redis = require ('redis');
const connectRedis = require('connect-redis');
const nodemailer = require("nodemailer");
// var Iconv  = require('iconv').Iconv;
// var iconv = new Iconv('UTF-8', 'ISO-8859-1');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var promise = require("promise");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','ejs');
var pdf = pdf = require('express-pdf');
app.use(pdf);
const RedisStore = connectRedis(session);
// Date cache
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
var todate=year+"-"+month+"-"+date;
var from_date=todate;
var till_date=todate;

const redisClient = redis.createClient({
	port: 6379,
	host: 'localhost'
});
app.use(session({
	store: new RedisStore({client: redisClient}),
	secret: 'abc911',
	saveUninitialized: false,
	resave: false,
	cookie:{
		secure: false, //if true, only transmit for https
		httpOnly: true,
		maxAge: 1000*60*30
	}
}));

var con = mysql.createConnection({
  host: "119.148.17.100",
  port: "3306",
  user: "shaku",
  password: "I3dcr089",
  database: "sti"
  
});
app.use('/assets', express.static('assets'))
app.get('/',function(req,res){
	if(!checksession(req)){
		res.render("login");
	}else{
		res.redirect("./dashboard");
	}
	
});
app.post('/',urlencodedParser,function(req,res){
	checkLogin(req.body.user_id,req.body.pass,req,res);
});
// putsign
app.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect('./');
});

app.get('/samplelist',function(req,res){
	if(!checksession(req)){
		res.redirect('./');
	}
	var transaction = require('./transaction');
	var to = req.query.to;
	if(typeof to === 'undefined'){
		to = till_date;
	}else{
		till_date=to;
	}
	var from=req.query.from;
	if(typeof from === 'undefined'){
		from = from_date;
	}else{
		from_date=from;
	}
	transaction.getData(con,from,to,res,req);
});
app.get('/culture_sample',function(req,res){
	require('./culture_res').getData(con,req.query.no,res);
});
app.post('/culture_sample',urlencodedParser,function(req,res){
	require('./culture_res').setData(con,req.query.no,req.body,res,promise);
});
app.get('/culture_down',function(req,res){
	// res.end("Hello");
	require('./culture_report_pdf').printData(req.query.no,res,con,app);
});
app.get('/cultue_sign_panel',function(req,res){
	if(checksession(req) && req.session.role==3){
		require('./signature').getCultureList(req,res,con);
	}else{
		res.redirect('./dashboard');
	}
});
app.post('/putsign_culture',urlencodedParser,function(req,res){
	var id = req.body.id;
	var sql = "UPDATE culture_result set head_sign=1, head_sign_date='"+todate+"' where id="+id;
	con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result.affectedRows + " record(s) updated");
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ records: result.affectedRows }));
  });
});
app.get('/pcr_sample',function(req,res){
	require('./pcr_res').getData(con,req.query.no,res);
});
app.post('/pcr_sample',urlencodedParser,function(req,res){
	require('./pcr_res').setData(con,req.query.no,req.body,res,promise);
});
app.get('/pcr_down',function(req,res){
	// console.log("get request!");
	// require('./pcr_report_pdf').printData(req.query.no,res,con,app,iconv);
	require('./pcr_report_pdf').printData(req.query.no,res,con,app);
	// res.end("Holla");
});
app.get('/pcr_sign_panel',function(req,res){
	if(checksession(req) && req.session.role==3){
		require('./signature').getPCRList(req,res,con);
	}else{
		res.redirect('./dashboard');
	}
});
app.post('/putsign_pcr',urlencodedParser,function(req,res){
	var id = req.body.id;
	var sql = "UPDATE pcr_result set head_sign=1, head_sign_date='"+todate+"' where id="+id;
	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ records: result.affectedRows }));
  });
});
// start of serological
app.get('/sero_sample',function(req,res){
	require('./sero_res').getData(con,req.query.no,res);
});
app.post('/sero_sample',urlencodedParser,function(req,res){
	require('./sero_res').setData(con,req.query.no,req.body,res,promise);
});
app.get('/sero_down',function(req,res){
	// console.log("get request!");
	require('./sero_report_pdf').printData(req.query.no,res,con,app);
	// res.end("Holla");
});
app.get('/sero_sign_panel',function(req,res){
	if(checksession(req) && req.session.role==3){
		require('./signature').getSEROList(req,res,con);
	}else{
		res.redirect('./dashboard');
	}
});
// End of serological
app.post('/putsign_sero',urlencodedParser,function(req,res){
	var id = req.body.id;
	var sql = "UPDATE sero_result set head_sign=1, head_sign_date='"+todate+"' where id="+id;
	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ records: result.affectedRows }));
  });
});
app.get('/dashboard',function(req,res){
	if(!checksession(req)){
		res.redirect('./');
	}
	var to = req.query.to;
	if(typeof to === 'undefined'){
		to = till_date;
	}else{
		till_date=to;
	}
	var from=req.query.from;
	if(typeof from === 'undefined'){
		from = from_date;
	}else{
		from_date=from;
	}
	seeDash(from,to,res,req);
});
app.get('/sti_type/:from/:to',function(req,res){
	stiClass(req.params.from,req.params.to,res);
});
app.get('/stis/:from/:to',function(req,res){
	types(req.params.from,req.params.to,res);
	// res.end("Hello from stis!");
});
app.get('/reports',function(req,res){
	if(!checksession(req)){
		res.redirect('./');
	}
	var transaction = require('./transaction');
	var to = req.query.to;
	if(typeof to === 'undefined'){
		to = till_date;
	}else{
		till_date=to;
	}
	var from=req.query.from;
	if(typeof from === 'undefined'){
		from = from_date;
	}else{
		from_date=from;
	}
	transaction.getReport(con,from,to,res,req);
});
app.post('/sent_mail',urlencodedParser,function(req,res){
	var mailer = require('./mailer');
	mailer.sent_mail(req,res,nodemailer,con,todate);
});

var seeDash=function(from,to,res,req){
	var sql = "select main_hos_code,main_dept,main_sample,count(distinct(main_case_id)) as 'total'" +
	 " from sti.table_gp where date(main_in_date)>='"+from+
	 "' and date(main_in_date)<='"+to+
	 "' and main_hos_code is not null group by main_hos_code,main_dept,main_sample";
	// var sql_sti_class = "select clin_blis_ulcer,visit_pd_uds,visit_pd_vds,visit_pd_guds,"+
	//  "visit_pd_lap,visit_pd_oro,visit_pd_ano,visit_pd_sss,visit_pd_ibs from sti.table_gp"+
	//  "where date(main_in_date)>='"+from+"' and date(main_in_date)<='"+to;
	con.query(sql, function (err, result, fields) {
	    if (err) throw err;
	   	var hos = ['','DMCH','MMCH','CMCH','RMCH','SBMCH','SOMCH','ThDH','BaDH']
	    res.render('dashboard',{rows:result, fields:fields, hos:hos, from:from, to:to, 
	    	role: req.session.role});
  	});
}
var stiClass=function(from,to,res){
	var sql_sti_class = "select clin_blis_ulcer,visit_pd_uds,visit_pd_vds,visit_pd_guds,"+
	 "visit_pd_lap,visit_pd_oro,visit_pd_ano,visit_pd_sss,visit_pd_ibs from sti.table_gp"+
	 " where date(main_in_date)>='"+from+"' and date(main_in_date)<='"+to+"'";
	 console.log(sql_sti_class);
	con.query(sql_sti_class,function(err, result, fields){
		if (err) throw err;
		var sti1=0,sti2=0,sti3=0,sti4=0,sti5=0,sti6=0;
		result.forEach(row=>{
			if(row.visit_pd_ibs==1 || row.visit_pd_sss==1 || row.visit_pd_ano==1 ||
				row.visit_pd_oro==1)
				sti6++;
			else if(row.visit_pd_lap==1)
				sti5++;
			else if(row.visit_pd_vds==1)
				sti4++;
			else if(row.visit_pd_uds==1)
				sti3++;
			else if(row.visit_pd_guds==1 && row.clin_blis_ulcer==1)
				sti2++;
			else if(row.visit_pd_guds==1 && row.clin_blis_ulcer!=1)
				sti1++;
		});
		res.render('sti_type',{sti1:sti1, sti2:sti2, sti3:sti3, sti4:sti4, sti5:sti5, sti6:sti6});
	});
}
var types=function(from,to,res){
	var sti_value=new Array(2);
	var sql_sti_class = "select clin_blis_ulcer,visit_pd_uds,visit_pd_vds,visit_pd_guds,"+
	 "visit_pd_lap,visit_pd_oro,visit_pd_ano,visit_pd_sss,visit_pd_ibs from sti.table_gp"+
	 " where date(main_in_date)>='"+from+"' and date(main_in_date)<='"+to+"' and main_hos_code=1";
	 var sql_sti_class2 = "select clin_blis_ulcer,visit_pd_uds,visit_pd_vds,visit_pd_guds,"+
	 "visit_pd_lap,visit_pd_oro,visit_pd_ano,visit_pd_sss,visit_pd_ibs from sti.table_gp"+
	 " where date(main_in_date)>='"+from+"' and date(main_in_date)<='"+to+"' and main_hos_code=2";
	 // res.end(sql_sti_class);
	var promise = new Promise((resolve,reject)=>
		{
			con.query(sql_sti_class,function(err, result, fields){
				if(err) reject(err);
				// console.log(result);
				sti_value[0]=parseResult(result);
				resolve(null);
			});
		})
		.then(value=>{
			con.query(sql_sti_class2,function(err, result, fields){
				if(err) reject(err);
				// console.log("----------------------------");
				// console.log(result);
				sti_value[1]=parseResult(result);
				// resolve(null);
				res.render('sti_type_c',{data:sti_value});

			});
		})
		.catch(err=>{
			console.log(err);
		});
}
var parseResult=function(result){
	var sti1=0,sti2=0,sti3=0,sti4=0,sti5=0,sti6=0;
	result.forEach(row=>{
			if(row.visit_pd_ibs==1 || row.visit_pd_sss==1 || row.visit_pd_ano==1 ||
				row.visit_pd_oro==1)
				sti6++;
			else if(row.visit_pd_lap==1)
				sti5++;
			else if(row.visit_pd_vds==1)
				sti4++;
			else if(row.visit_pd_uds==1)
				sti3++;
			else if(row.visit_pd_guds==1 && row.clin_blis_ulcer==1)
				sti2++;
			else if(row.visit_pd_guds==1 && row.clin_blis_ulcer!=1)
				sti1++;
		});
	var sti_res = {sti1:sti1,sti2:sti2,sti3:sti3,sti4:sti4,sti5:sti5,sti6:sti6};
	return sti_res;
}
var checkLogin=function(un,pass,req,res){
	var sql = "select * from table_users where user_id='"+un.trim()+"' and password='"+
	pass.trim()+"'";
	con.query(sql,function(err, result, fields){
		if(err){
			res.end("Query Error!!");
		}
		if(result.length>0){
			// console.log(result[0].name);
			req.session.role = result[0].role;
			res.redirect('/dashboard');
		}else{
			res.render("login",{result:'Login Error!'});
		}
	});
}
var checksession=function(req){
	if(typeof req.session.role=='undefined' || req.session.role==''){
		return false;
	}else{
		return true;
	}
}
app.listen(3010);