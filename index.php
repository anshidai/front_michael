<?php

//应用入口文件, 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_DEBUG', true);

//定义应用目录
define('APP_PATH', './Application/');

//缓存目录设置,  此目录必须可写，建议移动到非WEB目录
define('RUNTIME_PATH', './Runtime/');

//风格模板
define('SKIN_NAME',  'default');

//模板主题目录
define('THEMES_PATH', './Themes/'. SKIN_NAME. '/'); 

//引入核心入口
require './ThinkPHP/ThinkPHP.php';