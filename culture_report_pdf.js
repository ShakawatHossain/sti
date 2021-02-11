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
        var hpf_arr= ['','Plenty','Moderate','Few'];
        var grow_arr= ['','Growth','No growth'];
        var sensitivity_arr= ['','Sensitive','Intermediate','Resistance'];
        var spec = "";
        if(result[0].visit_sm_us==1){
        	spec+="Urethal swab";
        }
        if(result[0].visit_sm_vs==1){
        	if(spec==="")
        		spec+="Vaginal swab";
        	else
        		spec+=", Vaginal swab";
        }
        if(result[0].visit_sm_ur==1){
        	if(spec==="")
        		spec+="Urine";
        	else
        		spec+=", Urine";
        }
        if(result[0].visit_sm_es==1){
        	if(spec==="")
        		spec+="Endocervical swab";
        	else
        		spec+=", Endocervical swab";
        }
        if(result[0].visit_sm_bd==1){
        	if(spec==="")
        		spec+="Blood";
        	else
        		spec+=", Blood";
        }
        if(result[0].visit_sm_ul==1){
        	if(spec==="")
        		spec+="Ulcer swab";
        	else
        		spec+=", Ulcer swab";
        }
        var roughhtmlcontent="<html><body>"+
        	"<table width='100%'>"+
	  			"<tr>"+
	    		"<td><img src='file:\\\D:\\rom\\sti\\assets\\img\\bdgov.png' alt='bdlogo' height='80' width='80'/><td>"+
	    		"<td><center>"+
	      		"<p>Government of the People\'s Republic of Bangladesh"+
	      		"<br/>"+
	      		"Institute of Epidemiology, Disease Control &amp; Research"+
	      		"<br/>"+
	      		"Mohakhali, Dhaka-1212, Bangladesh</p>"+
	    		"</center></td>"+
	    		"<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
	    		"<td><img src='file:\\\D:\\rom\\sti\\assets\\img\\iedcr.jpg' alt='abcde' height='60' width='60'/></td>"+
	  			"</tr>"+
			"</table>"+
			"<hr/>"+
			"<center><h1>Microbiological Report</h1></center>"+
			"<br/>"+
			"<center><table width='60%'>"+
	  			"<tr>"+
	  			"<td>ID no</td><td>"+result[0].main_case_id+"</td>"+
	  			"<td>Date of recieved</td><td>"+dr.getFullYear() + "-" + dr.getMonth()+1 + "-" +
	  			 dr.getDate()+"</td>"+
	  			"</tr><tr>"+
	  			"<td>Patient\'s name </td><td> "+result[0].demo_name+"</td>"+
	  			"<td>Date of report</td><td>"+drpt.getFullYear() + "-" + drpt.getMonth()+1 + "-" +
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
	  		"<p>Gram negative diplococci: "+gram_arr[result[0].gram_stain]+"</p>"+
	  		"<p>Pus cell/HPF: "+hpf_arr[result[0].hpf]+"</p><br/>"+
	  		"<h2>2. Culture</h2>"+
	  		"<p>Has yielded "+grow_arr[result[0].is_growth]+" of Gram negative diplococci at 37°C"+
	  		" for 48 hours with 5% CO<sub>2</sub></p><br/>";
	  		if(result[0].is_growth==1){
	  			roughhtmlcontent+="<h2>3. VITEK-2 System</h2>"+
		  		"<p>Neisseria gonorrhoeae "+gram_arr[result[0].is_vitek]+" </p><br/>";
		  		if(result[0].is_vitek==1){
			  		roughhtmlcontent+="<h2>4. Sensitivity test</h2>"+
			  		"<table width='50%''>"+
			  		"<tr><td>Penicillin</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].penicillin]+"</td></tr>"+
					"<tr><td>Cefixime</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].cefixime]+"</td></tr>"+
					"<tr><td>Ceftriaxone</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].ceftriaxone]+"</td></tr>"+
					"<tr><td>Azythromycin</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].azythromycin]+"</td></tr>"+
					"<tr><td>Ciprofloxacin</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].ciprofloxacin]+"</td></tr>"+
					"<tr><td>Tetracycline</td>&nbsp;&nbsp;&nbsp;&nbsp;<td></td><td>"+sensitivity_arr[result[0].tetracycline]+"</td></tr>"+
					"</table>";
				}
	  		}
	  		roughhtmlcontent+="<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<br/>"+
				"<table width='100%'>"+
				"<tr>"+
				"<td>"+
				"<hr/>"+
				"<center>Consultant <br/> STI surveillance program</center>"+
				"<td>"+
				"<td>"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
				"</td>"+
				"<td>"+
				"<hr/>"+
				"<center>Principal Scientific Officer <br/> Dept. of microbiology</center>"+
				"</td>"+
				"<tr/>"+
				"</table>";
	  		
		roughhtmlcontent+="</body></html>";
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
		            "height": "28mm",
		            "contents": {
		        	}
		    	}
        	}
    	});
    	// res.end(roughhtmlcontent);
    });
}