module.exports.printData = function (id,res,con,app){
    var query_string="SELECT * FROM table_gp INNER JOIN culture_result ON "+
    "table_gp.KEY_ID=culture_result.table_gp_id WHERE table_gp.KEY_ID="+id;
    // console.log(query_string);
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        var dr = new Date(result[0].mob_created_at);
        var drpt = new Date(result[0].rpt_created_at);
        var hos_name= ['','DMCH','MMCH','CMCH','RMCH','SBMCH','SOMCH','ThDH','BaDH'];
        var pt_sex= ['','Male','Female','Transgender'];
        var gram_arr= ['','Found','Not found'];
        var hpf_arr= ['','Plenty','Moderate','Few','No pus cell'];
        var grow_arr= ['','Growth','No growth'];
        var grow_arr_hour= ['','24 hrs','48 hrs'];
        var vitek_arr= ['','Detected','Not detected'];
        var sensitivity_arr= ['','Sensitive','Intermediate','Resistance'];
        var spec = "";
        if(result[0].visit_sm_us==1){
        	spec+="Urethal swab";
        }
        if(result[0].visit_sm_es==1){
        	if(spec==="")
        		spec+="Endocervical swab";
        	else
        		spec+=", Endocervical swab";
        }
        var roughhtmlcontent="<html><body>"+
        	"<table width='100%'>"+
	  			"<tr>"+
	    		"<td><img src='file:///home/project/sti/assets/img/bdgov.png' alt='bdlogo' height='80' width='80'/><td>"+
	    		"<td><center>"+
	      		"<p>Government of the People\'s Republic of Bangladesh"+
	      		"<br/>"+
	      		"Institute of Epidemiology, Disease Control &amp; Research"+
	      		"<br/>"+
	      		"Mohakhali, Dhaka-1212, Bangladesh</p>"+
	    		"</center></td>"+
	    		"<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
	    		"<td><img src='file:///home/project/sti/assets/img/iedcr.jpg' alt='abcde' height='60' width='60'/></td>"+
	  			"</tr>"+
			"</table>"+
			"<hr/>"+
			"<center><h1>Microbiological Report</h1></center>"+
			"<br/>"+
			"<center><table width='90%'>"+
	  			"<tr>"+
	  			"<td>ID no</td><td>"+result[0].main_case_id+"</td>"+
	  			"<td>Sample collection Date</td><td>"+dr.getFullYear() + "-" + (dr.getMonth()+1) + "-" +
	  			 dr.getDate()+"</td>"+
	  			"</tr><tr>"+
	  			"<td>Patient\'s name </td><td> "+result[0].demo_name+"</td>"+
	  			"<td>Date of report</td><td>"+drpt.getFullYear() + "-" + (drpt.getMonth()+1) + "-" +
	  			 drpt.getDate()+"</td>"+
	  			"</tr><tr>"+
	  			"<td>Refered by </td><td> "+hos_name[result[0].main_hos_code]+"</td>"+
	  			"<td>Age</td><td> "+result[0].demo_age+"</td>"+
	  			"<tr/><tr>"+
	  			"</tr><tr>"+
	  			"<td>Specimen </td><td> "+spec+"</td>"+
	  			"<td>Sex</td><td> "+pt_sex[result[0].demo_sex]+"</td>"+
	  			"</tr>"+
	  		"</table></center>"+
	  		"<h2>1. Gram staining</h2>"+
	  		"<p>Gram negative intra cellular diplococci: "+gram_arr[result[0].gram_stain]+"</p>"+
	  		"<p>Pus cell/HPF: "+hpf_arr[result[0].hpf]+"</p><br/>"+
	  		"<h2>2. Culture</h2>"+
	  		"<p>Has yielded "+grow_arr[result[0].is_growth]+" of Gram negative diplococci after "+
	  		grow_arr_hour[result[0].is_growth]+" of incubation at 37°C with 5% CO<sub>2</sub></p><br/>";
	  		if(result[0].is_growth==1){
	  			roughhtmlcontent+="<h2>3. VITEK-2 System</h2>"+
		  		"<p>Neisseria gonorrhoeae "+vitek_arr[result[0].is_vitek]+" </p>";
		  		if(result[0].is_vitek==1 && result[0].is_sensitivity==1){
			  		roughhtmlcontent+="<h2>4. Sensitivity test</h2>"+
			  		"<table width='50%''>"+
			  		"<tr><td>Penicillin</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].penicillin]+"</td></tr>"+
					"<tr><td>Cefixime</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].cefixime]+"</td></tr>"+
					"<tr><td>Ceftriaxone</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].ceftriaxone]+"</td></tr>"+
					"<tr><td>Azythromycin</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].azythromycin]+"</td></tr>"+
					"<tr><td>Ciprofloxacin</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].ciprofloxacin]+"</td></tr>"+
					"<tr><td>Tetracycline</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].tetracycline]+"</td></tr>"+
					"</table>";
				}else{
					roughhtmlcontent+=
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>";
				}
	  		}

	  		roughhtmlcontent+=
	  			"<br/>"+
				"<table width='100%'>"+
				"<tr>"+
				"<td>";
			if(result[0].head_sign==1){
				roughhtmlcontent+="<center><img src='file:///home/erp/sti/assets/img/culture.png' alt='culture' height='80' width='80'/></center>";
			}
			roughhtmlcontent+="<hr/>"+
				"<center>microbiologist <br/> STI surveillance program</center>"+
				"<td>"+
				"<td>"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
				"</td>"+
				"<td>";
			if(result[0].head_sign==1){
				roughhtmlcontent+="<center><img src='file:///home/erp/sti/assets/img/head.png' alt='head' height='80' width='80'/></center>";
			}
			roughhtmlcontent+="<hr/>"+
				"<center>Head <br/> Dept. of microbiology</center>"+
				"</td>"+
				"<tr/>"+
				"</table>";
	  		
		roughhtmlcontent+="</body></html>";
        try{
        	res.pdfFromHTML({
		        filename: 'generated.pdf',
		        htmlContent: roughhtmlcontent,
		        options: {
		        	format: "A3",
			        orientation: "portrait",
			        border: "10mm",
			        header: {
		            height: "3mm",
		            contents: ""
		        	},
		        	 "footer": {
			            "height": "0mm",
			            "contents": {
			        	}
			    	}
	        	}
	    	});
    	}catch(err){
    		console.log(err);
    		res.end(roughhtmlcontent);
    	}
    	
    });
}