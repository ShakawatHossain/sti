module.exports.printData = function (id,res,con,app){
    
    var query_string="SELECT * FROM table_gp INNER JOIN pcr_result ON "+
    "table_gp.KEY_ID=pcr_result.table_gp_id WHERE table_gp.KEY_ID="+id;
    
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        var dr = new Date(result[0].mob_created_at);
        var drpt = new Date(result[0].pcr_created_at);
        var hos_name= ['','DMCH','MMCH','CMCH','RMCH','SBMCH','SOMCH','ThDH','BaDH'];
        var dept_name= ['','Gaynae-Obs','Skin VD'];
        var pt_sex= ['','Male','Female','Transgender'];
        var sti_type_arr= ['','1','2','3','4','5','6'];
        var result_arr= ['','Positive','Negative'];
        var spec = "";
        if([result[0].sti_type]==1){
            if(result[0].visit_sm_ul==1){
            if(spec==="")
                spec+="Ulcer swab";
            else
                spec+=", Ulcer swab";
            }
            if(result[0].visit_sm_ur==1){
            if(spec==="")
                spec+="Urine";
            else
                spec+=", Urine";
            }
        }
        else if([result[0].sti_type]==2){            
            if(result[0].visit_sm_ur==1){
            if(spec==="")
                spec+="Urine";
            else
                spec+=", Urine";
            }
        }
        else if([result[0].sti_type]==3){            
            if(result[0].visit_sm_us==1){
                spec+="Urethal swab";
            }
            if(result[0].visit_sm_ur==1){
            if(spec==="")
                spec+="Urine";
            else
                spec+=", Urine";
            }
        }
        else if([result[0].sti_type]==4){            
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
        }
        else if([result[0].sti_type]==5){            
            if(result[0].visit_sm_es==1){
            if(spec==="")
                spec+="Endocervical swab";
            else
                spec+=", Endocervical swab";
            }
            if(result[0].visit_sm_ur==1){
            if(spec==="")
                spec+="Urine";
            else
                spec+=", Urine";
            }
        }
        else if([result[0].sti_type]==6){            
            if(result[0].visit_sm_us==1){
                spec+="Urethal swab";
            }
            if(result[0].visit_sm_vs==1){
            if(spec==="")
                spec+="Vaginal swab";
            else
                spec+=", Vaginal swab";
            }
            if(result[0].visit_sm_es==1){
            if(spec==="")
                spec+="Endocervical swab";
            else
                spec+=", Endocervical swab";
            }
            if(result[0].visit_sm_ur==1){
            if(spec==="")
                spec+="Urine";
            else
                spec+=", Urine";
            }
        }
        var patho="";
        if(result[0].ngo==1){
        	if(patho==="")
        		patho+="N. gonorrhoea";
        	else
        		patho+=", N. gonorrhoea";
        }
        if(result[0].ctr==1){
        	if(patho==="")
        		patho+="C. trachomatis";
        	else
        		patho+=", C. trachomatis";
        }
        if(result[0].tpa==1){
        	if(patho==="")
        		patho+="T. pallidum";
        	else
        		patho+=", T. pallidum";
        }
        if(result[0].mge==1){
        	if(patho==="")
        		patho+="M. genitalium";
        	else
        		patho+=", M. genitalium";
        }
        if(result[0].mho==1){
        	if(patho==="")
        		patho+="M. hominis";
        	else
        		patho+=", M. hominis";
        }
        if(result[0].uur==1){
        	if(patho==="")
        		patho+="U. urealyticum";
        	else
        		patho+=", U. urealyticum";
        }
        if(result[0].upa==1){
        	if(patho==="")
        		patho+="U. parvum";
        	else
        		patho+=", U. parvum";
        }
        if(result[0].gva==1){
        	if(patho==="")
        		patho+="G. vaginalis";
        	else
        		patho+=", G. vaginalis";
        }
        if(result[0].tva==1){
        	if(patho==="")
        		patho+="T. vaginalis";
        	else
        		patho+=", T. vaginalis";
        }
        if(result[0].hsv1==1){
        	if(patho==="")
        		patho+="Herpes simplex virus type 1 (HSV-1)";
        	else
        		patho+=", Herpes simplex virus type 1 (HSV-1)";
        }
        if(result[0].hsv2==1){
        	if(patho==="")
        		patho+="Herpes simplex virus type 1 (HSV-2)";
        	else
        		patho+=", Herpes simplex virus type 1 (HSV-2)";
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
			"<center><h1>Laboratory test Report</h1></center>"+
			"<br/>"+
			"<center><table width='90%'>"+
	  			"<tr>"+
	  			"<td>ID no</td><td>"+result[0].main_case_id+"</td>"+
	  			"<td>Site &amp; Dept </td><td> "+hos_name[result[0].main_hos_code]+"&amp;"+dept_name[result[0].main_dept]
	  			+"</td>"+
	  			"</tr><tr>"+
	  			"<td>Patient\'s name </td><td> "+result[0].demo_name+"</td>"+
	  			"<td>Age "+result[0].demo_age+"</td><td>Sex"+pt_sex[result[0].demo_sex]+"</td>"+
	  			"</tr><tr>"+
	  			"<td>Syndromic case diagnosis </td><td> "+sti_type_arr[result[0].sti_type]+"</td>"+
	  			"<td>Specimen </td><td> "+spec+"</td>"+
	  			"<tr/><tr>"+
	  			"</tr><tr>"+
	  			"<td>Sample collection Date</td><td>"+dr.getFullYear() + "-" + (dr.getMonth()+1) + "-" +
	  			 dr.getDate()+"</td>"+
	  			"<td>Date of report</td><td>"+drpt.getFullYear() + "-" + (drpt.getMonth()+1) + "-" +
	  			 drpt.getDate()+"</td>"+
	  			"</tr>"+
	  		"</table></center>"+
	  		"<h2>Test details</h2>"+
	  		"<p>Multi plex Real Time PCR is carried out by Bosphore STD Panel Bundle Kit v4"+
	  		"(BIO-RAD CFX96 <sup>TM</sup> Real Time PCR Detection System) to detect STI pathogens"+
	  		" which includes Nesseria gonorrhoea, Chlamydia trachomatis, Treponema pallidum, "+
	  		"Mycoplasma genitalium, Mycoplasma hominis, Ureaplasma urealyticum, Ureaplasma "+
	  		"urealyticum, Ureaplasma, Gardnerella vaginalis, Trichomonas and Herpes simplex"+
	  		" virus type 1 (HSV-1) and type 2 (HSV-2).</p><br/><br/>"+
	  		"<p>Result: "+result_arr[result[0].result]+" for "+patho+"</p>";

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
				"<td>";
                if(result[0].head_sign>0){
                    roughhtmlcontent+="<center><img src='file:///home/erp/sti/assets/img/pcr.jpg' alt='bdlogo' height='80' width='80'/></center>";
                }
				roughhtmlcontent+="<hr/>"+
				"<center>Microbiologist <br/> STI surveillance program</center>"+
				"<td>"+
				"<td>"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	  			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
				"</td>"+
				"<td>";
                if(result[0].head_sign>0){
                    roughhtmlcontent+="<center><img src='file:///home/erp/sti/assets/img/head.png' alt='bdlogo' height='80' width='80'/></center>";
                }
				roughhtmlcontent+="<hr/>"+
				"<center>Head <br/> Dept. of microbiology</center>"+
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