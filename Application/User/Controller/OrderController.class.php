<?php 

namespace User\Controller;

use Think\Controller;

class OrderController extends AdminController {
	
	public function index()
	{
		$listRows = C('LIST_ROWS') > 0 ? C('LIST_ROWS') : 10;
		
		$orderModel = D('OrderInfo');

		$where['user_id'] = session('user_id');
		
		
		$total = $orderModel->where($where)->count();
		
		$Page = new \Think\Page($total, $listRows);
		$show = $Page->show(); 
		
		$list = $orderModel->relation(true)->where($where)->order('add_time desc')->limit($Page->firstRow.','.$Page->listRows)->select();
		
		//dump($list);
		
		$this->assign('list', $list); 
		$this->assign('page', $show);
		
		$this->display('user/order_index');

		
	}
	
	
}
	