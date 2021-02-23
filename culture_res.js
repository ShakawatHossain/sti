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
    "is_growth, is_vitek, is_sensitivity, penicillin, cefixime, ceftriaxone, azythromycin, ciprofloxacin, tetracycline)"+
    " VALUES ('"+id+"','"+data.case_id+"','"+data.gram_stain+"','"+data.hpf+"','"+data.is_growth+"','"+data.is_vitek
    +"','"+data.penicillin+"','"+data.cefixime+"','"+data.ceftriaxone+"','"+data.azythromycin
    +"','"+data.sensi+"','"+data.ciprofloxacin+"','"+data.teracycline+"') ON DUPLICATE KEY UPDATE "+
    "main_case_id='"+data.case_id+"',"+
    "gram_stain='"+data.gram_stain+"',"+
    "hpf='"+data.hpf+"',"+
    "is_growth='"+data.is_growth+"',"+
    "is_vitek='"+data.is_vitek+"',"+
    "is_sensitivity='"+data.sensi+"',"+
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