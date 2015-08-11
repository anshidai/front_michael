<?php 

namespace User\Controller;

use Think\Controller;

class IndexController extends AdminController {
	
	
	
	public function index()
	{
		
		$user_id = session('user_id');
		
		$userModel = D('Users');
		$userAddreddModel = D('UserAddress');
		$orderModel = D('OrderInfo');
		$collectGoodsModel = D('CollectGoods');
		
		$info['user'] = $userModel->getUserInfo($user_id, 'email,reg_time,last_login');
		$info['address'] = $userAddreddModel->getAddress($user_id);
		$info['order'] = $orderModel->getAllOrder($user_id, 5);
		$info['collect_goods'] = $collectGoodsModel->getCollectGoods($user_id, 4);
		
		$this->assign('info', $info);
		$this->display('user/index');
	}
	
	
}