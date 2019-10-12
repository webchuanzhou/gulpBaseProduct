var $ = require('jquery');
var Swiper = require('swiper');
$(function(){
    var project = {
        init:function(){
            // this.banner();
            // this.ScrollSet();
        },
        Scroll:function(){},
        ScrollSet:function(){
            this.Scroll.prototype.upScroll=function(dom,_h,interval){
                var dom=document.getElementById(dom);
                var timer=setTimeout(function(){
                    var _field=dom.firstElementChild;
                    _field.style.marginTop=_h;
                    clearTimeout(timer);
                },1000)
                setInterval(function(){
                    var _field=dom.firstElementChild;
                    _field.style.marginTop="0px";
                    dom.appendChild(_field);
                    var _field=dom.firstElementChild
                    _field.style.marginTop=_h;
                },interval)
            }
            var myScroll=new this.Scroll();
            myScroll.upScroll("demo","-36px",3000);
        },
        banner:function(){
            new Swiper('.swiper-container', {
                spaceBetween: 30,
                pagination: {
                el: '.swiper-pagination',
                clickable: true,
                },
            });
        }
    }
    project.init();
})