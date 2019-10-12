var $ = require('jquery');
$(function(){
    var saas = {
        init:function(){
           this.mouseFun();
        },
        mouseFun:function(){
            $(".saas_Tes_jes_item_boxInner").mouseover(function(){
                $(this).prev().css('top','15px');
            }).mouseout(function(){
                $(this).prev().css('top','0');
            })
        }
    }
    saas.init();
})