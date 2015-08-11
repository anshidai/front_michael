<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8"/>
<meta name="keywords" content="" />
<meta name="description" content="" />
<title>Fashion Clothing Plos Size</title>
<link href="__CSS__/global.css" rel="stylesheet" type="text/css">
<link href="__CSS__/style.css" rel="stylesheet" type="text/css">
<link href="__CSS__/user.css" rel="stylesheet" type="text/css">
<script src="__JS__/jquery-1.7.2.min.js" type="text/javascript"></script>
<script type="text/javascript">
	var websiteDisplay=function(){
		if($(window).width()>=1250){$('body').addClass('w_1200');}
		$(window).resize(function(){
			if($(window).width()>=1250){
				$('body').addClass('w_1200');
			}else{
				$('body').removeClass('w_1200');
			}
		});
	}
$(window).resize(function(){websiteDisplay();});
websiteDisplay();
</script>

</head>
<body>

<include file="Common:header" />

<div id="main" class="w">
	<div id="lib_user" class="clearfix">
		<div id="lib_user_crumb" class="widget">
			<ul class="crumb_box clearfix">
				<li class="home"><a href="/" title="Home">Home<i></i></a></li>
				<li class="crumb2 root"><a href="/account/" title="My Account">My Account<i></i></a></li>
			</ul>
		</div>
		<include file="Common:user_menu" />
		
		<div id="lib_user_main">
            <script type="text/javascript">$(document).ready(function(){user_obj.user_index_init()});</script>
			<dl id="lib_user_welcome">
				<dt>Welcome <php> echo session('user_name');</php></dt>
				<dd>Welcome to your account dashboard. Select below to update your personal details, communication preferences and view your order history.</dd>
			</dl>
			<ul id="lib_user_prompt">
				<li class="coupons"><b>0</b> Do you have the new coupons and point!</li>
				<li class="news"><b>0</b> <a href="/account/message/">&nbsp;</a></li>
			</ul>
			<div class="blank20"></div>
			<div class="index_ml index_boxes">
				<div class="index_item personal">
					<h4>My personal details</h4>
					<ul>
						<li><b>Email:</b>{$info.user.email}</li>
						<li><b>Last login time:</b>{$info.user.last_login|date="m/d/Y H:i:s",###}</li>
						<li><b>Consumption:</b><a href="/">To go shopping ...</a></li>
					</ul>
				</div>
				<div class="index_item address">
					<h4>My shipping address</h4>
					<notempty name="info.address">
					<ul>
						<li>Consignee: {$info.address.consignee}</li>
						<li>Address Line: {$info.address.address}</li>
						<li>Email address: {$info.address.email}</li>
						<li>Mobile number: {$info.address.mobile}</li>
					</ul>
					<div class="link"><a href="/account/address/add.html">Add</a><a href="/account/address/">More</a></div>
					<else />
					<div class="blank20"></div>
					<p style="line-height:28px;">
						Haven't add the consignee address, please <a href="/account/address/add.html" style="text-decoration:underline;">add the address</a>
					</p>
					
					</notempty>
				</div>
			</div>
			<!-- index_ml index_boxes end-->
		
			<div class="index_mr index_boxes index_item orders">
				<h4>My Orders</h4>
				
				<notempty name="info.order">
				<!-- 订单 -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th width="18%">Time</th>
						<th width="25%">Order No.</th>
						<th width="17%">Price</th>
						<th width="20%">Status</th>
					</tr>
					<foreach name="info.order" item="vo">
					<tr class="odd">
						<td>{$vo.add_time|date="m/d/Y",###}</td>
						<td><a href="">{$vo.order_sn}</a></td>
						<td>${$vo.order_amount}</td>
						<td>Awaiting Payment</td>
					</tr>
					</foreach>
					</table>
				<div class="link"><a href="/account/orders/">More</a></div>
				<else />
				<div class="no_list">You have no orders on file. <a href="/">Let's go shopping now...</a></div>
				</notempty>
				
			</div>
			<div class="blank20"></div>
			<div class="index_ml index_boxes index_item service">
				<h4>The service help</h4>
				<ul></ul>
			</div>
			<div class="index_mr index_boxes index_item favorites">
				<h4>My Favorite</h4>
				
				<notempty name="info.collect_goods">
				<!-- 收藏 -->
				<div class="viewport">
					<ul  class="list">
						<foreach name="info.collect_goods" item="vo">
						<li>
						<span class="photo"><a target="_blank" title="{$vo.goods_name}" href=""><img alt="{$vo.goods_name}" src="{$vo.goods_thumb}"></a></span>
						<a target="_blank" title="{$vo.goods_name}" class="name" href="">{$vo.goods_name}</a>
						</li>
						</foreach>
					</ul>
				</div>
				<div class="link"><a href="/account/favorite/">More</a></div>
				<else />
				<div class="no_list">You have no favorite on file. <a href="/">Let's go shopping now...</a></div>
				</notempty>
			</div>
			<div class="blank20"></div>
			<div class="index_boxes index_item review">
				<h4>My Reviews</h4>
				<ul></ul>
				<div class="link"><a href="/account/review/">More</a></div>
			</div>
			
		</div>
		<!-- lib_user_main end-->
		
    </div>
	<!-- lib_user end-->
</div>
<!-- main end-->

<include file="Common:footer" />

<script src="__JS__/global.js" type="text/javascript"></script>
<script src="__JS__/en.js" type="text/javascript"></script>
<script src="__JS__/user.js" type="text/javascript"></script>

<script type="text/javascript">
var setStr={"curDate":"2015/08/06 23:17:34","lang":"_en","currSymbol":"USD","currency_symbols":"$"}
</script>
<script src="__JS__/main.js" type="text/javascript"></script>

</body>
</html>
