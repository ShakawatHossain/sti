module.exports.printData = function (id,res,con,app){
    var query_string="SELECT * FROM table_gp INNER JOIN sero_result ON "+
    "table_gp.KEY_ID=sero_result.table_gp_id WHERE table_gp.KEY_ID="+id;
    // console.log(query_string);
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        var dr = new Date(result[0].mob_created_at);
        var drpt = new Date(result[0].rpt_created_at);
        var hos_name= ['','DMCH','MMCH','CMCH','RMCH','SBMCH','SOMCH','ThDH','BaDH'];
        var dept_name= ['','Gaynae-Obs','Skin VD'];
        var pt_sex= ['','Male','Female','Transgender'];
        var vdrl_arr= ['','Reactive','Not reactive'];
        var tpha_arr= ['','Positive','Negative'];
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
        if(result[0].visit_sm_vs==1){
            if(spec==="")
                spec+="Vaginal swab";
            else
                spec+=", Vaginal swab";
        }
        if(result[0].visit_sm_bd==1){
            if(spec==="")
                spec+="Blood";
            else
                spec+=", Blood";
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
            "<center><h1>serological Report</h1></center>"+
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
                "<td>Refered by </td><td> "+hos_name[result[0].main_hos_code]+"&amp;"+dept_name[result[0].main_dept]+"</td>"+
                "<td>Age</td><td> "+result[0].demo_age+"</td>"+
                "<tr/><tr>"+
                "</tr><tr>"+
                "<td>Specimen </td><td> "+spec+"</td>"+
                "<td>Sex</td><td> "+pt_sex[result[0].demo_sex]+"</td>"+
                "</tr>"+
            "</table></center>"+
            "<h2>1. VDRL test report</h2>"+
            "<p> "+vdrl_arr[result[0].is_reactive]+"</p>"+
            "<br/>";
            if(result[0].is_tpha==1){
                roughhtmlcontent+="<h2>2. TPHA test report</h2>"+
                "<p> "+tpha_arr[result[0].tpha_result]+"</p></br>";
            }
            
            roughhtmlcontent+=
                "<br/>"+
                "<br/>"+
                "<br/>"+
                "<br/>"+
                "<br/>"+
                "<br/>"+
                "<br/>";

            roughhtmlcontent+=
                "<br/>"+
                "<table width='100%'>"+
                "<tr>"+
                "<td>";
            if(result[0].head_sign==1){
                roughhtmlcontent+="<center><img src='file:///home/erp/sti/assets/img/culture.png' alt='culture' height='80' width='80'/></center>";
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