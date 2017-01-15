$(function(){
	//检测浏览器版本
	var support = isSupport();
	support = true;
	if (support) {
		$('.nosupport').remove();
	} else {
		$('.nosupport').removeClass('hide');
		$('body').children().each(function() {
			if (!$(this).hasClass('nosupport')) {
				$(this).remove();
			}
		});
		$(document).attr('title',"浏览器版本不支持");
	}
});

function isSupport() {
	if (navigator.userAgent.indexOf("MSIE 6.0") > 0 || 
			navigator.userAgent.indexOf("MSIE 7.0") > 0 ||
			navigator.userAgent.indexOf("MSIE 8.0") > 0 ||
			navigator.userAgent.indexOf("MSIE 9.0") > 0) {
		return false;
	}
	return true;
}