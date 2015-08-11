<?php

namespace Common\Model;

use Think\Model\RelationModel;


class OrderInfoModel extends RelationModel {
	
	protected $_link = array(
		'order' => array(
			'mapping_type' => self::BELONGS_TO,
			'class_name' => 'OrderGoods', //对应的Model的类名
			'foreign_key' => 'order_id', //对应的外键ID
			'relation_foreign_key' => 'order_id', //对应的外键ID
			'mapping_name' => 'order_list', //返回结果中的键名
			'mapping_fields' => 'goods_id,goods_name,goods_sn,market_price,goods_price,goods_number,goods_attr', //要显示字段
		),

    );
	
	public function getAllOrder($user_id, $limit = 5)
	{
		$res = $this->relation(true)->where("user_id='$user_id'")->order('add_time desc')->limit($limit)->select();
		return $res;
	}
	
	
}