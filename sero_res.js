module.exports.getData = function (con,id,res){
    var query_string="select * from table_gp where KEY_ID="+id;
    // console.log(query_string);
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('user_sero',{row:result,id:id});
    });
}

module.exports.setData = function (con,id,data,res,promise){

    var query_string="INSERT INTO sero_result(table_gp_id, main_case_id, is_reactive,"+
    " is_tpha, tpha_result) VALUES ('"+
    id+"','"+data.case_id+"','"+data.is_reactive+"','"+data.is_tpha+"','"+data.tpha_result+
    "') ON DUPLICATE KEY UPDATE "+
    "table_gp_id='"+id+"',"+
    "main_case_id='"+data.case_id+"',"+
    "is_reactive='"+data.is_reactive+"',"+
    "is_tpha='"+data.is_tpha+"',"+
    "tpha_result='"+data.tpha_result+"'";
    console.log(query_string);
    var update_query_string= "UPDATE table_gp SET is_sero= 1 WHERE KEY_ID = "+id;

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