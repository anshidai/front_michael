<?php

namespace Common\Model;

use Think\Model;


class OrderInfoModel extends Model {
	
	
	public function getAllOrder($user_id, $limit = 5)
	{
		$res = $this->where("user_id='$user_id'")->order('add_time desc')->limit($limit)->select();
		return $res;
	}
	
	
	
}