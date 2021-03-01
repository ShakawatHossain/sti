module.exports.getData = function (con,id,res){
    var query_string="select * from table_gp where KEY_ID="+id;
    // console.log(query_string);
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('user_pcr',{row:result,id:id});
    });
}

module.exports.setData = function (con,id,data,res,promise){
    var ngo,ctr,tpa,mge,mho,uur,upa,gva,tva,hsv1,hsv2;
    ngo = (typeof data.ngo=== 'undefined'?0:1);
    ctr = (typeof data.ctr=== 'undefined'?0:1);
    tpa = (typeof data.tpa=== 'undefined'?0:1);
    mge = (typeof data.mge=== 'undefined'?0:1);
    mho = (typeof data.mho=== 'undefined'?0:1);
    uur = (typeof data.uur=== 'undefined'?0:1);
    upa = (typeof data.upa=== 'undefined'?0:1);
    gva = (typeof data.gva=== 'undefined'?0:1);
    tva = (typeof data.tva=== 'undefined'?0:1);
    hsv1 = (typeof data.hsv1=== 'undefined'?0:1);
    hsv2 = (typeof data.hsv2=== 'undefined'?0:1);

    var query_string="INSERT INTO pcr_result(table_gp_id, main_case_id, sti_type,"+
    " ngo, ctr, tpa, mge, mho, uur, upa, gva, tva, hsv1, hsv2, result,has_comment) VALUES ('"+
    id+"','"+data.case_id+"','"+data.sti_type+"','"+ngo+"','"+ctr+"','"+tpa
    +"','"+mge+"','"+mho+"','"+uur+"','"+upa
    +"','"+gva+"','"+tva+"','"+hsv1+"','"+hsv2
    +"','"+data.result+"','"+data.has_comment+"') ON DUPLICATE KEY UPDATE "+
    "main_case_id='"+data.case_id+"',"+
    "sti_type='"+data.sti_type+"',"+
    "ngo='"+ngo+"',"+
    "ctr='"+ctr+"',"+
    "tpa='"+tpa+"',"+
    "mge='"+mge+"',"+
    "mho='"+mho+"',"+
    "uur='"+uur+"',"+
    "upa='"+upa+"',"+
    "gva='"+gva+"',"+
    "tva='"+tva+"',"+
    "hsv1='"+hsv1+"',"+
    "hsv2='"+hsv2+"',"+
    "result='"+data.result+"'";
    // console.log(query_string);
    var update_query_string= "UPDATE table_gp SET is_pcr= 1 WHERE KEY_ID = "+id;

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