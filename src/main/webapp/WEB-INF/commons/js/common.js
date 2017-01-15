/**
 * 公共js文件，存放公共方法及功能
 */
$(function(){
	placeholderForIE();
});

/**
 * 针对IE浏览器，不支持placeholder方法
 */
function placeholderForIE(){
	$("input, textarea").placeholder();
}

function timestampformat(timestamp) {
    return (new Date(timestamp)).format("yyyy-MM-dd hh:mm:ss");
}

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        // month
        "d+": this.getDate(),
        // day
        "h+": this.getHours(),
        // hour
        "m+": this.getMinutes(),
        // minute
        "s+": this.getSeconds(),
        // second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // quarter
        "S": this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//全局弹出消息提示
function alertMessage(){
	$('#alertMessage').modal({
	    backdrop:true,
	    keyboard:true,
	    show:true
	});
}

//根据加入购物车返回的状态做操作
function getAddToCartFlag(message){
	if(message){
		var html = "<div><img src='common/images/true.png'/>&nbsp;&nbsp;";
		html += "<font color='#7ABD54' size='5'>商品已成功加入购物车！</font>";
		html += "<button class='btn btn-danger' onclick='toGwc()'>去购物车结算>></button>";
		html += "</div>";
		$("#alertMessageContent").html(html);
		alertMessage();
	}else{
		var html = "<div><img src='common/images/error.png'/>&nbsp;&nbsp;";
		html += "<font color='red' size='5'>购物车加入失败！</font>";
		html += "</div>";
		$("#alertMessageContent").html(html);
		alertMessage();
	}
}

//文本框添加正确图片信息提示
function imgSuccess(obj){
	$(obj).css({"background-image":"url(common/images/success.png)","background-repeat":"no-repeat","background-position":"right"});
}

//文本框添加失败图片信息提示
function imgFalse(obj){
	$(obj).css({"background-image":"url(common/images/false.png)","background-repeat":"no-repeat","background-position":"right"});
}