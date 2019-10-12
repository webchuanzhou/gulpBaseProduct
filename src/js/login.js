var $ = require('jquery');
var global = require('ui/global');
$(function(){
	var login = {
		userPhone:$("#username"),
		userPassword:$("#password"),
		userPasswords:$("#passwords"),
		loginButton:$("#ljb"),
		registerButton:$("#ljb2"),
		title:$(".vgo_clm"),
        vlidMessage:$(".vform_message_item"),
        vftRanks:$(".send"),
		imgCode:$(".img_code"),
		imgCodeInput:$(".img-vcode"),
		dxYzm:$(".seraph-vcode"),
        sendType:false,
		init:function(){
			//登陆
			this.loginButton.click(function(){
				login.from();
			})
			//短信
            this.vftRanks.click(function(){
                login.send();
			})
			//图形验证码
            this.imgCode.click(function(){
                login.setImgCode();
			})
			//注册
			this.registerButton.click(function(){
				login.register();
			})
			this.yput();
			this.setImgCode();
		},
		register:function(){
			if(this.userPhone.val() == '' || this.userPhone.val().length ==0){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>手机号码不能为空</p>");
				this.userPhone.parent().addClass("error-item");
				return false;
			}
			if(!this.mobile(this.userPhone.val())){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>手机格式不正确</p>");
				this.userPhone.parent().addClass("error-item");
				return false;
			}
			if(this.userPassword.val() == '' || this.userPassword.val().length ==0){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>密码不能为空</p>");
				this.userPassword.parent().addClass("error-item");
				return false;
			}
			if(this.userPassword.val()!==this.userPasswords.val()){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>两次密码不一致</p>");
				this.userPassword.parent().addClass("error-item");
				this.userPasswords.parent().addClass("error-item");
				return false;
			}
			if(this.imgCodeInput.val() == '' || this.imgCodeInput.val().length ==0){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>图形验证码不能为空</p>");
				this.imgCodeInput.parent().addClass("error-item");
				return false;
			}
			if(this.dxYzm.val() == '' || this.dxYzm.val().length ==0){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>短信验证码不能为空</p>");
				this.dxYzm.parent().addClass("error-item");
				return false;
			}
			var data = {
				"username":this.userPhone.val(),
				"captcha":this.imgCodeInput.val(),
				"code":this.dxYzm.val(),
				"password":this.userPassword.val(),
				"confirmpassword":this.userPasswords.val()
			}
			$.ajax({
				type:"post",
				url:appconfig.apiUrl+"login/register",
				data:data,
				success:function(res){
					if(res.code==200){
						global.lxMsg(res.msg);
						setTimeout(function(){
							location.href="/login.html";
						},1000)
					}else{
						global.lxMsg(res.msg);
					}
				}
			})
		},
        send:function(){
            var countdown=59; 
            var _this = this;
            if(_this.sendType){
                return false;
			}

			//请求短信
			$.ajax({
				type:"get",
				data:{type:"register",mobile:this.userPhone.val()},
				url:appconfig.apiUrl+"common/mobileSms",
				success:function(res){
					if(res.code==200){
						global.lxMsg('短信发送成功');
						settime(login.vftRanks)
						function settime(obj) { 
						    if (countdown == 0) { 
								obj.html("发送验证码")
								_this.sendType = false;
						        countdown = 60; 
						        return;
						    } else { 
								obj.html("重新发送(" + countdown + ")")
								_this.sendType = true;
						        countdown--; 
						    } 
					
						setTimeout(function() { 
						    settime(obj) }
						    ,1000) 
						}
					}else{
						global.lxMsg('短信发送失败');
					}
				}
			})
            
			

        },
        setImgCode:function(){
			$.ajax({
				type:"get",
				url:appconfig.apiUrl+'common/captcha.html',
				success:function(res){
					if(res.code==200){
						login.imgCode.attr("src",res.data.rows.url)
					}else{
						global.lxMsg('图形验证码请求失败');
					}
				}
			})
          
        },
        ClickIdentifyControl:function(){
            var slider = new ClickIdentifyControl({
                container: "#slider", //必填 容器id
                sId: "anlink#test#login",  // 必填 埋点场景ID
                host: "https:\/\/af.zhongan.io", //https://test-af.zhongan.io  或者 https://af.zhongan.io
                placeholdLabel: "智能检测中",  // 可选， loading时显示内容 可以根据业务场景更改内容
                onSuccess: function(did, token, sId){
                    console.log(did, token, sId)
                    $("input[name='did']").val(did)
                    $("input[name='token']").val(token)
                    $("input[name='s']").val(sId)
                    $("#ljb").addClass("bottom")
                    $("#ljb").removeClass("btn")
                    $("#ljb").removeAttr("disabled")
                  }
                //其它可选参数
                // width:宽度  height: 高度 backgroundColor:背景色  host: 服务端地址   dunkeyhost：设备指纹服务地址
              });
              //更新额外数据信息
              slider.setPayload({
                phone: 'test',
                email: 'test',
                idcard: '',
                bankcard: ''
              });
		},
		mobile:function(val){
			var mobile = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
			    if (mobile.test(val)) {
			        return true;
			    } else {
			        return false;
			    }
		},
		from:function(){
		    this.userPhone.parent().removeClass("error-item");
		    this.userPassword.parent().removeClass("error-item");
			if(this.userPhone.val() == '' || this.userPhone.val().length ==0){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>手机号码不能为空</p>");
				this.userPhone.parent().addClass("error-item");
				return false;
			}
			if(!this.mobile(this.userPhone.val())){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>手机格式不正确</p>");
				this.userPhone.parent().addClass("error-item");
				return false;
			}
			if(this.userPassword.val() == '' || this.userPassword.val().length ==0){
				login.vlidMessage.show();
				login.vlidMessage.html("<p>密码不能为空</p>");
				this.userPassword.parent().addClass("error-item");
				return false;
			}
			//登陆ajax
			$.ajax({
				type:"post",
				url:appconfig.apiUrl+"login/login",
				data:{"account":this.userPhone.val(),'password':this.userPassword.val()},
				success:function(res){
					if(res.code==200){
						global.lxMsg('登录成功');
						global.setLocalStorage('token',res.data.rows.token)
						setTimeout(function(){
							location.href= "/";
						},1000)
					}else{
						global.lxMsg(res.msg);
					}
				}
			})
		},
		yput:function(){
			$(".eye_psw").on('click',function(){
				if($(this).attr("data-show")==1){
					$(this).attr("data-show","2");
                    $(this).addClass("open");
                    $(this).parent().find("input").attr("type","text")
					// login.userPassword.attr("type","text")
					return;
				}
				if($(this).attr("data-show")==2){
					$(this).attr("data-show","1");
					$(this).removeClass("open");
                    $(this).parent().find("input").attr("type","password")
					// login.userPassword.attr("type","password")
					return;
				} 
			})

			
			//密码大写输入提示  
		    function capitalTip(id){  
		        //$('#' + id).after('<div class="capslock" id="capital_password"><span>大写锁定已开启</span></div>');  
		        var capital = false; //聚焦初始化，防止刚聚焦时点击Caps按键提示信息显隐错误  
		          
		        // 获取大写提示的标签，并提供大写提示显示隐藏的调用接口  
		        var capitalTip = {  
		            $elem: $('.capslock_psw'),  
		            toggle: function (s) {  
		                if(s === 'none'){  
		                    this.$elem.hide();  
		                }else if(s === 'block'){  
		                    this.$elem.show();  
		                }else if(this.$elem.is(':hidden')){  
		                    this.$elem.show();  
		                }else{  
		                    this.$elem.hide();  
		                   }  
		            }  
		        }  
		        $('#' + id).on('keydown.caps',function(e){  
		            if (e.keyCode === 20 && capital) { // 点击Caps大写提示显隐切换  
		                capitalTip.toggle();  
		            }  
		        }).on('focus.caps',function(){capital = false}).on('keypress.caps',function(e){capsLock(e)}).on('blur.caps',function(e){  
		              
		            //输入框失去焦点，提示隐藏  
		            capitalTip.toggle('none');  
		        });  
		        function capsLock(e){  
		            var keyCode = e.keyCode || e.which;// 按键的keyCode  
		            var isShift = e.shiftKey || keyCode === 16 || false;// shift键是否按住 
		            if(keyCode === 9){  
		                capitalTip.toggle('none'); 
		            }else{  
		              //指定位置的字符的 Unicode 编码 , 通过与shift键对于的keycode，就可以判断capslock是否开启了  
		              // 90 Caps Lock 打开，且没有按住shift键  
		              if (((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)) {  
		                  // 122 Caps Lock打开，且按住shift键  
		                  capitalTip.toggle('block'); // 大写开启时弹出提示框  

		                  capital = true;  
		              } else {  
		                  capitalTip.toggle('none');  
		                  capital = true;  
		              }  
		            }  
		        }  
		    };  
		    //调用提示  
		    capitalTip('password');  
		}
	}
	login.init();
})