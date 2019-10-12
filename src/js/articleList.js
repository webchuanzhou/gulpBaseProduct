var $ = require('jquery');
var global = require('ui/global')
$(function(){
    var articleList = {
        token:global.getLocalStorage('token'),
        pageNo: 0,
        nextPage: 1,
        pageSize: 10,
        init:function(){
            var _this =this;
            this.getList(this.nextPage,this.pageSize);
             //分页    
            $(".pagination").on("click", "span:not(.show)", function () {

                var type = $(this).attr("data-page");
                var index = " ";

                if (type == "prev") {

                    if (_this.pageNo - 1 < 1) {
                        global.lxMsg("当前已是第一页");
                        return;
                    } else {
                        index = _this.pageNo - 1;
                    }

                } else if (type == "next") {
                    if (parseInt(_this.pageNo) + 1 > _this.totalPage) {
                        global.lxMsg("当前已是最后一页");
                        return;
                    } else {
                        index = parseInt(_this.pageNo) + 1;
                    }

                } else {
                    index = type;
                }
                _this.getList(index,_this.pageSize);
            });
        },
        getList:function(pages,length){
            var _this = this ;
            $.ajax({
                type:"Get",
                url:appconfig.apiUrl + "article/article",
                data:{"page":pages,"length":length,class_id:0},
                beforeSend: function(request) {
                    request.setRequestHeader("token", _this.token);
                },
                success:function(res){
                    if(res.code==1){
                        var html = "";
                        var data = res.data.rows;
                        var page = res.data.bj;
                        if(data.length ==0){
                            global.lxMsg('暂无新闻')
                            $('.quo-bd-fot').css("display", "none");
                        }
                        _this.pageNo = page.pageNo;
                        _this.nextPage = page.nextPage;
                        _this.totalPage = page.totalPage;
                        $(".quo-bd-fot p b").html(page.total);
                        $(".pagination-all").html(_this.totalPage);
                        
                        $(".quo-bd-fot .pagination").html(global.pages({"nowPage": _this.pageNo, "totalPage": _this.totalPage, "sidePage": 2, "midPage": 2})).children("span[data-page=" + _this.pageNo + "]").addClass("show");

                        for(var i = 0;i<data.length;i++){
                            var time = global.formatDate(new Date(data[i].fabutime*1000))
                            html+="<div class='blog-post-content'>"+
                                    "<div class='title-data'>"+
                                        "<h3>"+data[i].title+"</h3>"+
                                        "<ul>"+
                                            "<li class='time'>"+time+"</li>"+
                                        "</ul>"+
                                    "</div>"+
                                    "<div class='content-text'>"+data[i].description+"</div>"+
                                    "<div class='Blog-link'>"+
                                        "<a class='btn-black trans' href='articleDetail.html?id="+data[i].id+"'>更多内容</a>"+
                                    "</div>"+
                                "</div>"
                        }
                        $(".articleL").html(html);
                    }
                }
            })
        }
    }
    articleList.init();
})