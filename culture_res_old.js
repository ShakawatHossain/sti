//Required package
var pdf = require("pdf-creator-node");
var fs = require('fs');

module.exports.getData = function (con,id,res){
    var query_string="select * from table_gp where KEY_ID="+id;
    // console.log(query_string);
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('user',{row:result,id:id});
    });
}

module.exports.setData = function (con,id,data,res,promise){
    var query_string="INSERT INTO culture_result (table_gp_id, main_case_id, gram_stain, hpf,"+ 
    "is_growth, is_vitek, penicillin, cefixime, ceftriaxone, azythromycin, ciprofloxacin, tetracycline)"+
    " VALUES ('"+id+"','"+data.case_id+"','"+data.gram_stain+"','"+data.hpf+"','"+data.is_growth+"','"+data.is_vitek
    +"','"+data.penicillin+"','"+data.cefixime+"','"+data.ceftriaxone+"','"+data.azythromycin
    +"','"+data.ciprofloxacin+"','"+data.teracycline+"') ON DUPLICATE KEY UPDATE "+
    "main_case_id='"+data.case_id+"',"+
    "gram_stain='"+data.gram_stain+"',"+
    "hpf='"+data.hpf+"',"+
    "is_growth='"+data.is_growth+"',"+
    "is_vitek='"+data.is_vitek+"',"+
    "penicillin='"+data.penicillin+"',"+
    "cefixime='"+data.cefixime+"',"+
    "ceftriaxone='"+data.ceftriaxone+"',"+
    "azythromycin='"+data.azythromycin+"',"+
    "ciprofloxacin='"+data.ciprofloxacin+"',"+
    "tetracycline='"+data.teracycline+"'";
    var update_query_string= "UPDATE table_gp SET is_culture= 1 WHERE KEY_ID = "+id;

    var promise = new Promise((resolve,reject)=>
		{
			con.query(query_string,function(err, result, fields){
				if(err) reject(err);
				resolve(null);
			});
		})
		.then(value=>{
			con.query(update_query_string,function(err, result){
				if(err) reject(err);
				// res.end("<script>window.close();</script>");
				res.redirect('/samplelist');
			});
		})
		.catch(err=>{
			console.log(err);
		});
}

module.exports.printData = function (id,res,con){
    var query_string="SELECT * FROM table_gp INNER JOIN culture_result ON "+
    "table_gp.KEY_ID=culture_result.table_gp_id WHERE table_gp.KEY_ID="+id;
    // console.log(query_string);
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        res.end(result[0].demo_name);
        // Read HTML Template
		// var html = fs.readFileSync(__dirname+'/views/culture_report.html', 'utf8');
  //       var options = {
	 //        format: "A4",
	 //        orientation: "portrait",
	 //        border: "10mm",
	 //        header: {
	 //            height: "45mm",
	 //            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
	 //        	},
	 //        "footer": {
	 //            "height": "28mm",
	 //            "contents": {
	 //            first: 'Cover page',
	 //            2: 'Second page', // Any page number is working. 1-based index
	 //            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
	 //            last: 'Last Page'
	 //        	}
	 //    	}
	 //    };
	 //    var html="Hello world";
	 //    var users = result;
	 //    var document = {
	 //    	html: html
		//     // html: html,
		//     // data: {
		//     //     users: users
		//     // },
		//     // path: "./output.pdf"
		// };
		// pdf.create(document, options)
	 //    .then(res_pdf => {
	 //        // console.log(res)
	 //        res.end(res_pdf);
	 //    })
	 //    .catch(error => {
	 //        // console.error(error)
	 //        res.end(error);
	 //    });
    });
}