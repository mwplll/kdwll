//标记footer的动态位置固定。
$(function () {
    //footer
    $("body").append("<footer class='footer-fixed layui-bg-black'></footer>");
    $("<p></p>").html("Copyright © " + new Date().getFullYear() + " kdwll.com, All rights reserved. " +
        "<a href=\"http://www.miitbeian.gov.cn/\" target=\"_blank\">浙ICP备5555555号-5</a>&nbsp;").appendTo("footer");

    // function footerPosition() {
    //     var contentHeight = $("body").outerHeight();//网页正文全文高度
    //     if ($("footer").hasClass("footer-fixed")) {
    //         contentHeight += $("footer").outerHeight();
    //     }
    //     var winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
    //     if (contentHeight < winHeight) {
    //         //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
    //         $("footer").addClass("footer-fixed");
    //     } else {
    //         $("footer").removeClass("footer-fixed");
    //     }
    // }
    //
    // var lastScrollHeight = -1;
    // setInterval(function () {
    //     if (lastScrollHeight != document.body.scrollHeight) {
    //         lastScrollHeight == document.body.scrollHeight
    //         footerPosition();
    //     }
    // }, 200);
    // $(window).resize(footerPosition);
});
