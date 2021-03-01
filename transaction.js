module.exports.getData = function (con,from,to,res,req){
    console.log("transaction "+from);
    var query_string="select KEY_ID,main_case_id,demo_name,demo_age,visit_sm_us,visit_sm_vs,visit_sm_ur,"+
            "visit_sm_es,visit_sm_bd,visit_sm_ul,is_pcr,is_culture,is_sero from sti.table_gp where main_sample=1 and "+
            "date(main_in_date)>='"+from+"' and date(main_in_date)<='"+to+"'";
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('samplelist',{rows:result,from:from,to:to,role: req.session.role});
    });
}
module.exports.getReport = function (con,from,to,res,req){
    console.log("transaction "+from);
    var query_string="SELECT table_gp.KEY_ID,table_gp.main_case_id,table_gp.demo_name,table_gp.demo_age,"+
    "table_gp.demo_sex,culture_result.head_sign as 'cul_sign',pcr_result.head_sign as 'pcr_sign', sero_result.head_sign as 'sero_sign' "+
	"FROM table_gp "+
	"LEFT JOIN culture_result ON culture_result.table_gp_id=table_gp.KEY_ID "+
	"LEFT JOIN pcr_result ON pcr_result.table_gp_id=table_gp.KEY_ID "+
	"LEFT JOIN sero_result ON sero_result.table_gp_id=table_gp.KEY_ID "+
	"WHERE table_gp.main_sample=1 and "+
    "date(main_in_date)>='"+from+"' and date(main_in_date)<='"+to+"'";
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('report_list',{rows:result,from:from,to:to,role: req.session.role});
    });
}