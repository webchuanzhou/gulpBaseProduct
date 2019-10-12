var $ = require('jquery');
var global = require('ui/global');
$(function(){
    var contact = {
        token:global.getLocalStorage('token'),
        name:$("#name"),
        tel:$("#tel"),
        mihang:$("#mihang"),
        email:$("#email"),
        psInfo:$("#psInfo"),
        init:function(){
            var _this = this;
            $(".enter").click(function(){
                _this.sendUs();
            })
        },
        sendUs:function(){
            var _this = this ;
            if(_this.name.val()=="" ||_this.name.val()== null){
                global.lxMsg('姓名不能为空');
                return false;
            }
            if(_this.tel.val()=="" ||_this.tel.val()== null){
                global.lxMsg('电话号码不能为空');
                return false;
            }
            if(_this.mihang.val()=="" ||_this.mihang.val()== null){
                global.lxMsg('公司不能为空');
                return false;
            }
            if(_this.email.val()=="" ||_this.email.val()== null){
                global.lxMsg('邮箱不能为空');
                return false;
            }
            if(_this.psInfo.val()=="" ||_this.psInfo.val()== null){
                global.lxMsg('备注信息不能为空');
                return false;
            }
            var datas = {
                name:_this.name.val(),
                mobile:_this.tel.val(),
                company:_this.mihang.val(),
                email:_this.email.val(),
                content:_this.psInfo.val()
            }
            $.ajax({
                type:"post",
                url:appconfig.apiUrl + "common/contactUs",
                beforeSend: function(request) {
                    request.setRequestHeader("token", _this.token);
                },
                data:datas,
                success:function(res){
                    if(res.code==200){
                        global.lxMsg(res.msg)
                        setTimeout(function(){
                            location.reload();
                        },1000)
                    }else{
                        global.lxMsg(res.msg)
                    }
                }
            })
        }
    }
    contact.init();
})