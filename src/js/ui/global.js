var $ = require('jquery');
//提示框
var lxMsg = function (text, callback) {
    if ($(".lx-msg")) {
        $(".lx-msg").remove();
    }
    $("body").append("<div class='lx-msg'>" + text + "</div>");

    var msg = $(".lx-msg");
    var w = msg[0].offsetWidth;
    var h = msg[0].offsetHeight;

    msg.css({"opacity": "1", "marginTop": -h / 2, "marginLeft": -w / 2});

    setTimeout(function () {
        msg.css("opacity", "0");

        setTimeout(function () {
            msg.remove();
            if (callback != undefined) {
                callback();
            }
        }, 500)

    }, 2000);

}
//提示框
var lxConfirm = function (data, callback1, callback2) {

    var html = "<div class='lx-confirm'><h2>" + data.text + "</h2><p><span>" + data.btn1 + "</span><span>" + data.btn2 + "</span></p><b></b></div>";

    $("body").append(html);
    var confirm = $(".lx-confirm");
    var w = confirm[0].offsetWidth;
    var h = confirm[0].offsetHeight;
    activityShow(".lx-mask");
    confirm.css({
        "opacity": "1",
        "marginTop": -h / 2,
        "marginLeft": -w / 2
    }).find("p span").eq(0).css({"background": "#ff9d11", "border-color": "#ff9d11", "color": "#fff"});
    confirm.children("b").click(function () {
        activityHide(".lx-mask");
        confirm.css("opacity", "0");
        setTimeout(function () {
            confirm.remove();
        }, 500);
    });
    confirm.find("p").on("click", "span", function () {
        var index = $(this).index();
        if (index == 0) {
            callback1();
        } else if (index == 1) {
            callback2();
        } else {
            return true;
        }
    });

}
// localStorage 存
var setLocalStorage = function(name,val){
    // if (!name) return;
	// if (typeof content !== 'string') {
	// 	val = JSON.stringify(val);
	// }
    localStorage.setItem(name,val);
}
// localStorage 取
var getLocalStorage = function(name){
    // if (!name) return;
    var names =  localStorage.getItem(name);
    return  names;
}
// localStorage 删
var delLocalStorage = function(name){
    // if (!name) return;
    localStorage.removeItem(name);
}

var formatDate = function (time) {
    var y = time.getFullYear();//年
    var m = time.getMonth() + 1;//月
    var d = time.getDate();//日
    var h = time.getHours();//时
    var mm = time.getMinutes();//分
    var s = time.getSeconds();//秒
    m = m >= 10 ? m : "0" + m;
    d = d >= 10 ? d : "0" + d;
    h = h >= 10 ? h : "0" + h;
    mm = mm >= 10 ? mm : "0" + mm;
    s = s >= 10 ? s : "0" + s;
    var time=y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
    return time
}

var isMobile = function(){
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid || ipad;
    if(isMobile) {
        return true;
    }else {
        return false;
    }
}
var getQueryString = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}
var pages = function(data){
    var html = " ";
    var nowPage = Number(data.nowPage);
    var totalPage = Number(data.totalPage);
    var sidePage = Number(data.sidePage);
    var midPage = Number(data.midPage);

    if (totalPage > sidePage * 2 + midPage * 2 + 1) {

        for (var i = 0; i < sidePage; i++) {
            html += '<span data-page=' + (i + 1) + '>' + (i + 1) + '</span>';
        }

        if (nowPage - midPage <= sidePage + 1) {
            for (var i = sidePage; i < sidePage + 2 * midPage + 1; i++) {
                html += '<span data-page=' + (i + 1) + '>' + (i + 1) + '</span>';
            }
        } else {
            html += '<span data-page="prev">...</span>';
        }

        if (nowPage - midPage > sidePage + 1
            && nowPage + midPage + sidePage < totalPage) {

            for (var i = nowPage - midPage; i <= nowPage + midPage; i++) {
                html += '<span data-page=' + i + '>' + i + '</span>';
            }

        }

        if (nowPage + midPage + sidePage >= totalPage) {
            for (var i = totalPage - sidePage - 2 * midPage - 1; i < totalPage - sidePage; i++) {
                html += '<span data-page=' + (i + 1) + '>' + (i + 1) + '</span>';
            }
        } else {
            html += '<span data-page="next">...</span>';
        }

        for (var i = totalPage - sidePage; i < totalPage; i++) {
            html += '<span data-page=' + (i + 1) + '>' + (i + 1) + '</span>';
        }

    } else {
        for (var i = 1; i <= totalPage; i++) {
            html += '<span data-page=' + i + '>' + i + '</span>';
        }
    }

    if (totalPage > 1) {
        return '<span class="pagination-prev" data-page="prev"></span>' + html + '<span class="pagination-next"  data-page="next"></span>';
    } else {
        return html;
    }
}
module.exports.lxMsg = lxMsg;
module.exports.lxConfirm = lxConfirm;
module.exports.setLocalStorage = setLocalStorage;
module.exports.getLocalStorage = getLocalStorage;
module.exports.delLocalStorage = delLocalStorage;
module.exports.formatDate = formatDate;
module.exports.isMobile = isMobile;
module.exports.pages = pages;
module.exports.getQueryString = getQueryString;