<?php

namespace Common\Model;

use Think\Model;


class UserAddressModel extends Model {
	
	
	public function getAddress($user_id, $field = '*', $limit = 1)
	{
		$user_id = intval($user_id);
		
		if(!empty($user_id)) {
			$info = $this->field($field)->where("user_id='{$user_id}'")->limit($limit)->select();
			return $limit? $info[0]: $info;
		}
		return false;
	}
	
	
	
}