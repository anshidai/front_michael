<?php 

namespace User\Controller; 

use Think\Controller;

class AdminController extends Controller {
	
	protected function _initialize() 
	{
		header('Content-Type:text/html; charset="utf-8"');
	}
	
	public function login()
	{	
		if(IS_POST) {
			$user_name = I('post.user_name', '', 'htmlspecialchars');
			$pwd = I('post.password', '');
			
			if(empty($user_name) || empty($pwd)) {
				$this->error('Incorrect account address or password. Please try again.');
			}
			$info = D('Users')->UserLogin($user_name, $pwd);
			
			if($info) {
				set_cookies($info, $_POST['remember']);
				set_session($info);
				$this->success('Login successful.', U('index/index'));
			}
			$this->error('Incorrect account address or password. Please try again.');
		}
		
	}
	
	public function register()
	{
		if(IS_POST) {
			$User = D('Users');
			
			if($User->create()) {
				if(!$User->add()) {
					$this->error('Sorry, Registration failed.');
				}
				$this->success('Registration is successful, welcome you to join.', U('user/index'));
			}
			$this->error($User->getError());
			
		}else {
			$this->display('user/register');
		}
	}
	
	
	public function loginout()
	{
		session('[destroy]');
		cookie('user_id', null);
		cookie('user_name', null);
		cookie('password', null);
	}
	
	public function verify()
	{
		
		
	}
	
	
	

	
}


