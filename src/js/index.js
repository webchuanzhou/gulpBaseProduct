var $ = require('jquery');
const getCookie = function (name) 
{ 
    var storage=window.localStorage;
    if(storage[name]){
      return storage[name]
    }else{
      return null;
    }
} 
var storage=window.localStorage;
storage.setItem('lan','zh-CN');
var index = {
    init:function(){
        this.getBanner();
        this.myselfProdct();
    },
    
    myselfProdct:function(){
        var _this = this;
        $.ajax({
            type:"get",
            url:appconfig.apiUrl + "product/productindex",
            success:function(res){
              if(res.code==1){
                  var html='',list = res.data.rows;
                  for(var i = 0;i<list.length;i++){
                      if(i<4){
                          html+='<li class="sm_li ">'+
                            '<div class="ca_a">'+
                                '<div class="top_bg_line"></div>'+
                                '<dl>'+
                                    '<dt>'+list[i].title+'</dt>'
                            for(var j=0;j<list[i].content.length;j++){
                                html+='<dd>'+list[i].content[j].title+'</dd>'   
                            }
                            html+='<dd></dd>'+
                                    '</dl>'+
                                '</div>'+
                                '<div class="ca_b">'+
                                    '<div class="ca_b_title">'+list[i].title+'</div>'+
                                        '<div class="ca_b_content">'+
                                            '<div class="brief_item bi_b_01">'+
                                                '<ul>'
                            for(var k=0;k<list[i].content.length;k++){
                                html+='<li>'+
                                '<a href="'+list[i].link+'">'+
                                    '<div class="bi_title"><i class="bi_ico" style="background: url('+list[i].content[k].img+') no-repeat;"></i>'+list[i].content[k].title+'</div>'+
                                    '<div class="bi_content">'+list[i].content[k].content+'</div>'+
                                    '<span class="bi_span"></span>'+
                                    '</a>'+
                                '</li>'   
                            }
                            html+='</ul>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                      }
                  }
                  $('.series_menu').html(html);
                  $('.series_menu li.sm_li:eq(1)').addClass('cur')
                  _this.application();
              }
            }
        })
    },
    application:function(){
        $(".sub_item").hover(function(){
          var _this = $(this);
          _this.addClass("cur");
          _this.removeClass("out");
          //hov_sub(_this);
        },function(){
          var _this = $(this);
          _this.removeClass("cur");
          _this.addClass("out");
          //out_sub(_this);
        })
  
  
        $(".series_menu li .ca_a").hover(function(){
          var index = $(this).parent().index();
  
          $(".series_menu li").removeClass("cur");
          $(this).parent().addClass("cur");
  
          $(".series_cbg_img").removeClass("hover");
          $(".series_cbg_img").eq(index).addClass("hover");
  
        })
  
        $(".nw_gk_wrap .gkl_nav li").hover(function(){
          var index = $(this).index();
  
          $(".nw_gk_wrap .gkl_nav li").removeClass("cur");
          $(this).addClass("cur");
  
          $(".gp").removeClass("hover");
          $(".gp").eq(index).addClass("hover");
  
          $(".gkr_bg").removeClass("hover");
          $(".gkr_bg").eq(index).addClass("hover");
        })
    },
    getBanner:function(){
        var _this = this;
        $.ajax({
            type:"get",
            url:appconfig.apiUrl + "banner/index",
            success:function(res){
              if(res.code==1){
                  var html = '';
                  var list = res.data.rows;
                  for(var i = 0;i<list.length;i++){
                    html+='<li>'
                    if(list[i].is_demo =='Y'){
                        html+='<div class="nw_banner_bg" style="background: url('+list[i].banner_image+') no-repeat center center ;" >'+
                            '<div class="nbb_btn">'+
                            '<a href="'+list[i].link+'" target="_black">访问演示站</a>'+
                        '</div>'
                    }else{
                        html+='<div class="nw_banner_bg" style="background: url('+list[i].banner_image+') no-repeat center center ;" onclick="location.href='+list[i].link+'">'+
                        '</li></div>'    
                    }        
                  }
                $(".nw_slider_wrap .box_img ul").html(html)
                _this.sliderbanner();
              }
            }
        })
    },
    sliderbanner:function(){
        var timejg=5000;//轮播间隔时间
        var size = $('.box_img ul li').size();
        for(var i=1;i<=size;i++){
          $('.box_tab').append('<a href="javascript:;"></a>')
        }
  
        $('.box_img ul li').eq(0).show();
        $('.box_tab a').eq(0).addClass('active');
        $('.box_img ul li').eq(0).addClass('cur');
  
        $('.box_tab a').hover(function(){
          $(this).addClass('active').siblings().removeClass('active');
          var index = $(this).index();
          i=index;
          $('.box_img ul li').eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
          $('.box_img ul li').eq(index).addClass('cur').siblings().removeClass('cur');
        });
  
        var i = 0;
        var time = setInterval(move,timejg);
  
        function move(){
          i++;
          if(i==size){
            i=0;
          }
  
          $('.box_tab a').eq(i).addClass('active').siblings().removeClass('active');
          $('.box_img ul li').eq(i).stop().fadeIn(500).siblings().fadeOut(500);
          $('.box_img ul li').eq(i).addClass('cur').siblings().removeClass('cur');
        }
  
        $('.box').hover(function(){
          clearInterval(time);
        },function(){
          time = setInterval(move,timejg);
        });
      },
}
index.init();
if(getCookie('lan')){
    var lan = getCookie('lan');
    console.log("../i18n/"+lan+".json",2222);
    $.getJSON("../i18n/"+lan+".json", function (data){
        for(var i=0;i<$(".lange").length;i++){
          // $(".lange"+i).html(data.pages.home[$(".lange"+i).data("lan")])
          $(".lange").eq(i).html(data.pages.home[$(".lange").eq(i).data("lan")])
        }
    })
}  

// function setLan(data){
//     $('[set-lan]').each(function(){
//         var me = $(this);
//         var a = me.attr('set-lan').split(':');
//         var p = a[0];   //文字放置位置
//         var m = a[1].split('_');   //文字的标识
        
//         var t = data[m[0]][m[1]][m[2]]
//         //用户选择语言后保存在cookie中，这里读取cookie中的语言版本
//         var lan = getCookie('lan');
    
//         // //选取语言文字
//         // switch(lan){
//         //     case 'cn':
//         //         var t = cn[m];  //这里cn[m]中的cn是上面定义的json字符串的变量名，m是json中的键，用此方式读取到json中的值
//         //         break;
//         //     case 'en':
//         //         var t = en[m];
//         //         break;
//         //     default:
//         //         var t = hk[m];
//         // }
    
//         // //如果所选语言的json中没有此内容就选取其他语言显示
//         // if(t==undefined) t = cn[m];
//         // if(t==undefined) t = en[m];
//         // if(t==undefined) t = hk[m];
    
//         if(t==undefined) return true;   //如果还是没有就跳出
    
//         //文字放置位置有（html,val等，可以自己添加）
//         switch(p){
//             case 'html':
//                 me.html(t);
//                 break;
//             case 'val':
//             case 'value':
//                 me.val(t);
//                 break;
//             default:
//                 me.html(t);
//         }
    
//     });
// }
    
    