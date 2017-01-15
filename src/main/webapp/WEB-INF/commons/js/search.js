var currPage = 1; // 当前页数
var pageSize = 12; // 每页条数
var size = 9999; //触发弹出提示的字符串长度
$(function() {

	// 搜索按钮点击搜索事件
	$("#search").click(function() {
		var content = $.trim($("#content").val());
		if (null != content && '' != content) {
			search();
		}
	});

	// 搜索文本框回车搜索事件
	$("#content").keydown(function(event) {
		if ('13' == event.keyCode) {
			var content = $.trim($("#content").val());
			if (null != content && '' != content) {
				$("#search").trigger("click");
			}
			// 此处return false必须写，为了防止控件回车自己跳转
			return false;
		}
	});
	
	getKeyWords();

});

//根据用户输入查询关键字
function getKeyWords(){
	$('#content').typeahead( {
		source : function(query, process) {
			var arry = [];
			$.ajax( {
				url : "util_getKeywords.action",
				method : "post",
				data : ( {
					"keyword" : query
				}),
				cache : false,
				async : false,
				success : function(data) {
					var list = data.keywordList;
					for(var i=0;i<list.length;i++){
						arry[i] = list[i];
					}
				}
			});
			return arry;
		},
		updater : function(item) {
			return item;
		}
	});
}

/**
 * 搜索商品公共方法
 * 
 * @return
 */
function search(spflid) {
	$("#loading").removeAttr("style");
	// 搜索商品内容
	var content = $.trim($("#content").val());
	if (null != content) {
		$
				.ajax( {
					type : "post",
					cache : false,
					// async : false,
					url : "goods_getGoodsList.action",
					data : ( {
						"currentPage" : currPage,
						"pageSize" : pageSize,
						"spflid" : spflid,
						"content" : content
					}),
					success : function(data) {
						var html = data.html;
						if ('' == html) {
							html += "<div align=\"center\"><font size=\"4\" color=\"red\">没有可以显示的商品！</font></div>";
						}
						var total = data.total;
						var totalPage = parseInt(data.totalPage);
						currPage = parseInt(data.currPage);
						$("#goodsList").html(html);
						// 加载商品后绑定popover事件
						$("a[data-toggle='popover']").popover( {
							trigger : 'hover',
							placement : 'bottom'
						}).show();
						var pageHtml = "";
						if (currPage <= 1 || 0 == totalPage) {
							pageHtml = "<ul><li class=\"disabled\"><a data-original-title=\"-1\">上一页</a></li>";
						} else {
							pageHtml = "<ul><li><a data-original-title=\"-1\">上一页</a></li>";
						}
						// 隐藏多余页数按钮标志
						var hidPrevBtnFlag = false;
						var hidNextBtnFlag = false;
						for ( var i = 1; i <= totalPage; i++) {
							/**
							 * 1、第一页和第二页显示 2、倒数第一页和倒数第二页显示
							 * 3、当前页、当前页的上一页和当前页的下一页显示
							 */
							if ((i <= 2)
									|| (i >= (totalPage - 1))
									|| ((i >= currPage - 1) && (i <= currPage + 1))) {
								if (parseInt(currPage) == i) {
									pageHtml += "<li class=\"disabled\"><a data-original-title=\""
											+ i + "\">" + i + "</a></li>";
								} else {
									pageHtml += "<li><a data-original-title=\""
											+ i + "\">" + i + "</a></li>";
								}
							} else {
								if (!hidPrevBtnFlag) {
									if (currPage - 1 > 2 && i == currPage - 2) {
										var content = "btn_";
										for ( var j = 3; j < currPage - 1; j++) {
											if (j != currPage - 2) {
												content += j + ",";
											} else {
												content += j;
											}
										}
										pageHtml += "<li><a data-content=\""
												+ content
												+ "\" data-original-title=\"\" id=\"prevHideYs\">...</a></li>";
										hidPrevBtnFlag = true;
									}
								}
								if (!hidNextBtnFlag && i == currPage + 2) {
									if (currPage + 1 < totalPage - 1) {
										var content = "btn_";
										for ( var j = currPage + 2; j < totalPage - 1; j++) {
											if (j != totalPage - 2) {
												content += j + ",";
											} else {
												content += j;
											}
										}
										pageHtml += "<li><a data-content=\""
												+ content
												+ "\" data-original-title=\"\">...</a></li>";
										hidNextBtnFlag = true;
									}
								}
							}
						}
						if (currPage >= totalPage) {
							pageHtml += "<li class=\"disabled\"><a data-original-title=\"+1\">下一页</a></li>";
						} else {
							pageHtml += "<li><a data-original-title=\"+1\">下一页</a></li>";
						}
						pageHtml += "<li class=\"disabled\"><a>共<font color='red'>"
								+ total + "</font>条</a></li></ul>";
						$(".pagination").html(pageHtml);
						$(".pagination a").click(function() {
							var queryFlag = true;
							var page = $(this).attr("data-original-title");
							if ('' != page && 'undefined' != typeof (page)) {
								if ('-1' == page) {
									// 上一页
								if (0 == totalPage || 1 == currPage) {
									// 当前页为第一页时，按钮被置灰，不能进行查询
									queryFlag = false;
									return false;
								}
								currPage = currPage + parseInt(page);
								if (currPage < 1) {
									currPage = 1;
								}
							} else if ('+1' == page) {
								if (0 == totalPage || totalPage == currPage) {
									// 当前页为最后一页时，按钮被置灰，不能进行查询
									queryFlag = false;
									return false;
								}
								currPage = currPage + parseInt(page);
								if (currPage > totalPage) {
									currPage = totalPage;
								}
							} else {
								if (0 == totalPage || currPage == page) {
									// 当前页为点击的页数时，按钮被置灰，不能进行查询
									queryFlag = false;
									return false;
								}
								currPage = parseInt(page);
							}
							if (queryFlag) {
								search();
							}
						} else {
							if ('undefined' != typeof (page)) {
								$(this).popover( {
									trigger : 'click',
									placement : 'top'
								});
							}
						}
					}	);
						$("#loading").hide();
						$('body,html').animate( {
							scrollTop : 0
						}, 1000);
						var content = $.trim($("#content").val());
						var spcjHtml = "<span class='badge badge-success'>全部结果</span>&nbsp;&nbsp;<span class='badge'>></span>&nbsp;&nbsp;<b>";
						spcjHtml += "<span class='badge badge-important'>" + content + "</span></b>";
						$("#spcj").html(spcjHtml);
					}
				});
	}
	var keywords = $.trim($("content").val());
	if ('' != keywords) {
		$(document).attr('title', keywords + " - 商品搜索 - 全得利");
	} else {
		$(document).attr('title', "全得利网上商城 - 咱内丘的网上商城");
	}
}

function btnFy(ys) {
	currPage = ys;
	search();
}