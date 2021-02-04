module.exports.printData = function (id,res,con,app){
    var query_string="SELECT * FROM table_gp INNER JOIN culture_result ON "+
    "table_gp.KEY_ID=culture_result.table_gp_id WHERE table_gp.KEY_ID="+id;
    // console.log(query_string);
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        var roughhtmlcontent="<html><body>"+
			"<center><h1>Microbiological Report</h1></center>"+
			"<br/>"+
			"<hr/>"+
			"<table width='100%'>"+
	  			"<tr>"+
	  			"<td>ID no</td><td>"+result[0].main_case_id+"</td>"+
	  			"<td>Date recieved</td><td>"+result[0].mob_created_at+"</td>"+
	  			"</tr></body></html>"
		roughhtmlcontent+="</body></html>";
        res.pdfFromHTML({
	        filename: 'generated.pdf',
	        htmlContent: roughhtmlcontent,
	        options: {
	        	format: "A3",
		        orientation: "portrait",
		        border: "10mm",
		        header: {
	            height: "45mm",
	            contents: "<table width='100%'>"+
	  			"<tr>"+
	    		"<td><img src='/assets/img/bdgov.png' alt='BD GOVT' height='80' width='80'/><td>"+
	    		"<td><center>"+
	      		"<p>Government of the People\'s Republic of Bangladesh"+
	      		"<br/>"+
	      		"Institute of Epidemiology, Disease Control &amp; Research"+
	      		"<br/>"+
	      		"Mohakhali, Dhaka-1212, Bangladesh</p>"+
	    		"</center></td>"+
	    		"<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
	    		"<td><img src='/assets/img/iedcr.jpg' alt='BD GOVT' height='60' width='60'/></td>"+
	  			"</tr>"+
				"</table>"
	        	},
	        	 "footer": {
		            "height": "28mm",
		            "contents": {
		            first: 'Cover page',
		            2: 'Second page', // Any page number is working. 1-based index
		            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
		            last: 'Last Page'
		        	}
		    	},
		    	base: "http://locahost:3000"
        	}
    	});
    	// res.end(result[0].demo_name);
    });
}