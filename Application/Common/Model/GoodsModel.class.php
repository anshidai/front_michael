<?php

namespace Common\Model;

use Think\Model;

class GoodsModel extends Model {
	
	public function getGoods($goods_id, $field = '*')
	{
		if(is_numeric($goods_id)) {
			$goods_ids = $goods_id;
		}else if(is_array($goods_id)) {
			$goods_ids = implode(',', $goods_id);
		}
		$res = $this->$this->field($field)->where("goods_id in({$goods_ids})")->order('add_time desc')->select();
		return $res;
	}
	
	
}

