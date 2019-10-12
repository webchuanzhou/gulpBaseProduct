var $ = require('jquery');
var global = require('ui/global');
$(function(){
    var product = {
        type:global.getQueryString('type'),
        rowlength:0,
        init:function(){
            this.ajaxRow();
            this.ajaxShow();
            this.scrollpro();
        },
        scrollpro:function(){
            var a = $('.rubal_c_ball ul'),
            b =a.offset();
            //   var rowlength = $(".rubal_c_ball").find('li').length
            var _this =this;
            $(document).on('scroll',function(){
            var	c = $(document).scrollTop();
                if(b.top<=c){
                    a.css({
                        'position':'fixed',
                        'top':'0px',
                        'box-shadow': '0px 2px 4px #eee'
                    })
                }else{
                    a.css({
                        'position':'static',
                        'top':'0px',
                        'box-shadow': '0px 2px 4px #fff'
                    })
                }

                rows(_this.rowlength);
          
      
            })
        },
        ajaxRow:function(){
            var _this = this;
            $.ajax({
                type:"get",
                url:appconfig.apiUrl + "product/index",
                success:function(res){
                    if(res.code ==1){
                        var array=res.data.rows;
                        var html="";
                        var wz = 0;
                        for(var i=0;i<array.length;i++){
                            html+='<dl>'+
                                '<dt  onclick=location.href="'+"/product.html?type="+array[i].id+'">'+array[i].title+'</dt>'+
                            '</dl>'
                            if(_this.type == array[i].id){
                                wz = i;
                            }
                        }
                        $(".rubal_side").html(html);
                        $(".rubal_side").find('dl dt:eq('+wz+')').addClass('cur');
                        
                    }else{
                        global.lxMsg(res.msg); 
                    }
                }
            })
        },
        ajaxShow:function(){
            var _this = this;
            $.ajax({
                type:"get",
                url:appconfig.apiUrl + "product/show?id="+this.type,
                success:function(res){
                    if(res.code ==1){
                        _this.titleInner(res.data)
                        _this.moduleTitle(res.data)
                    }else{
                        global.lxMsg(res.msg); 
                    }
                }
            })
        },
        titleInner:function(data){
            $(".rubal_title").html(
                '<div class="rubal_c_banner rubal_poleline_banner_product" style="height: 440px;background:#E2F0FF  url('+data.rows.imgurl+') no-repeat 600px 80px;background-size: 370px auto; ">'+
                   ' <div class="banner_lars">'+
                        '<h1>'+data.rows.vice_title+'</h1>'+
                        '<p>'+data.rows.describe+'</p>'+
                        '<a href="'+data.rows.demo_address+'" target="_blank">进入演示站</a>'+
                    '</div>'+
                '</div>'
            )
        },
        moduleTitle:function(data,getdata){
            var html="";
            var z=0;
            for(var i in data.bj){
                this.rowlength = z;
                html+='<li ><a href="javascript:;">'+data.bj[i].title+'</a></li>';
                z+=1;
                if(data.bj[i].type == 'image_text'){
                    this.cptexin(z,data.bj[i].title,data.bj[i].item);
                }
                if(data.bj[i].type == 'images'){
                    this.gnjs(z,data.bj[i].title,data.bj[i].value);
                }
                if(data.bj[i].type == 'url'){
                    this.jkwd(z,data.bj[i].title,data.bj[i].value);
                }
            }
            $(".rubal_c_ball ul").html(html);
            $(".rubal_c_ball ul:eq(0)").addClass('cur');
        },
        cptexin:function(index,name,data){
            var html="";
            html+='<h2>'+name+'</h2>'+
                '<div class="model_content slick">'+
            '<ul>'
            for(var i=0;i<data.length;i++){
                if(data[i].img ==""){
                    continue
                }else{
                    html+='<li>'+
                    '<i class="poleline_ico_02" style="background: url('+data[i].img+') no-repeat;"></i>'+
                    '<h3>'+data[i].title+'</h3>'+
                    '<p>'+data[i].content+'</p>'+
                '</li>'
                }
            }
            html+='</ul>'+
            '</div>';
            $("#tl_0"+index).html(html)
        },
        gnjs:function(index,name,img){
            var html="";
            html+='<h2>'+name+'</h2>'+
                '<div class="model_content">'+
                '<div class="content_s2_Hdmoney" style="background: url('+img+') no-repeat;"></div>'+
            '</div>'
            $("#tl_0"+index).html(html)
        },
        jkwd:function(index,name,url){
            var html="";
            html+='<h2>'+name+'</h2>'+
                '<div class="model_content help_dom">'+
                '<p><a href="'+url+'" target="_black">接口文档</a></p>'+
            '</div>'
            $("#tl_0"+index).html(html)
        }
    }
    product.init();
    $(".rubal_c_ball").on("click","li",function(){
        var id='#tl_0'+ ($(this).index()+1);
        $("html,body").animate({'scrollTop': $(id).offset().top -50}, 1000);
    })
    var qcloud={};
        $('[_t_nav]').hover(function(){
            var _nav = $(this).attr('_t_nav');
            clearTimeout( qcloud[ _nav + '_timer' ] );
            qcloud[ _nav + '_timer' ] = setTimeout(function(){
                $('[_t_nav]').each(function(){
                    $(this)[ _nav == $(this).attr('_t_nav') ? 'addClass':'removeClass' ]('nav-up-selected');
                });
                $('#'+_nav).stop(true,true).slideDown(200);
            }, 150);
        },function(){
            var _nav = $(this).attr('_t_nav');
            clearTimeout( qcloud[ _nav + '_timer' ] );
            qcloud[ _nav + '_timer' ] = setTimeout(function(){
                $('[_t_nav]').removeClass('nav-up-selected');
                $('#'+_nav).stop(true,true).slideUp(200);
            }, 150);
        });
        $(".menu_wrap .m_left li").hover(function(){
            $(".menu_wrap .m_left li").removeClass("cur");
            $(".gx_vbm").hide();
            $(this).addClass("cur");
            $(".gx_vbm").eq($(this).index()).show();
        })

                
})
  
 
  function rows(rowlength){
    var X = $('#tl_01').offset().top - $(window).scrollTop() -60;
  
    var Y = $('#tl_02').offset().top - $(window).scrollTop() -60;

    var Z = $('#tl_03').offset().top - $(window).scrollTop() -60;
    if(rowlength>2){
        var O = $('#tl_04').offset().top - $(window).scrollTop() -60;
    }
    if(rowlength>3){
        var J = $('#tl_05').offset().top - $(window).scrollTop() -60;
    }
       if(X > 0){
        $('.rubal_c_ball li').removeClass('cur');
        $('.rubal_c_ball li:eq(0)').addClass('cur')
       }
    if(X < 0 && Y > 0){
        $('.rubal_c_ball li').removeClass('cur')
        $('.rubal_c_ball li:eq(0)').addClass('cur')
    }
    if(Y < 0 && Z > 0){
        $('.rubal_c_ball li').removeClass('cur')
        $('.rubal_c_ball li:eq(1)').addClass('cur')
    }
    if(rowlength <=2){
        if(Z < 0){
            $('.rubal_c_ball li').removeClass('cur')
            $('.rubal_c_ball li:eq(2)').addClass('cur')
        }
    }else{
        if(Z < 0 && O > 0){
            $('.rubal_c_ball li').removeClass('cur')
            $('.rubal_c_ball li:eq(2)').addClass('cur')
        }
        if(rowlength <=3){
            if(O < 0){
                $('.rubal_c_ball li').removeClass('cur')
                $('.rubal_c_ball li:eq(3)').addClass('cur')
            }
        }else{
            if(O < 0 && J > 0){
                $('.rubal_c_ball li').removeClass('cur')
                $('.rubal_c_ball li:eq(3)').addClass('cur')
            }
            if(J < 0){
                $('.rubal_c_ball li').removeClass('cur')
                $('.rubal_c_ball li:eq(4)').addClass('cur')
            }
        }
    }
    // if(Z < 0 && O > 0){
    //     $('.rubal_c_ball li').removeClass('cur')
    //     $('.rubal_c_ball li:eq(2)').addClass('cur')
    // }
    // if(O < 0){
    //     $('.rubal_c_ball li').removeClass('cur')
    //     $('.rubal_c_ball li:eq(3)').addClass('cur')
    // }
  //   if(Z < 0){
  //       $('.rubal_c_ball li').removeClass('cur')
  //       $('.rubal_c_ball li:eq(2)').addClass('cur')
  //   }
  
  }
  