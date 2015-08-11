<?php

namespace Common\Model;

use Think\Model\RelationModel;

class CollectGoodsModel extends RelationModel {
	
	protected $_link = array(
		'Goods' => array(
			'mapping_type' => self::BELONGS_TO,
			'class_name' => 'Goods', //对应的Model的类名
			'foreign_key' => 'goods_id', //对应的外键ID
			'relation_foreign_key' => 'goods_id', //对应的外键ID
			'mapping_name' => 'goods_list', //返回结果中的键名
			'mapping_fields' => 'goods_id,cat_id,goods_name,goods_sn,brand_id,goods_number,goods_thumb,original_img,add_time,market_price,shop_price', //要显示字段
		),

    );

	
	public function getCollectGoods($user_id, $limit = 5)
	{
		$user_id = intval($user_id);
		
		$data = array();
		
		if(!empty($user_id)) {
			$res = $this->relation(true)->where("user_id='{$user_id}'")->field($field)->select();
			if($res) {
				foreach($res as $val) {
					if($val['goods_list']) {
						$val['goods_list']['goods_thumb'] = C('IMG_HOST'). '/' .$val['goods_list']['goods_thumb'];
						$val['goods_list']['original_img'] = C('IMG_HOST'). '/' .$val['goods_list']['original_img'];
						$data[$val['goods_id']] = $val['goods_list'];
					}
				}			
			}
		}
		return $data;
	}
	
	
	
}