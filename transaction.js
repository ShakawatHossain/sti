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