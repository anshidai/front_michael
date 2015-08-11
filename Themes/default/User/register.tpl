<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8"/>
<meta name="keywords" content="" />
<meta name="description" content="" />
<title>注册</title>
<link href="__CSS__/global.css" rel="stylesheet" type="text/css">
<link href="__CSS__/style.css" rel="stylesheet" type="text/css">
<link href="__CSS__/user.css" rel="stylesheet" type="text/css">
<link href="__CSS__/sign_in.css" rel="stylesheet" type="text/css">
<script src="__JS__/jquery-1.7.2.min.js" type="text/javascript"></script>
<script type="text/javascript">
	var websiteDisplay=function(){
		if($(window).width()>=1250){$('body').addClass('w_1200');}
		$(window).resize(function(){
			if($(window).width()>=1250){
				$('body').addClass('w_1200');
			}else{
				$('body').removeClass('w_1200');
			}
		});
	}
$(window).resize(function(){websiteDisplay();});
websiteDisplay();
</script>
</head>
<body>
<include file="Common:header" />

<div id="customer">
    <div id="signup">
        <form class="register fl" id="register_form" action="{:U('user/admin/register')}">
            <h3 class="title">Register a New Account</h3>
            <div class="clear"></div>
            <div id="error_register_box" class="error_note_box"></div>
            <div class="clear"></div>
			<div class="row fl">
                <label for="user_name">Username <span class="fc_red">*</span></label>
                <input name="user_name" id="user_name" class="lib_txt" type="text" size="30" maxlength="20" />
            </div>
            <div class="clear"></div>
            <div class="row">
                <label for="email">Email <span class="fc_red">*</span></label>
                <input name="email" id="email" class="lib_txt" type="text" size="30" maxlength="100" />
                <p class="on_error">The Email address you entered is incorrect.</p>
            </div>
            <div class="row">
                <label for="password">Create your password <span class="fc_red">*</span></label>
                <input name="password" id="password" class="lib_txt" type="password" size="30" />
            </div>
            <div class="row">
                <label for="repassword">Confirm password <span class="fc_red">*</span></label>
                <input name="repassword" id="repassword" class="lib_txt" type="password" size="30" />
                <p class="on_error">Passwords do not match. Please try again.</p>
            </div>
            <div class="clear"></div>
			<!--<dl class="intro">
				<dt>By clicking "Submit" I agree that:</dt>
				<dd></dd>
				<dd>I may receive communications from lywebsite and can change my notification preferences in My lywebsite.</dd>
				<dd>I am at least 18 years old.</dd>
			</dl>-->
            <div class="row">
				<input id="register_btn" class="signbtn signup default_button_bg NavBgColor" type="button" value="Create my Account">
			</div>
        </form>
        <div class="info fr">
			<div class="box member">
				<p>Already have an account?</p>
				<div class="sign_btn"><a href="javascript:;" class="SignInButton signinbtn">Sign In Now</a></div>
				<p class="forgot"><a href="" class="FontColor">Forgot your password?</a></p>
            </div>
		</div>
		<div class="blank20"></div>
    </div>
	<!-- signup end -->
</div>
<!-- customer end -->

<include file="Common:footer" />

<script src="__JS__/global.js" type="text/javascript"></script>
<script src="__JS__/en.js" type="text/javascript"></script>
<script src="__JS__/user.js" type="text/javascript"></script>
<script src="__JS__/register.js" type="text/javascript"></script>
<script src="__JS__/signin.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
	account_obj.sign_init();
	account_obj.sign_login();
});
</script>

<script type="text/javascript">
var setStr={"curDate":"2015/08/06 23:17:34","lang":"_en","currSymbol":"USD","currency_symbols":"$"}
</script>
<script src="__JS__/main.js" type="text/javascript"></script>

</body>
</html>
