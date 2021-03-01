module.exports.getCultureList = function(req,res,con){
	var sql = "select * from culture_result INNER JOIN table_gp ON "+
		"culture_result.table_gp_id=table_gp.KEY_ID where culture_result.head_sign=0";
	con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('signature_culture_samplelist',{rows:result});
    });
}

module.exports.getPCRList = function(req,res,con){
	var sql = "select * from pcr_result INNER JOIN table_gp ON "+
		"pcr_result.table_gp_id=table_gp.KEY_ID where pcr_result.head_sign=0";
	con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('signature_pcr_samplelist',{rows:result});
    });
}
module.exports.getSEROList = function(req,res,con){
    var sql = "select * from sero_result INNER JOIN table_gp ON "+
        "sero_result.table_gp_id=table_gp.KEY_ID where sero_result.head_sign=0";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('signature_sero_samplelist',{rows:result});
    });
}