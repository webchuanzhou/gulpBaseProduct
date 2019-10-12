var $ = require('jquery');
var global = require('ui/global')
$(function(){
    var detail = {
        id:"",
        token:global.getLocalStorage('token'),
        init:function(){
            var url = location.href;
            var ids = url.split("?")[1];
            this.id = ids.split("=")[1];
            this.getDetail();
        },
        getDetail:function(){
            var _this =this ;
            $.ajax({
                type:"get",
                url:appconfig.apiUrl + "article/show",
                beforeSend: function(request) {
                    request.setRequestHeader("token", _this.token);
                },
                data:{id:_this.id},
                success:function(res){
                    if(res.code==1){
                        var data = res.data.rows;
                        $(".title-data h3").html(data.title);
                        var time = global.formatDate(new Date(data.fabutime*1000))
                        $(".time").html(time);
                        $(".content-text").html(data.content)
                    }else{
                        global.lxMsg('获取失败')
                    }
                }
            })
        }
    }
    detail.init();
})