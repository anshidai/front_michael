<?php 


function set_cookies($userinfo = array(), $remember = null)
{
	if(empty($userinfo)) {
		cookie('user_id', null);
		cookie('user_name', null);
		cookie('password', null);
		
	} elseif($remember) {
		$expire = 3600 * 24 * 15;
		cookie('user_name', $userinfo['user_name'], $expire);
		cookie('user_id', $userinfo['user_id'], $expire);
		cookie('password', $userinfo['password'], $expire);
	}
}

function set_session($userinfo = array())
{
	if(empty($userinfo)) {
		session('[destroy]');
	}else {
		session('user_id', $userinfo['user_id']);
		session('user_name', $userinfo['user_name']);
		session('email', $userinfo['email']);
	}
}


function check_login_status()
{
	$user = D('Users');
	
	$session_user_id = session('user_id');
	//session 不存在，检查cookie
	if(empty($session_user_id)) {
		$cookie_user_id = cookie('user_id');
		$cookie_user_id = intval($cookie_user_id);
		
		if(!empty($cookie_user_id)) {
			$info = $user->getUserInfo($cookie_user_id);
			
			if($info && $info['password'] == cookie('password')) {
				session('user_id',$info['user_id']);
				session('user_name',$info['user_name']);

				update_user_info();
				
			} else {
				//没有找到这个记录. 则清除cookie
				$time = time() - 3600;
				cookie('user_id',  null);
				cookie('password',  null);
			}
		}
		
	}
}

/**
* 更新登录时间，登录次数及登录ip
*/
function update_user_info()
{
	$user_id = session('user_id');
	
	if(!$user_id) return false;
	
	$user = D('Users');
	
	$data['last_ip'] = get_client_ip(0, true);
	$data['last_login'] = time();
	$user->where("user_id='{$user_id}'")->setField($data);
	$user->where("user_id='{$user_id}'")->setInc('visit_count', 1);
	
}

