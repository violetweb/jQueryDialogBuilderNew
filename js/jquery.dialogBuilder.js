/**
* jQuery dialog builder.
*
* Author: Valerie Trotter
* http://violetweb.ca
*
* Copyright (c) 2013 Valerie Trotter
* Dual licensed under the MIT and GPL licenses.
*
*/
(function($) {
  $.fn.dialogBuilder = function(options) {
    var opts = $.extend({}, $.fn.dialogBuilder.defaults, options);
  
    // build the dialogs
    $this = $(this);   
    if($this.is("ul")) {
      buildNode($this.find("li:first"), 0, opts);
    }
  
};

  // Option defaults
  $.fn.dialogBuilder.defaults = {
      resizable: false,
      height:'auto',
      modal: true,
      width: 600,
      position:'top',
      closeOnEscape: false,
      autoOpen: false,
      closeText: "close"
   
  };


  // Method that recursively builds the dialogs
  function buildNode($node, level, opts) {
  
   
   var $childNodes = $node.children("ul:first").find("li");
   // Get the contents - any markup except li and ul allowed
    var $nodeContent = $node.clone().children("ul,li")
                            .remove()
                            .end()
                            .html();

                                   
   //FIRST ELEMENT:
   var $dialogId = $($nodeContent).attr("id");   
   var $buttons = $($nodeContent).children("span");
   var $title = $($nodeContent).children("h3").html();
   var $dialogContent = $($nodeContent).children("span,h3").remove().end().html();
   var dialog = buildDialog($dialogId,$buttons,$dialogContent,$title,opts);

   //CHILD ELEMENTS:

   $childNodes.each(function() {
        var $nodeContent = $(this).clone().children("ul,li")
                                .remove()
                                .end()
                                .html();
        var $dialogId = $($nodeContent).attr("id");  
        var $buttons = $($nodeContent).children("span");
        var $title = $($nodeContent).children("h3").html();
        var $dialogContent = $($nodeContent).children("span,h3").remove().end().html();
        var dialog = buildDialog($dialogId,$buttons,$dialogContent,$title,opts);
    }); 

};
function callMethod(method,params){
    var fn = window[method];
    fn.apply(null,params);
}
//http://localhost/jQueryDialogBuilderNew/%22nameofrestful.asp%22,%22param1=123&param2=S1%22,%22%22?_=1377037346189
function buildDialog(dialogId,dialogButtons,dialogContent,dialogTitle,opts){
  
  var $button1 = $(dialogButtons[0]).attr("data-button-text");
  var $button2 = $(dialogButtons[1]).attr("data-button-text"); 
  var $b1funcCall = $(dialogButtons[0]).attr("data-button-function");

  var $b2funcCall = $(dialogButtons[1]).attr("data-button-function"); 
  var $b1GotoCall = $(dialogButtons[0]).attr("data-button-goto");
  var $b2GotoCall = $(dialogButtons[1]).attr("data-button-goto"); 
 
 
  var btns = {};
  if ($button1!=undefined){
    btns[0] = { 
        text: $button1,
        click: function () {
            //* If there's a function / ajax call, make it.
            if ($b1funcCall!=""){
              //call data function//
              var methods = $b1funcCall.split("|");               
              callMethod(methods[0],methods[1].split(","));
            }
            if ($b1GotoCall!=""){
              //closed current.
              $(this).dialog("close");
              //Open next.                
              $("#"+$b1GotoCall).dialog("open");
            }            
        }        
      }
   }
  
   if ($button2!=undefined){
     btns[1] = { 
        text: $button2,
        click: function () {
            //* If there's a function / ajax call, make it.
            if ($b2funcCall!=""){
              //call data function
             var methods = $b2funcCall.split("|");               
              callMethod(methods[0],methods[1].split(","));
            }
            if ($b2GotoCall!=""){
              //closed current.
              $(this).dialog("close");
              //Open next.                
              $("#"+$b2GotoCall).dialog("open");
            }            
        }        
      }
  }

  var $newDialog = $("<div id='"+dialogId+"BD' style='display:none;'>"+dialogContent+"</div>");
  $newDialog.dialog({
      resizable: opts.resizable,
      height: opts.height,
      modal: opts.modal,
      width: opts.width,
      position: opts.position,
      closeOnEscape: opts.closeOnEscape,
      autoOpen: opts.autoOpen,
      closeText: opts.closeText,
    open: function(event, ui) { 
        //hide close button to direct users through flow... only last box with no buttons will show a close.
        if (btns[0]!=undefined) {   
            $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
        }

        //Add class for styling to only - yes or no - buttons.
        $('.ui-dialog-buttonset').find('span:contains("Yes")').parent().addClass("yesButtonClass");
        $('.ui-dialog-buttonset').find('span:contains("No")').parent().addClass("noButtonClass");
    },
    buttons: btns

  });
 
}

})(jQuery);
