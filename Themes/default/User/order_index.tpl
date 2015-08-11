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
				<li class="crumb1"><a href="/account/" title="My Account">My Account<i></i></a></li>		<li class="crumb2 root"><a href="/account/orders/" title="My Orders">My Orders<i></i></a></li>
			</ul>
		</div>
		<include file="Common:user_menu" />
		
		<div id="lib_user_main">
            <h1 class="lib_user_title">My Orders</h1>
			<table id="lib_user_order" cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<th width="110">Order Date</th>
					<th width="110">Order Number</th>
					<th width="90">Order Total</th>
					<th width="150">Order Status</th>
					<th width="180">Action</th>
				</tr>
				<notempty name="list">
				<foreach name="list" item="vo">
				<tr class="odd">
					<td>{$vo.order_list.add_time|date="m/d/Y", ###}</td>
					<td><a class="order_info" href="/account/orders/view-{$vo.order_id}.html" title="15080700221882">{$vo.order_sn}</a></td>
					<td>USD $1024.06</td>
					<td><strong>Awaiting Payment</strong></td>
					<td>
						<a class="order_info" href="/account/orders/view-{$vo.order_id}.html">View Details</a>&nbsp;&nbsp;
						<a class="order_info" href="/account/print/{$vo.order_list.goods_id}.html" target="_blank">Print Order</a></td>
				</tr>
				</foreach>
				</notempty>
			</table>
			<div class="blank20"></div>
			<div id="turn_page">
				<li><font class='page_noclick'><em class='icon_page_prev'></em>Previous</font></li><li><font class='page_item_current'>1</font></li><li class='page_last'><font class='page_noclick'>Next<em class='icon_page_next'></em></font></li>
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
