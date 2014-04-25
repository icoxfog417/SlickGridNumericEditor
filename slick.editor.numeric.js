/***
 * Contains Numeric(Decimal) SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "Numeric": NumericEditor
      }
    }
  });

  function NumericEditor(args) {
    var $input;
    var defaultValue = "";
    var scope = this;
    var lang = "";
    var numberInputCount = 0;
    
    this.getLang = function(){
      try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2)
      } catch(e){
        return undefined;
      }
    }
    
    this.init = function () {
      numberInputCount = 0;
      lang = this.getLang();

      $input = $("<INPUT type='text' class='editor-text' />")
        .appendTo(args.container)
        .bind("keydown", function (e) {
          if (!(e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT ||
            e.keyCode === $.ui.keyCode.UP || e.keyCode === $.ui.keyCode.DOWN || 
            e.keyCode === $.ui.keyCode.ENTER)) {
            numberInputCount += 1;
          }
        })
        .focus()
        .select();

    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return ($input.val() == "") ? "" : parseFloat($input.val());
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return numberInputCount > 0;
    };

    this.chooseMsg = function(msgs){
      var msg = "";
      var dfMsg = "";
      for(var lg in msgs){
        if(lg == lang){
          msg = msgs[lg];
        }else if(lg == "default"){
          dfMsg = msgs[lg];
        }
      }
      
      if(msg == "" && dfMsg != ""){
        msg = dfMsg;
      }

      return msg;
    }

    this.validate = function () {
      if ($input.val() != "") {
        if (isNaN($input.val())) {
          return {
            valid: false,
            msg: this.chooseMsg({ "ja": "数値を入力してください", "default": "Please enter a number" })
          };
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }
})(jQuery);
