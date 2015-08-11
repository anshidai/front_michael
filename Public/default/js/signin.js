var account_obj = {
	sign_init:function(){
		//点击登录链接，显示登录框
		$('body').on('click', '.SignInButton', function(){
			account_obj.create_sign_form();
		});
		
		//关闭登录
		$('body').on('click', '#signin_close, #div_mask', function(){
			if($('#signin_module').length){
				$('#signin_module').remove();
				global_obj.div_mask(1);
			}
		});
	},
	
	sign_login:function(){
		
		$('body').on('click', '#signin_btn', function(){
			var _form = $("#signin_form"),
			target = _form.attr('action');
			$.post(target, _form.serialize(), function(data){
				//console.log(data)
				if(data.status == '0'){
					$('#error_login_box').html(data.info).show();
				}else{
					if(data.url) {
						location.href = data.url;
					}
				}
				
			});
		});
		
	},
	
	//生成登录框
	create_sign_form:function(){
		var signin_html='<div id="signin_module">';
			signin_html=signin_html+'<div class="box_bg"></div><a class="noCtrTrack" id="signin_close">×</a>';
			signin_html=signin_html+'<div id="lb-wrapper"><form name="signin_form" id="signin_form" class="login" method="POST" action="/index.php?s=/user/admin/login.html">';
				signin_html=signin_html+'<h3>'+lang_obj.signIn.title+'</h3>';
				signin_html=signin_html+'<div id="error_login_box" class="error_note_box">'+lang_obj.signIn.error_note+'</div>';
				signin_html=signin_html+'<div class="row"><label for="user_name">'+lang_obj.signIn.username+'</label><input name="user_name" class="lib_txt" type="text" maxlength="100" format="user_name" /></div>';
				signin_html=signin_html+'<div class="row"><label for="password">'+lang_obj.signIn.password+'</label><input name="password" class="lib_txt" type="password" /></div>';
				signin_html=signin_html+'<div class="row">'+lang_obj.signIn.forgot+'</div>';
				signin_html=signin_html+'<div class="row protect"><input class="ckb" type="checkbox" name="remember" value="1" checked="checked" /> '+lang_obj.signIn.stay_note+'</div>';
				signin_html=signin_html+'<div class="row"><input class="signbtn signin FontBgColor" id="signin_btn" type="button" value="'+lang_obj.signIn.sign_in+'" /><a href="/account/sign-up.html" class="signbtn signup">'+lang_obj.signIn.join_fee+'</a></div>';					
			signin_html=signin_html+'</div></form></div>';
			
		$('#signin_module').length && $('#signin_module').remove();	
		$('body').prepend(signin_html);
		$('#signin_module').css({left:$(window).width()/2-220});
		global_obj.div_mask();
	},
};