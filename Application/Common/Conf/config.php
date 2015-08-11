<?php

/**
 * 系统配文件
 * 所有系统级别的配置
 */
return array(
    //模块相关配置
	
	//设置默认加载模块
    'DEFAULT_MODULE'     => 'Home', 
	
	// 默认模板文件后缀
	'TMPL_TEMPLATE_SUFFIX'	=> '.tpl', 
	
	//解析标签
    'TMPL_L_DELIM'       => '{',
    'TMPL_R_DELIM'       => '}',
	
	//数据缓存设置
    'DATA_CACHE_PREFIX'    => 'shopcms_', // 缓存前缀
    'DATA_CACHE_TYPE'      => 'File', // 数据缓存类型
	
	//URL配置
    'URL_CASE_INSENSITIVE' => true, //默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_MODEL'            => 3, //URL模式
    'VAR_URL_PARAMS'       => '', // PATHINFO URL参数变量
    'URL_PATHINFO_DEPR'    => '/', //PATHINFO URL分割符
	
	//设置模板目录
	'VIEW_PATH' 		=> THEMES_PATH,  
	
	//模板相关配置, 在模板中直接使用 如: __IMG__ 
    'TMPL_PARSE_STRING' => array(
        '__IMG__'    => __ROOT__ . '/Public/'. SKIN_NAME .'/images',
        '__CSS__'    => __ROOT__ . '/Public/'. SKIN_NAME .'/css',
        '__JS__'     => __ROOT__ . '/Public/'. SKIN_NAME .'/js',
    ),

    //全局过滤配置
    'DEFAULT_FILTER' => '', //全局过滤函数

    //数据库配置
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => '127.0.0.1', // 服务器地址
    'DB_NAME'   => 'shop_michael', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => '',  // 密码
    'DB_PORT'   => '3306', // 端口
    'DB_PREFIX' => 'pre_', // 数据库表前缀

);
