/** SAMPLE:
	var url = 'survey_ajax.asp';
	var params = "QA=" + ttext + "&QID=" + qques + "&QType=" + qtype + "&QText=" + ttext + "&abnid=" + abnid;
	doAjaxCall(url,params,'');
**/

var doAjaxCall = function(url,params,callbackFunction){
	$.ajax({
		type: "GET",
		cache: false,
		datatype: "html",							
		url: url,
		//Figure out what the parameters are.
		data: params
		}).done(function( msg ) {		
		  if (callbackFunction){

			callbackFunction;	
		 }			
	}).fail(function ( jqXHR, textStatus, errorThrown ) {
	    console.log(jqXHR);
	    console.log(textStatus);
	    console.log(errorThrown);
	});   
}