/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()
        
      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      if(content.substring(1,4)=='div'){
      	$tip.find('.popover-content')['html'](content)
      }else{
      	$tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)
      }

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')
	  if("btn_"==content.substring(0,4)){
	  	var ys = content.substring(4).split(",");
	  	content = "<div><table>";
	  	var rows = 0;
	  	if(ys.length%10==0){
	  		rows = ys.length / 10;
	  	}else{
	  		rows = Math.floor(ys.length/10) + 1;
	  	}
	  	for(var i=0;i<rows;i++){
	  		content += "<tr align='center'>";
	  		var startNum = 10 * i;
	  		var endNum = 10 * i + 10;
	  		if(endNum>ys.length){
	  			endNum = ys.length;
	  		}
	  		for(var j=startNum;j<endNum;j++){
	  			if(j!=endNum-1){
	  				content += "<td><a onclick=\"btnFy("+ys[j]+")\">"+ys[j]+"</a>&nbsp;</td>";
		  		}else{
		  			content += "<td><a onclick=\"btnFy("+ys[j]+")\">"+ys[j]+"</a></td>";
		  		}
	  		}
	  		content += "</tr>";
	  	}
	  	content += "</table></div>";
	  }
      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
