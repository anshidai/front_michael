var account_obj={
	sign_in_init:function(){
		//点击登录链接，显示登录框
		$('body').on('click', '.SignInButton', function(){account_obj.set_form_sign_in();});

		//关闭登录
		$('body').on('click', '#signin_close, #div_mask', function(){
			if($('#signin_module').length){
				$('#signin_module').remove();
				global_obj.div_mask(1);
			}
		});
		
		//会员登录
		$('body').delegate('#signin_module form[name=signin_form]', 'submit', function(){
			if(global_obj.check_form($(this).find('*[notnull]'))){return false;};

			$(this).find('button:submit').attr('disabled', true);
			
			$.post(frm_register.attr('action'), $(this).serialize(), function(data){
				$('#signin_module form[name=signin_form] button:submit').removeAttr('disabled');
				
				if(data.status == '0'){
					$('#error_register_box').html(data.info).show();
				}else{
					if(data.url) {
						location.href = data.url;
					}
				}
			}, 'json');
			
			return false;
		});
	},
	
	set_form_sign_in:function(){//生成登录框
		var signin_html='<div id="signin_module">';
			signin_html=signin_html+'<div class="box_bg"></div><a class="noCtrTrack" id="signin_close">×</a>';
			signin_html=signin_html+'<div id="lb-wrapper"><form name="signin_form" id="signin_form" class="login" method="POST" action="/index.php?s=/user/admin/login.html">';
				signin_html=signin_html+'<h3>'+lang_obj.signIn.title+'</h3>';
				signin_html=signin_html+'<div id="error_login_box" class="error_note_box">'+lang_obj.signIn.error_note+'</div>';
				signin_html=signin_html+'<div class="row"><label for="user_name">'+lang_obj.signIn.username+'</label><input name="user_name" class="lib_txt" type="text" maxlength="100" format="user_name" /></div>';
				signin_html=signin_html+'<div class="row"><label for="password">'+lang_obj.signIn.password+'</label><input name="password" class="lib_txt" type="password" /></div>';
				signin_html=signin_html+'<div class="row">'+lang_obj.signIn.forgot+'</div>';
				signin_html=signin_html+'<div class="row protect"><input class="ckb" type="checkbox" name="IsStay" value="1" checked="checked" /> '+lang_obj.signIn.stay_note+'</div>';
				signin_html=signin_html+'<div class="row"><button class="signbtn signin FontBgColor" type="submit">'+lang_obj.signIn.sign_in+'</button><a href="/account/sign-up.html" class="signbtn signup">'+lang_obj.signIn.join_fee+'</a></div>';					
			signin_html=signin_html+'<input type="hidden" name="do_action" value="login"></form></div>';
		signin_html=signin_html+'</div>';
		
		$('#signin_module').length && $('#signin_module').remove();
		$('body').prepend(signin_html);
		$('#signin_module').css({left:$(window).width()/2-220});
		global_obj.div_mask();
	},
	
	sign_up_init:function(){
		var frm_register = $('#signup form.register');
		frm_register.submit(function(){return false;});
		frm_register.find('button:submit').click(function(){
			if(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test($('#Email').val())==false){
				$('#Email').next().show();
			}else{
				$('#Email').next().hide();
			}
			
			if($('#Password').val()!=$('#Password2').val()){
				$('#Password2').next().show();
				status+=1;
			}else{
				$('#Password2').next().hide();
				status+=0;
			}
			if(status) return false;
			$(this).attr('disabled', true);
			
			$.post(frm_register.attr('action'), frm_register.serialize(), function(data){
				frm_register.find('button:submit').attr('disabled', false);
				if(data.status == '0'){
					$('#error_register_box').html(data.info).show();
				}else{
					if(data.url) {
						location.href = data.url;
					}
				}
			}, 'json');
		});
		
		$('.amount').keydown(function(e){
			var value=$(this).val();
			var key=window.event?e.keyCode:e.which;
			if((key>95 && key<106) || (key>47 && key<60) || (key==109 && value.indexOf("-")<0) || (key==110 && value.indexOf(".")<0) || (key==190 && value.indexOf(".")<0)){
			}else if(key!=8){
				if(window.event){//IE
					e.returnValue=false;
				}else{//Firefox
					e.preventDefault();
				}
				return false;
			}
		})
	}, 
	
	user_login_binding:function(){
		var frm_binding=$('#lib_user_binding form.login');
		frm_binding.submit(function(){return false;});
		frm_binding.find('button:submit').click(function(){
			if(global_obj.check_form(frm_binding.find('*[notnull]'))){return false;};
			$(this).attr('disabled', true);
			
			$.post('/account/', frm_binding.serialize()+'&do_action=user_oauth_binding', function(data){
				frm_binding.find('button:submit').attr('disabled', false);
				if(data.ret!=1){
					$('#error_login_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg;
				}
			}, 'json');
		});
	},
	
	forgot_init:function (){
		var frm_register=$('#signup form.register');
		frm_register.submit(function(){return false;});
		frm_register.find('.fotgotbtn').click(function(){//发送忘记密码邮件
			if(global_obj.check_form_oth(frm_register.find('*[notnull]'), frm_register.find('*[format]'))){
				status=1;
			}else status=0;
			
			if(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test($('#Email').val())==false){
				$('#Email').next().show();
				status=1;
			}else{
				$('#Email').next().hide();
				status=0;
			}
			
			if(status==1) return false;
			$(this).attr('disabled', true);
			
			$.post('/account/', frm_register.serialize(), function(data){
				frm_register.find('.fotgotbtn').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg[0];
				}
			}, 'json');
		});
		
		frm_register.find('.resetbtn').click(function(){//发送忘记密码邮件
			if(global_obj.check_form_oth(frm_register.find('*[notnull]'), frm_register.find('*[format]'))){
				status=1;
			}else status=0;
			
			if($('#Password').val()!=$('#Password2').val()){
				$('#Password2').next().show();
				status=1;
			}else{
				$('#Password2').next().hide();
				status=0;
			}
			
			if(status==1) return false;
			$(this).attr('disabled', true);
			
			$.post('/account/', frm_register.serialize(), function(data){
				frm_register.find('.resetbtn').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg[0];
				}
			}, 'json');
		});
	}
};
