var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var promise = require("promise");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','ejs');
var pdf = pdf = require('express-pdf');
app.use(pdf);
// Date cache
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
var todate=year+"-"+month+"-"+date;
var from_date=todate;
var till_date=todate;

var con = mysql.createConnection({
  host: "119.148.17.100",
  port: "3306",
  user: "shaku",
  password: "I3dcr089",
  database: "sti"
  // host: "localhost",
  // port: "3306",
  // user: "root",
  // password: "",
  // database: "sti"
});
// app.get('/assets',function(req,res,next){
// 	next();
// });
app.use('/assets', express.static('assets'))
app.get('/',function(req,res){
	res.render("login");
});
app.post('/',urlencodedParser,function(req,res){
	checkLogin(req.body.user_id,req.body.pass,res);
});
app.get('/view/login_design.css',function(req,res){
	res.sendFile(__dirname+"/views/login_design.css");
});

app.get('/samplelist',function(req,res){
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
	transaction.getData(con,from,to,res);
});
app.get('/culture_sample',function(req,res){
	require('./culture_res').getData(con,req.query.no,res);
});
app.post('/culture_sample',urlencodedParser,function(req,res){
	require('./culture_res').setData(con,req.query.no,req.body,res,promise);
});
app.get('/culture_down',function(req,res){
	require('./culture_report_pdf').printData(req.query.no,res,con,app);
});
app.get('/pcr_sample',function(req,res){
	require('./pcr_res').getData(con,req.query.no,res);
});
app.post('/pcr_sample',urlencodedParser,function(req,res){
	require('./pcr_res').setData(con,req.query.no,req.body,res,promise);
});
app.get('/pcr_down',function(req,res){
	require('./pcr_report_pdf').printData(req.query.no,res,con,app);
});
app.get('/dashboard/:from/:to',function(req,res){
	seeDash(req.params.from,req.params.to,res);
});
app.get('/dashboard',function(req,res){
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
	seeDash(from,to,res);
});
app.get('/sti_type/:from/:to',function(req,res){
	stiClass(req.params.from,req.params.to,res);
});
app.get('/stis/:from/:to',function(req,res){
	types(req.params.from,req.params.to,res);
	// res.end("Hello from stis!");
});

var seeDash=function(from,to,res){
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
	    res.render('dashboard',{rows:result, fields:fields, hos:hos, from:from, to:to});
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
var checkLogin=function(un,pass,res){
	var sql = "select * from table_users where user_id='"+un.trim()+"' and password='"+
	pass.trim()+"'";
	con.query(sql,function(err, result, fields){
		if(err){
			res.end("Query Error!!");
		}
		if(result.length>0){
			console.log(result[0].name);
			res.end("Result get success");
		}else{
			res.render("login",{result:'Login Error!'});
		}
	});
}

app.listen(3000);