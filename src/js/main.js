/*! functions.js */
var $ = require('jquery');
var global = require('ui/global');
$(function(){
  
  var home = {
    init:function(){
      home.navheader();
      // home.application();
      // home.case_scroll();
    },
    navheader:function(){
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
    },
    // application:function(){
    //   $(".sub_item").hover(function(){
    //     var _this = $(this);
    //     _this.addClass("cur");
    //     _this.removeClass("out");
    //     //hov_sub(_this);
    //   },function(){
    //     var _this = $(this);
    //     _this.removeClass("cur");
    //     _this.addClass("out");
    //     //out_sub(_this);
    //   })


    //   $(".series_menu li .ca_a").hover(function(){
    //     var index = $(this).parent().index();

    //     $(".series_menu li").removeClass("cur");
    //     $(this).parent().addClass("cur");

    //     $(".series_cbg_img").removeClass("hover");
    //     $(".series_cbg_img").eq(index).addClass("hover");

    //   })

    //   $(".nw_gk_wrap .gkl_nav li").hover(function(){
    //     var index = $(this).index();

    //     $(".nw_gk_wrap .gkl_nav li").removeClass("cur");
    //     $(this).addClass("cur");

    //     $(".gp").removeClass("hover");
    //     $(".gp").eq(index).addClass("hover");

    //     $(".gkr_bg").removeClass("hover");
    //     $(".gkr_bg").eq(index).addClass("hover");
    //   })
    // },
    case_scroll:function(){
      $.fn.cxScroll=function(settings){
        if(!this.length){return;};
        settings=$.extend({},$.cxScroll.defaults,settings);

        var obj=this;
        var scroller={};
        scroller.fn={};

        scroller.box=obj.find(".box");
        scroller.list=scroller.box.find(".list");
        scroller.items=scroller.list.find("li");
        scroller.itemSum=scroller.items.length;

        if(scroller.itemSum<=1){return;};

        scroller.plusBtn=obj.find(".plus");
        scroller.minusBtn=obj.find(".minus");
        scroller.itemWidth=scroller.items.outerWidth();
        scroller.itemHeight=scroller.items.outerHeight();

        if(settings.direction=="left"||settings.direction=="right"){
          if(scroller.itemWidth*scroller.itemSum<=scroller.box.outerWidth()){return;};
          scroller.plusVal="left";
          scroller.minusVal="right";
          scroller.moveVal=scroller.itemWidth;
        }else{
          if(scroller.itemHeight*scroller.itemSum<=scroller.box.outerHeight()){return;};
          scroller.plusVal="top";
          scroller.minusVal="bottom";
          scroller.moveVal=scroller.itemHeight;
        };

        // 元素：左右操作按钮
        if(settings.plus&&!scroller.plusBtn.length){
          scroller.plusBtn=$("<a></a>",{"class":"plus"}).appendTo(obj);
        };
        if(settings.minus&&!scroller.minusBtn.length){
          scroller.minusBtn=$("<a></a>",{"class":"minus"}).appendTo(obj);
        };

        // 元素：后补
        scroller.list.append(scroller.list.html());

        // 方法：开始
        scroller.fn.on=function(){
          if(!settings.auto){return;};
          scroller.fn.off();

          scroller.run=setTimeout(function(){
            scroller.fn.goto(settings.direction);
          },settings.time);
        };

        // 方法：停止
        scroller.fn.off=function(){
          if(typeof(scroller.run)!=="undefined"){clearTimeout(scroller.run);};
        };

        // 方法：增加控制
        scroller.fn.addControl=function(){
          if(settings.plus&&scroller.minusBtn.length){
            scroller.plusBtn.bind("click",function(){
              scroller.fn.goto(scroller.plusVal);
            });
          };
          if(settings.minus&&scroller.minusBtn.length){
            scroller.minusBtn.bind("click",function(){
              scroller.fn.goto(scroller.minusVal);
            });
          };
        };

        // 方法：解除控制
        scroller.fn.removeControl=function(){
          if(scroller.plusBtn.length){scroller.plusBtn.unbind("click");};
          if(scroller.minusBtn.length){scroller.minusBtn.unbind("click");};
        };

        // 方法：滚动
        scroller.fn.goto=function(d){
          scroller.fn.off();
          scroller.fn.removeControl();
          scroller.box.stop(true);

          var _max;	// _max	滚动的最大限度
          var _dis;	// _dis	滚动的距离

          switch(d){
          case "left":
          case "top":
            _max=0;
            if(d=="left"){
              if(parseInt(scroller.box.scrollLeft(),10)==0){
                scroller.box.scrollLeft(scroller.itemSum*scroller.moveVal);
              };
              _dis=scroller.box.scrollLeft()-(scroller.moveVal*settings.step);
              if(_dis<_max){_dis=_max};
              scroller.box.animate({"scrollLeft":_dis},settings.speed,function(){
                if(parseInt(scroller.box.scrollLeft(),10)<=_max){
                  scroller.box.scrollLeft(0);
                };
                scroller.fn.addControl();
              });
            }else{
              if(parseInt(scroller.box.scrollTop(),10)==0){
                scroller.box.scrollTop(scroller.itemSum*scroller.moveVal);
              };
              _dis=scroller.box.scrollTop()-(scroller.moveVal*settings.step);
              if(_dis<_max){_dis=_max};
              scroller.box.animate({"scrollTop":_dis},settings.speed,function(){
                if(parseInt(scroller.box.scrollTop(),10)<=_max){
                  scroller.box.scrollTop(0);
                };
                scroller.fn.addControl();
              });
            };
            break;
          case "right":
          case "bottom":
            _max=scroller.itemSum*scroller.moveVal;
            if(d=="right"){
              _dis=scroller.box.scrollLeft()+(scroller.moveVal*settings.step);
              if(_dis>_max){_dis=_max};
              scroller.box.animate({"scrollLeft":_dis},settings.speed,function(){
                if(parseInt(scroller.box.scrollLeft(),10)>=_max){
                  scroller.box.scrollLeft(0);
                };
              });
            }else{
              _dis=scroller.box.scrollTop()+(scroller.moveVal*settings.step);
              if(_dis>_max){_dis=_max};
              scroller.box.animate({"scrollTop":_dis},settings.speed,function(){
                if(parseInt(scroller.box.scrollTop(),10)>=_max){
                  scroller.box.scrollTop(0);
                };
              });
            };
            break;
          };
          scroller.box.queue(function(){
            scroller.fn.addControl();
            scroller.fn.on();
            $(this).dequeue();
          });
        };

        // 事件：鼠标移入停止，移出开始
        scroller.box.hover(function(){
          scroller.fn.off();
        },function(){
          scroller.fn.on();
        });

        scroller.fn.addControl();
        scroller.fn.on();
      };

      // 默认值
      $.cxScroll={defaults:{
        direction:"right",	// 滚动方向
        step:1,				// 滚动步长
        speed:800,			// 滚动速度
        time:4000,			// 自动滚动间隔时间
        auto:true,			// 是否自动滚动
        plus:true,			// 是否使用 plus 按钮
        minus:true			// 是否使用 minus 按钮
      }};

      $("#pic_list_1").cxScroll();

    }
  }
  home.init();

  var footer = {
      token:global.getLocalStorage('token'),
      init:function(){
        this.base();
        this.getNewsRow();
        this.commonProduct();
        this.Solve();
        this.link();
        var mobile=global.isMobile();
        if(mobile){
          this.mobileY(".contact-page",400)
          this.mobileY(".mainTop90",400)
        }; 
      },
      link:function(){
        var _this = this ;
        $.ajax({
            type:"Get",
            url:appconfig.apiUrl + "flink/index",
            beforeSend: function(request) {
              request.setRequestHeader("token", _this.token);
            },
            success:function(res){
                if(res.code==1){
                    var html='';
                    for(var i=0;i<res.rows.text.length;i++){
                      html+='<a href='+res.rows.text[i].url+' target="_blank">'+res.rows.text[i].webname+'</a>'
                    }
                    $(".nw_f_link").append(html)
                }
            }
        })
      },
      mobileY:function(el,val){
         $(el).css({
            minHeight:(window.innerHeight-$(".header-container").outerHeight()-$(".nw_footer_wrap").outerHeight()+val)+"px"
          })
      },
      getNewsRow:function(){
        var _this = this ;
        $.ajax({
            type:"Get",
            url:appconfig.apiUrl + "article/article",
            beforeSend: function(request) {
              request.setRequestHeader("token", _this.token);
            },
            success:function(res){
                if(res.code==1){
                    var html = "";
                    html+="<dt>新闻动态</dt>";
                    var data = res.data.rows;
                    for(var i =0;i<data.length;i++){
                        html+="<dd><a href='articleDetail.html?id="+data[i].id+"' title="+data[i].title+">"+data[i].title+"</dd></a>";
                    }
                    $(".news_footer").html(html);
                }
            }
        })
    },
    base:function(){
      var _this = this ;
      $.ajax({
        url:appconfig.apiUrl +"common/setting",
        type:"Get",
        beforeSend: function(request) {
          request.setRequestHeader("token", _this.token);
        },
        success:function(res){
          if(res.code==200){
            var data = res.data.rows;
            $(".beiAnCode").html(data.beian);
            $(".usCode").attr("src",data.business_cooperation)
            // $(".contact_personal").html(data.contact_personal)
            $(".contact_official").html(data.contact_official)
            $(".feedback").html(data.feedback)
          }
        }
      })
    },
    commonProduct:function(){
      var _this = this;
      $.ajax({
          type:"get",
          url:appconfig.apiUrl + "product/index",
          success:function(res){
            var html="",footerHtml="";
            html+='<ul>'
            for(var i=0;i<res.data.rows.length;i++){
                // html+='<a href="/product.html?type='+res.data.rows[i].id+'"><h3>'+res.data.rows[i].title+'</h3></a>'
                html+='<li><a href="/product.html?type='+res.data.rows[i].id+'"><h3>'+res.data.rows[i].title+'</h3></a></li>'
                if( i==3 || i==7){
                  html+='</ul><ul>'
                }else if (i>7 && i == (res.data.rows.length-1)){
                  html+='</ul>'
                }
                
              if(i<3){
                footerHtml+='<dd><a href="/product.html?type='+res.data.rows[i].id+'">'+res.data.rows[i].title+'</a></dd>'
              }
            }
            $(".productHeader").html(html)
            $(".m_left ul li:eq(0)").addClass("cur")
            $(".fgc_item_03 dl").append(footerHtml);
          }
      })
    },
    Solve:function(){
        var _this = this;
        $.ajax({
            type:"get",
            url:appconfig.apiUrl + "solution/index",
            success:function(res){
                if(res.code==1){
                    var htmlTitle = '',htmlInner = '',htmlBack = '',list = res.data.rows,headerSolve = '';;
                    for(var i =0;i<list.length;i++){
                        if(i<3){
                            htmlTitle+='<li >'+
                                '<a href="javascript:;">'+
                                    '<span>'+list[i].title+'</span>'+
                                    '<i></i>'+
                                '</a>'+
                            '</li>';
                            htmlInner+='<div class="gp">'+
                                '<div class="gkl_p_title">'+list[i].vice_title+'</div>'+
                                '<div class="gkl_p_jtil">'+list[i].content+'</div>'+
                                '<div class="gkl_p_btn">'+
                                    '<a href="'+list[i].link+'">了解更多</a>'+
                                '</div>'+
                            '</div>';
                            htmlBack+='<div class="gkr_bg" style="background: url('+list[i].imgurl+') no-repeat top right;"></div>'
                        }
                        headerSolve+='<a href="'+list[i].link+'">'+
                          '<h3>'+list[i].title+'</h3>'+
                          '<cite>'+list[i].content+'</cite>'+
                        '</a>'
                    }
                    $('.cpin').html(headerSolve);
                    $('.gkl_nav ul').html(htmlTitle);
                    $('.gkl_nav ul li:eq(0)').addClass('cur');
                    $('.gkl_panl').html(htmlInner);
                    $('.gkl_panl div.gp:eq(0)').addClass('hover');
                    $('.gk_right').html(htmlBack);
                    $('.gk_right div.gkr_bg:eq(0)').addClass('hover');
                    _this.Solvehover();
                }
            }
        })
            
    },
    Solvehover:function(){
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
  }
  footer.init();
  
})

