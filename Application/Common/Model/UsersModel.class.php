<?php

namespace Common\Model;

use Think\Model;


class UsersModel extends Model {
	protected $_validate = array(
		array('user_name', 'require', 'Sorry, Username is required.'), //账号不能为空
		array('user_name','','Account name already exists.', 0, 'unique'), //账号不能有重名
		array('password', 'require', 'Sorry, passwords is required.'), //密码不能为空
		array('password', '6, 20', 'Password length of 6 to 20 characters.', 0, 'length'), //密码长度
		array('repassword', 'password', "Passwords do not match. Please try again", 0, 'confirm'), // 验证确认密码是否和密码一致
		array('email','email','The Email address you entered is incorrect.'), //验证邮箱
		
	);
	
	protected $_auto = array(
        array('password', 'md5', '3', 'function'),
    );
	
	/**
	* 用户登录
	*/
	public function UserLogin($username, $pwd)
	{
		if(!empty($username) && !empty($pwd)) {
			$info = $this->field('user_id,user_name,email,password')->where("user_name='{$username}'")->find();
			if($info && $info['password'] == md5($pwd)) {
				return $info;
			}
		}
		return false;
	}
	
	/**
	* 获取用户信息
	*/
	public function getUserInfo($user_id = 0, $field = '*')
	{
		$user_id = intval($user_id);
		
		if($user_id == 0) {
			$user_id = session('user_id');
		}
		if(!empty($user_id)) {
			$info = $this->field($field)->where("user_id='{$user_id}'")->find();
			return $info;
		}
		return false;
	}
	
	
	
	
}

