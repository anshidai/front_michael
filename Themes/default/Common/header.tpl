<div id="top_bar_outer">
	<div id="top_bar" class="w">
    	<ul class="crossn top_function fl">
			<li class="block fl"><div class="fl"><strong>Currency:</strong></div>
				<dl class="fl">
					<dt><strong id="currency">USD</strong></dt>
					<dd class="currency">
						<a href="javascript:;" data="USD"><img src="__CSS__/img/global/country_usd.jpg" />USD</a>
						<a href="javascript:;" data="EUR"><img src="__CSS__/img/global/country_eur.jpg" />EUR</a>
						<a href="javascript:;" data="GBP"><img src="__CSS__/img/global/country_gbp.jpg" />GBP</a>
						<a href="javascript:;" data="CAD"><img src="__CSS__/img/global/country_cad.jpg" />CAD</a>
						<a href="javascript:;" data="AUD"><img src="__CSS__/img/global/country_aud.jpg" />AUD</a>
						<a href="javascript:;" data="CHF"><img src="__CSS__/img/global/country_chf.jpg" />CHF</a>
						<a href="javascript:;" data="HKD"><img src="__CSS__/img/global/country_hkd.jpg" />HKD</a>
						<a href="javascript:;" data="JPY"><img src="__CSS__/img/global/country_jpy.jpg" />JPY</a>
						<a href="javascript:;" data="RUB"><img src="__CSS__/img/global/country_rub.jpg" />RUB</a>
					</dd>
				</dl>
			</li>
		</ul>
		<ul class="crossn top_info fr">
			<li class="block fl">
				<div class="FontColor fl">&nbsp;</div>
					<php> if(session('user_id')) {</php>
					<dl class="fl">
                        <dt><a href="/account/" class="FontColor"><php> echo session('user_name');</php></a></dt>
                        <dd class="user">
                        	<a href="/account/orders/">My Orders</a>
                        	<a href="/account/favorite/">My Favorites</a>
                        	<a href="/account/coupon/">My Coupons</a>
                        	<a href="/account/inbox/">My Inbox</a>
                        	<a href="/index.php?s=/user/admin/loginout.html">Sign Out</a>
                        </dd>
                    </dl>
					
					
					<php> }else {</php>
					<dl>
						<dt>
							<a class="SignInButton FontColor" href="javascript:;">Sign In</a> or 
							<a class="FontColor" href="/index.php?s=/user/admin/register.html">Join Free</a>
						</dt>
					</dl>
                    
					<php> }</php>
                </li>
			<li class="fl"><a href="/help/">Help</a></li>
		</ul>
		<div class="clear"></div>
	</div>
	<!-- top_bar end-->
</div>
<!-- top_bar_outer end-->

<div class="clear"></div>

<div id="header">
	<div class="w">
		<div class="logo fl"><a href="/"><img src="__IMG__/logo.png" alt="lywebsite" /></a></div>
		<div class="search fl">
            <form action="/search/" method="get" class="form">
                <input type="text" class="text fl" placeholder="Search entire store here..." name="Keyword" notnull="" value="" />
                <input type="submit" class="button fr FontBgColor" value="" />
                <div class="clear"></div>
            </form>
		</div>
		
		<div lang="_en" class="header_cart fr">
			<a href="/cart/" class="cart_inner"><span class="cart_count FontColor"></span><span class="cart_text">Cart</span></a>
			<div class="cart_note" style="display: none;">
				<div class="cart_empty hide">Your shopping cart is empty.</div>
				<div class="cart_list">
					<ul>
						<li class="cart_box">
							<div class="cart_pro_img"><a href="/2015-style-empire-v-neck-sweep-brush-train-organza-wedding-dresses-ds181_p1304.html"><img src="images/s_img01.jpg"></a></div>
							<span class="cart_pro_name"><a href="/2015-style-empire-v-neck-sweep-brush-train-organza-wedding-dresses-ds181_p1304.html">2015 Style Empire V-neck Sweep/Brush Train Organza Wedding Dresses #DS181</a></span>
							<span class="cart_pro_property"><span class="attr_125_1">Size - </span></span>
							<span class="cart_pro_piece">2 item(s)</span>
							<span class="cart_pro_price FontColor">USD $240.00</span>
						</li>
					</ul>
					<div class="cart_pro_btn"><a href="/cart/"><span class="cart_view">View Cart ( <span class="cart_num">1</span> item)</span></a></div>
				</div>
			</div>
			<!-- cart_note end-->
		</div>
		<!-- header_cart fr end-->

		<div class="header_fly fr">Worldwide<br />Shipping</div>
		<div class="clear"></div>
	</div>
</div>
<!-- header end-->

<div id="nav" class="w NavBorderColor1">
	<ul class="nav_item">
		<li><a class="NavHoverBgColor" href="/" title="Home">Home</a></li>
		<li><a class="NavHoverBgColor" href="/products/" title="Products">Products</a></li>
		<li><a class="NavHoverBgColor" href="/GroupBuying.html" title="Group purchase">Group purchase</a></li>
		<li><a class="NavHoverBgColor" href="" title="Special Occasion">Special Occasion</a></li>
		<li><a class="NavHoverBgColor" href="" title="Accessories">Accessories</a></li>
		<li><a class="NavHoverBgColor" href="" title="Costumes">Costumes</a></li>
		<li><a class="NavHoverBgColor" href="" title="Promotion">Promotion</a></li>
		<li><a class="NavHoverBgColor" href="/holiday.html" title="Holiday">Holiday</a></li>
		<li><a class="NavHoverBgColor" href="/FlashSale.html" title="Flash Sale">Flash Sale</a></li>
		<li><a class="NavHoverBgColor" href="/blog/" title="Blog">Blog</a></li>
	</ul>
</div>
<!-- w NavBorderColor1 end-->
