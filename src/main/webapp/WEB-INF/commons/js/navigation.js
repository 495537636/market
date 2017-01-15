var isLoadGwcFlag = false;
var html = '';
$(function(){
	
	//加载购物车信息
	loadGwc();
	
	//查询商品分类列表
	$("#spfl").click(function(){
		$.ajax({
			type : "post",
			cache : false,
			url : "spfl_getSpflList.action",
			data : ({"fjd":"00"}),
			success : function(data){
				$("#spflMenu").html(data.mess);
				$("#spflMenu a").bind("click",function(){
					var spflid = $(this).attr("data-original-title");
					searchGoods(spflid);
				});
			}
		});
	});
	
	$("#userSelect").click(function(){
		if(''==realname){
			document.searchFm.action = "login_index.action";
			document.searchFm.method = "post";
			document.searchFm.submit();
		}
	});
	
	//如果用户名信息不为空，则加载用户信息
	if(''!=realname&&null!=realname){
		$("#userSelect").addClass("dropdown");
		html = "<a class=\"dropdown-toggle\" data-toggle=\"dropdown\">";
		html += "<img src=\""+basePath+"common/images/yhdl.png\"/>";
		html += "&nbsp;欢迎您，"+realname+"&nbsp;&nbsp;<b class=\"caret\"></b></a>";
		$("#userSelect").html(html);
		$("#userSelect").click(function(){
			$.ajax({
				type : "post",
				cache : false,
				url : "login_getYhmkForYhid.action",
				data : ({"userid":userid}),
				success : function(data){
					var html = data.html;
					$("#userSelect").html(html);
					$("#userSelect .dropdown-menu a").click(function(){
						var operateID = $(this).attr("data-content");
						userOperate(operateID);
					});
				}
			});
		});
	}

	// 综合导航
	$("[name=headSl] a").click(function() {
		$("[name=headSl] a").each(function(){
			$(this).parent().removeClass("active");
			$(this).css({color:"",background:""});
		});
		$(this).css({color:"red",background:"#EEEFFF"});
	});
	
	//跳转到首页
	$("#homePage").click(function(){
		document.searchFm.action = "home_index.action";
		document.searchFm.method = "post";
		document.searchFm.submit();
	});
	
});

//用户操作
function userOperate(operateID){
	if(''!=operateID&&null!=operateID){
		if('1'==operateID){
			//退出登陆
			logOut();
		}else if('2'==operateID){
			//个人中心
			userCentra();
		}else if('3'==operateID){
			//我的订单
			
		}else if('4'==operateID){
			//系统维护
			xtwh();
		}
	}
}

//用户退出登陆
function logOut(){
	realname = '';
	/**
	 * 剩余退出时刷新页面问题
	 */
	document.searchFm.action = "login_logOut.action";
	document.searchFm.method = "post";
	document.searchFm.submit();
}

//个人中心
function userCentra(){
	document.searchFm.action = "grzx_index.action";
	document.searchFm.method = "post";
	document.searchFm.submit();
}

//系统维护
function xtwh(){
	document.searchFm.action = "xtwh_index.action";
	document.searchFm.method = "post";
	document.searchFm.submit();
}

//跳转到商品信息页面
function toSpmx(spid){
	document.searchFm.action = "goods_toGoodsMxPage.action?spid="+spid;
	document.searchFm.method = "post";
	document.searchFm.target = "_blank";
	document.searchFm.submit();
}

//跳转到购物车页面
function toGwc(){
	window.location.href = "gwc_index.action";
}

//加载购物车信息
function loadGwc(){
	$.ajax({
		url : "gwc_queryGwcXx.action",
		type : "post",
		cache : false,
		async : false,
		success : function(data){
			var gwcHtml = data.gwcHtml;
			var gwcSize = data.gwcSize;
			$("#gwc").html(gwcHtml);
			$("#gwcSize").html(gwcSize);
		}
	});
}

//删除购物车信息
function deleteGwc(spid){
	$.ajax({
		url:"gwc_deleteGwc.action",
		method:"post",
		data:({"spid":spid}),
		cache:false,
		async:false,
		success:function(data){
			loadGwc();
		}
	});
}