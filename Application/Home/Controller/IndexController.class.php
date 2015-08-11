<?php 

namespace Home\Controller; 

use Think\Controller;

class IndexController extends Controller {
	
	protected function _initialize() 
	{
		header('Content-Type:text/html; charset="utf-8"');
	}
	
	public function index()
	{
		echo 11;exit;
		
	}

	
}


