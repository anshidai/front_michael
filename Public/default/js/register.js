$(function(){
	$("#register_btn").click(function(){
		var user_name = $("#user_name").val(),
			email = $("#email").val(),
			password = $("#password").val(),
			repassword = $("#repassword").val();
		var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if(user_name == '') {
			$("#error_register_box").html('Sorry, Username is required.').show();
			return false;
		}
		else if(mail_reg.test(email) == false) {
			$("#error_register_box").html('The Email address you entered is incorrect.').show();
			return false;
		}
		else if(password == '' || repassword == '') {
			$("#error_register_box").html('Sorry, passwords is required.').show();
			return false;
		}
		else if(password.length <6 || password.length>20) {
			$("#error_register_box").html('Password length of 6 to 20 characters.').show();
			return false;
		}
		else if(password != repassword) {
			$("#error_register_box").html('Passwords do not match. Please try again.').show();
			return false;
		}
		var _form = $("#register_form"),
			target = _form.attr('action');

		$.post(target, _form.serialize(), function(data) {
			console.log(data)
			if(data.status == '0') {
				$("#error_register_box").html(data.info).show();
			}
			if(data.url) {
				location.href = data.url;
			}
		},'json');
		return false;
		
	});
});