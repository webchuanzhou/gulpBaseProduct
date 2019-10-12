var $ = require('jquery');
var fullpage = require('ui/fullpage.min');
var global = require('ui/global')
$(function(){
    var security = {
        init:function(){
            var icon = $('.icon-footer')
            icon.on('click', function () {
                fullpage_api.moveSectionDown();
            })
            var mobile=global.isMobile();
            if(mobile){
                this.fullpage(false)
            }else{
                this.fullpage(true)
            } 
        },
        fullpage:function(isOpen){
            new fullpage('#fullpage', {
                //options here
                autoScrolling: isOpen,
                scrollHorizontally: true,
                normalScrollElements: '#list',
            }) 
        },
    }
    security.init();
})