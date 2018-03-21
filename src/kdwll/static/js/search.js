var advContainerHeight;

// $(function () {
//     //暂存高级面板的高度。
//     advContainerHeight = $(".adv-search-container").outerHeight(true);
//     $(".adv-search-container").css("height", "0px");
//     $(".adv-search-container").hide();
//     //触发window的resize。
//     $(window).resize();
//     //滚动到一定高度将标题栏固定在顶端。
//     $(window).scroll(function (event) {
//         var height = 60;
//         if ($(".adv-search-container").css("display") != "none") {
//             height += $(".adv-search-container").height();
//         }
//
//         if ($(document).scrollTop() > height) {
//             $(".fixed-title-row").show();
//         } else {
//             $(".fixed-title-row").hide();
//         }
//     });
//     //layui相关组件。
//     layui.use(["element", "form", "util", "laydate"], function () {
//         //表单渲染。
//         var form = layui.form;
//         form.render();
//         //日期框渲染。
//         var laydate = layui.laydate;
//         laydate.render({
//             elem: "#announcementTimeFrom"
//         });
//         laydate.render({
//             elem: "#announcementTimeTo"
//         });
//         //右下角工具按钮。
//         var util = layui.util;
//         util.fixbar({
//             bar1: "&#xe614;",
//             click: function (type) {
//                 if (type === "bar1") {
//                     advSearchPanel_toggle();
//                 }
//             }
//         });
//         //如果没有显示顶端的高级搜索按钮，则一直尝试添加。
//         setInterval(function () {
//             if ($(".adv-search-zone").length != 0) {
//                 return;
//             }
//             var aAdv = $("<a class=\"btn-wx-login\" href=\"javascript:;\">高级搜索</a>");
//             aAdv.click(function (event) {
//                 advSearchPanel_toggle();
//             });
//             $("<li class='layui-nav-item adv-search-zone'></li>").append(aAdv).prependTo("header > ul");
//         }, 200);
//         //如果是手机版页面，则弹出提示告诉用户右下角的齿轮按钮就是高级搜索选项。
//         if ($("body").width() < 768 && window.localStorage && !window.localStorage["doNotShowAdvTip"]) {
//             layui.use(["layer"], function () {
//                 var layer = layui.layer;
//                 layer.confirm("“高级搜索”功能位于右下角的齿轮按钮中。", {
//                     title: "提示",
//                     btn: ["确定", "不再提示"]
//                 }, function () {
//                     layer.closeAll();
//                 }, function () {
//                     window.localStorage["doNotShowAdvTip"] = true;
//                     layer.closeAll();
//                 });
//             });
//         }
//     });
// });

var listItemhtml;

$(function () {
    loadAnnouncementTimeRange();
    count = getArg("count") || 10;
    keyWord = getArg("key");
    // $("input[type='text']").keydown(function (event) {
    //     if (event && event.keyCode == 13) {
    //         doSearch();
    //     }
    // });
    // $(".btn-search").click(doSearch);
    $(".btn-collapse-all").click(btnCollapseAll_onClick);
    $(".btn-collapse-all").bind("touchend", function (event) {
        event.preventDefault();
        btnCollapseAll_onClick();
    });
    $(".btn-to-next-highlight").bind("click",
        btnToNextHighlight_onClick);
    $(".btn-to-next-highlight").bind("touchend",
        function (event) {
            event.preventDefault();
            btnToNextHighlight_onClick(event);
        });
    listItemhtml = $(".info-row-container").html();
    var loadingBox = $("<div></div>").addClass("loading-box");
    $("<img src='/static/layui/css/modules/layer/default/loading-2.gif'/>").appendTo(loadingBox);
    $(".info-row-container").html("").append(loadingBox);
    // restoreArgs();
    doSearch0(keyWord);
});


// function advSearchPanel_toggle() {
//     $("html,body").animate({
//         scrollTop: 0
//     }, 200);
//     if ($(".adv-search-container").css("display") == "none") {
//         $(".adv-search-container").show();
//         $(".adv-search-container").animate({
//             height: advContainerHeight + "px"
//         }, function () {
//             $(".adv-search-container").css("height", "auto");
//             $(window).resize();
//         });
//     } else {
//         $(".adv-search-container").animate({
//             height: "0px"
//         }, function () {
//             $(".adv-search-container").hide();
//             $(window).resize();
//         });
//     }
// }

var count;

// function restoreArgs() {
//     var o = getArgs();
//     for (var k in o) {
//         var value = o[k];
//         var input = $("input[type='text'][name='" + k + "']");
//         input.val(value.replace(/\+/g, " "));
//         $("input[type='radio'][name='" + k + "'][value='" + value
//             + "']").prop("checked", true);
//     }
// }

function getArg(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return "";
}

function getArgs(o) {
    o = o || {};
    //这里的参数是url带过来的。
    var arr = ["key"];
    $.each(arr, function (i, e) {
        if (o[e] == undefined) {
            o[e] = getArg(e);
        }
    });
    // var searchRangeArr = [];
    // if ($("input[type='checkbox'][name='searchTitle']").prop("checked")) {
    //     searchRangeArr.push("title");
    // }
    // if ($("input[type='checkbox'][name='searchContent']").prop(
    //         "checked")) {
    //     searchRangeArr.push("content");
    // }
    // if (searchRangeArr.length) {
    //     o.searchRange = searchRangeArr.join(",");
    // }
    return o;
}

function getArgsString(o) {
    var o = getArgs(o);
    var arr = [];
    for (var k in o) {
        arr.push(k + "=" + encodeURIComponent(o[k]));
    }
    return arr.join("&");
}


function btnCollapseAll_onClick() {
    $(".expand-icon[expanded='expanded']").each(function (i, e) {
        collapse($(e));
    });
}

var prevHighlightIndex;

function btnToNextHighlight_onClick() {
    ++prevHighlightIndex;
    var hls = $(".font-highlight");
    var count = hls.length;
    if (!prevHighlightIndex) {
        prevHighlightIndex = 0;
    }
    if (prevHighlightIndex < 0) {
        prevHighlightIndex = 0;
    }
    if (prevHighlightIndex >= count) {
        prevHighlightIndex = 0;
    }
    hls.css("background-color", "");
    var o = $(hls[prevHighlightIndex]);
    o.css("background-color", "#cccccc");
    var offset = o.offset();
    var top = (offset || {}).top;
    var scrollTop = top - $(window).height() / 2.0;
    if (top) {
        $("html,body").animate({
            scrollTop: scrollTop
        }, 200);
    }
}


function loadAnnouncementTimeRange() {
    $.get("/api/v1/statistics", function (data) {
        if (data.code != 100) {
            return;
        }
        data = data.data;
        var str = "<p>已存储数据表："
            + data.table_count
            + "<br/>数据项记录数："
            + data.data_item_count
            + "</p>";
        $(".time-range-value").html(str);
    });
}

var expandedCount = 0;

function listItem_onClick(event) {
    var btn = $(event.srcElement || event.target);
    var tableIndexId = btn.attr("table-index-id");
    var elements = loadedElements[tableIndexId];
    if (btn.attr("expanded") != "expanded") {
        var expand = function () {
            btn.attr("expanded", "expanded");
            btn.html("&#xe619;")
            elements.shortContent.hide();
            elements.fullContent.parent().show();
            elements.fullContent.animate({
                height: elements.fullContentHeight + "px"
            }, 200);
            ++expandedCount;
            // $(".tool-btn-zone").show();
        };
        expand();
    } else {
        collapse(btn);
    }
}

function collapse(btn) {
    if (btn.attr("expanded") == "unexpanded") {
        return;
    }
    var tableIndexId = btn.attr("table-index-id");
    var elements = loadedElements[tableIndexId];
    btn.attr("expanded", "unexpanded");
    btn.html("&#xe61a;")
    elements.fullContent.animate({
        height: "0px"
    }, 200, function () {
        elements.fullContent.parent().hide();
        elements.shortContent.show();
    });
    --expandedCount;
    // if (expandedCount == 0) {
    //     $(".tool-btn-zone").hide();
    // }
}

// function doSearch() {
//     var getRadioValue = function (name) {
//         var value = null;
//         $("input[type='radio'][name='" + name + "']").each(function (i, e) {
//             var radio = $(e);
//             if (radio.next(".layui-form-radio").hasClass("layui-form-radioed")) {
//                 value = radio.val();
//             }
//         });
//         return value;
//     };
//     window.location.href = "/search/search.html?"
//         + getArgsString({
//             searchTitleWord: $("input[type='text'][name='searchTitleWord']").val(),
//             searchContentWord: $("input[type='text'][name='searchContentWord']").val(),
//             secCode: $("input[type='text'][name='secCode']").val(),
//             secName: $("input[type='text'][name='secName']").val(),
//             announcementTimeSorting: getRadioValue("announcementTimeSorting"),
//             secType: getRadioValue("secType"),
//             announcementTimeFrom: $("input[type='text'][name='announcementTimeFrom']").val(),
//             announcementTimeTo: $("input[type='text'][name='announcementTimeTo']").val(),
//             start: 0
//         });
// }

var loadedData = {};

/**
 * 数据格式：
 * {
 *    id:{
 *       shortContent:$shortContentObj,
 *       fullContent:$fullContentObj,
 *    }
 * }
 */
var loadedElements = {};

function doSearch0(key) {
    var oldTitle = document.title;
    // var searchTitleWord = getArg("searchTitleWord");
    // var searchContentWord = getArg("searchContentWord");
    /*if (searchString.replace(/(^\s*)|(\s*$)/g, "") == "") {
     window.location.href = "index.html";
     return;
     }*/
    $(".list-item").remove();
    var func = function (data) {
        document.title = oldTitle;
        if (data.code != 100) {
            return;
        }
        data = data.data;
        $(".list-item-loading").remove();
        if (data.total_count == 0) {
            var noDataObj = $("<div class='layui-col-xs12 no-data-message'></div>").html("对不起，没有查询到您需要的数据！");
            $(".info-row-container").html("").append(noDataObj);
            return;
        }
        $.each(data.result, function (i, e) {
            var item = $(listItemhtml);
            item.appendTo(".info-row-container");
            item.find(".table-name").html(e.table.table);
            item.find(".table-source").html(e.table.source);
            var title = item.find(".table-remark").html(e.table.remark);
            var shortContent = item.find(".short-content-row");
            shortContent.html("简短内容");
            var fullContentText = "<br>详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容"
                + "详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容<br>"
                + "详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容<br>"
                + "详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容<br>";
            var fullContent = item.find(".full-content-row");
            fullContent.html(fullContentText);
            var fullContentHeight = fullContent.outerHeight();
            fullContent.css("height", "0px").parent().hide();
            item.find(".detail-info").html(
                "录入时间："
                + e.table.create_time
                + "\t命中记录数：2");
            loadedElements[e.table.index_id] = {
                shortContent: shortContent,
                fullContent: fullContent,
                // fullContentHeight: fullContentHeight,
                fullContentHeight: 100,
                fullContentLength: 100,
            };
            item.find(".expand-icon").attr("table-index-id", e.table.index_id).click(listItem_onClick);
        });
        $(".search-result-container").html(
            "用时 " + (data.elapsed_millsec / 1000).toFixed(2)
            + " 秒，共搜索到 " + data.total_count + " 条记录");
        $(".loading-box").remove();
        // processPagination(data);
    };
    document.title = "【正在搜索，请稍候……】" + oldTitle;
    $.get("/api/v1/search/"+key, func);
}

// function processPagination(data) {
//     var searchString = getArg("searchString");
//     var laypage = layui.laypage;
//     layui.use("laypage", function () {
//         var laypage = layui.laypage;
//         laypage.render({
//             elem: "pageContainer",
//             curr: data.page,
//             count: data.totalCount,
//             first: "首页",
//             last: "末页",
//             jump: function (obj, first) {
//                 if (first) {
//                     return;
//                 }
//                 window.location.href = "search.html?" + getArgsString({
//                         start: (obj.curr - 1) * obj.limit
//                     })
//             }
//         });
//     });
// }

// function setAnnouncementTime(mode) {
//     var from, to;
//     if (mode == 0) {
//         from = to = new Date().format("yyyy-MM-dd");
//     } else if (mode == 1) {
//         var dd = new Date();
//         to = dd.format("yyyy-MM-dd");
//         dd.setDate(dd.getDate() - 2);
//         from = dd.format("yyyy-MM-dd");
//     } else if (mode == 2) {
//         var dd = new Date();
//         to = dd.format("yyyy-MM-dd");
//         dd.setDate(dd.getDate() - 6);
//         from = dd.format("yyyy-MM-dd");
//     } else if (mode == 3) {
//         var time = new Date();
//         time.setDate(time.getDate() - time.getDay() + 1);
//         from = time.format("yyyy-MM-dd");
//         time.setDate(time.getDate() - time.getDay() + 7);
//         to = time.format("yyyy-MM-dd");
//     } else if (mode == 4) {
//         var time = new Date();
//         from = time.format("yyyy-MM-01");
//         time = new Date(time.getFullYear(), time.getMonth() + 1, 0);
//         to = time.format("yyyy-MM-dd");
//     } else if (mode == 5) {
//         var time = new Date();
//         from = time.format("yyyy-01-01");
//         to = time.format("yyyy-12-31");
//     } else if (mode == 6) {
//         from = "";
//         to = "";
//     }
//     $("input[name='announcementTimeFrom']").val(from);
//     $("input[name='announcementTimeTo']").val(to);
//
// }
