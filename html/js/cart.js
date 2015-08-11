/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/

var cart_obj={
	cart_list:function(){
		$('.itemFrom tbody tr:last-child').find('td').addClass('last');
		$('.itemFrom .prQuant img').click(function(){
			var parent=$(this).parent();
			var value=$(this).attr('name')=='add'?1:-1;
			var obj=parent.parent().index();
			var start=parent.attr('start');
			var qty=parent.find("input[name=Qty\\[\\]]").val();
			var s_qty=parent.find("input[name=S_Qty\\[\\]]").val();
			var CId=parent.find("input[name=CId\\[\\]]").val();
			var ProId=parent.find("input[name=ProId\\[\\]]").val();
			
			var qty=Math.abs(parseInt(qty));
			if(isNaN(qty)){
				qty=1;
			}else{
				qty+=value;
				!qty && (qty=1);
				qty<start && (qty=start);
			}
			
			if(s_qty==qty) return;
			global_obj.data_posting(true, lang_obj.cart.processing);
			var query_string='&Qty='+qty+'&CId='+CId+'&ProId='+ProId;
			modify_cart_result(obj, query_string);
		});
		$('a[rel=del]').click(function(){
			if(!confirm(lang_obj.global.del_confirm)){
				return false;
			}
		});
		
		$('.itemFrom .prQuant input[name=Qty\\[\\]]').bind({
			'keyup paste':function(){
					p=/[^\d]/g;
					$(this).val($(this).val().replace(p, ''));
				},
			'blur':function(){
					var qty=parseInt($(this).val());
					var obj=$(this).parent().parent().index();
					var start=$(this).parent().attr('start');
					var s_qty=$(this).parent().find("input[name=S_Qty\\[\\]]").val();
					var CId=$(this).parent().find("input[name=CId\\[\\]]").val();
					var ProId=$(this).parent().find("input[name=ProId\\[\\]]").val();
					
					if(isNaN(qty)){
						qty=1;
					}else{
						!qty && (qty=1);
						qty<start && (qty=start);
					}
					$(this).val(qty);
					
					if(s_qty==qty) return;
					global_obj.data_posting(true, lang_obj.cart.processing);
					var query_string='&Qty='+qty+'&CId='+CId+'&ProId='+ProId;
					modify_cart_result(obj, query_string);
				}
		});
		
		function modify_cart_result(obj, query_string){
			var tr=$('.itemFrom tbody tr');
			var s_qty=tr.eq(obj).find("input[name=S_Qty\\[\\]]").val();
			$.post('/cart/modify.html?&t='+Math.random(), query_string, function(data){
				if(data.status==1){
					tr.eq(obj).find("input[name=Qty\\[\\]]").val(data.qty);
					tr.eq(obj).find("input[name=S_Qty\\[\\]]").val(data.qty);
					tr.eq(obj).find(".prPrice p").text(setStr.currency_symbols + data.price);
					tr.eq(obj).find(".prAmount p").text(setStr.currency_symbols + data.amount);
					var punit=data.total_count>1?'s':'';
					$('.shopping_cart_total span').text(data.total_count+' item'+punit);
					$('.shopping_cart_total strong').text(setStr.currency_symbols + data.total_price);
					$('form[name=shopping_cart] input[name=CartProductPrice]').val(data.total_price);
				}else{
					tr.eq(obj).find("input[name=Qty\\[\\]]").val(s_qty);
				};
				global_obj.data_posting(false);
			}, 'json');
		}
		
		$('a[name=continue_shopping]').click(function(){window.location.href='/';});/*/?a=products*/
		$('a.checkoutBtn').click(function(){
			$('a.checkoutBtn').removeClass('checkoutBtn').addClass('processing');
			setTimeout(function(){window.location.href='/cart/checkout.html'}, 1000);
		});
		
		/*paypal快捷支付部分(Start)*/
		$('button.paypal_checkout_button').click(function(){
			$(this).blur().attr('disabled', 'disabled');
			$.ajax({
				type: "POST",
				url: "/cart/get_excheckout_country.html",
				dataType: "json",
				success: function(data){
					if(data.status==1){
						var c=data.country;
						var country_select='';
						var defaultCId=226;
						for(i=0; i< c.length; i++){
							if(c[i].IsDefault==1) defaultCId=c[i].CId;
							var s=(defaultCId==c[i].CId?'selected':'');
							country_select=country_select+'<option value="'+c[i].CId+'" '+s+'>'+c[i].Country+'</option>';
						}
						
						var CartProductPrice=$('form[name=shopping_cart] input[name=CartProductPrice]').val();
						var excheckout_html='<div id="paypal_checkout_module">';
							excheckout_html=excheckout_html+'<div class="box_bg"></div><a class="noCtrTrack" id="lb-close">×</a>';
							excheckout_html=excheckout_html+'<div id="lb-wrapper"><form name="paypal_checkout_form" target="_blank" method="POST" action="/cart/excheckout/SetExpressCheckout.html">';
								excheckout_html=excheckout_html+'<label>Select you country: </label>';
								excheckout_html=excheckout_html+'<select name="CId"><option value="0">--Please select your country--</option>'+country_select+'</select>';
								excheckout_html=excheckout_html+'<ul id="shipping_method_list"></ul>';
								
								if(data.v>=1){//达到使用优惠券版本
									var c=data.coupon,
									coupon_html='';
									coupon_html=coupon_html+'<div class="blank6"></div><div class="ex_coupon">';
									if(c.coupon!='' && c.cutprice>0){
										var code=c.coupon,
											price=c.cutprice,
											applyHtml='The coupon code "<strong>'+c.coupon+'</strong>" is valid!<br /> Your discount is <span>'+setStr.currency_symbols+c.cutprice+'</span> <a href="javascript:;" id="removeCoupon">Remove</a>';
									}else{
										var code='',
											price=0,
											applyHtml='<strong>Coupon Code: </strong><input type="text" name="couponCode" id="couponCode" size="15" /><input type="button" class="btn apply" value="Apply" />';
									}
									coupon_html=coupon_html+'<span class="applyCoupon">'+applyHtml+'</span></div><input type="hidden" name="order_coupon_code" value="'+code+'" cutprice="'+price+'" />';
									
									excheckout_html=excheckout_html+coupon_html;
								}

								excheckout_html=excheckout_html+'<p class="footRegion">';
									excheckout_html=excheckout_html+'<input class="btn btn-success" id="excheckout_button" type="submit" value="Continue Checkout" />';
									excheckout_html=excheckout_html+'<span class="total"><strong>Total Amout:</strong><span></span></span>';
								excheckout_html=excheckout_html+'</p>';
							excheckout_html=excheckout_html+'<input type="hidden" name="ProductPrice" value="' + CartProductPrice + '" /><input type="hidden" name="ShippingMethodType" value="" /><input type="hidden" name="ShippingPrice" value="0" /><input type="hidden" name="ShippingInsurancePrice" value="0" /><input type="hidden" name="ShippingExpress" value="" /><input type="hidden" name="ShippingInsurance" value="0" /></form></div>';
						excheckout_html=excheckout_html+'</div>';
						
						$('#paypal_checkout_module').length && $('#paypal_checkout_module').remove();
						$('body').prepend(excheckout_html);
						$('#paypal_checkout_module .total span').text(setStr.currency_symbols + CartProductPrice);
						$('#paypal_checkout_module').css({left:$(window).width()/2-220});
						global_obj.div_mask();
						
						get_shipping_methods(defaultCId);
					}
				}
			});
		});
		
		//选择国家操作
		$('body').delegate('form[name=paypal_checkout_form] select[name=CId]', 'change', function(){
			get_shipping_methods($(this).val());
		});
		
		function get_shipping_methods(CId){
			$.post('/cart/get_shipping_methods.html', "CId="+CId, function(data){
				if(data.status==1){
					var v=data.info;					
					var str=shipType=shipMethod='';
					var shipPrice=insurance=ShippingInsurance=0;
					for(i=0;i<v.length;i++){
						var sed=i==0?'checked':'';
						str = str + '<li><label for="__SId__'+i+'">';
							str = str + '<span><input type="radio" id="__SId__'+i+'" name="SId" value="' + v[i].SId + '" method="' + v[i].Name  + '" price="'+ v[i].ShippingPrice + '" insurance="'+ v[i].InsurancePrice + '" ShippingType="' + v[i].type + '" ' + sed + ' /></span>';
							str = str + '<strong>' + v[i].Name  + '</strong>';
							str = str + '<span>' + v[i].Brief + '</span>';
							str = str + '<span class="price">' + (v[i].ShippingPrice>0 ? setStr.currency_symbols + v[i].ShippingPrice : 'Free Shipping') + '</span>';
						str = str + '</label></li>';
					}
					if(str!=''){
						var str_ext = '<li class="insurance"><label for="__ShippingInsurance">';
							str_ext = str_ext + '<span><input type="checkbox" id="__ShippingInsurance" name="ShippingInsurance" value="1" checked="checked"></span>';
							str_ext = str_ext + '<strong>Add Shipping Insurance to your order</strong>';
							str_ext = str_ext + '<span class="price">' + setStr.currency_symbols + v[0].InsurancePrice + '</span>';
						str_ext = str_ext + '</label></li>';
						
						str=str_ext+str;
						shipType=v[0].type;
						shipMethod=v[0].Name;
						ShippingInsurance=1;
						shipPrice=parseFloat(v[0].ShippingPrice);
						insurance=parseFloat(v[0].InsurancePrice);
					}else{
						str = str + '<li><strong>No optional!</strong></li>';
					}
					$('form[name=paypal_checkout_form] input[name=ShippingExpress]').val(shipMethod);
					$('form[name=paypal_checkout_form] input[name=ShippingMethodType]').val(shipType);
					$('form[name=paypal_checkout_form] input[name=ShippingInsurance]').val(ShippingInsurance);
					$('form[name=paypal_checkout_form] input[name=ShippingInsurancePrice]').val(insurance.toFixed(2));
					$('form[name=paypal_checkout_form] input[name=ShippingPrice]').val(shipPrice.toFixed(2));
					$('#shipping_method_list').html(str);
				}
			}, 'json');
		}

		//选择快递操作
		$('body').delegate('form[name=paypal_checkout_form] input[name=SId]', 'click', function(){
			var price=parseFloat($(this).attr('price'));
			var insurance=parseFloat($(this).attr('insurance'));
			
			$('form[name=paypal_checkout_form] input[name=ShippingMethodType]').val($(this).attr('ShippingType'));
			$('#shipping_method_list li.insurance span.price').text(setStr.currency_symbols + insurance.toFixed(2));
			
			$('form[name=paypal_checkout_form] input[name=ShippingExpress]').val($(this).attr('method'));
			$('form[name=paypal_checkout_form] input[name=ShippingPrice]').val(price.toFixed(2));
			
			insurance=$('#__ShippingInsurance').attr('checked')=='checked' ? insurance : 0;
			$('form[name=paypal_checkout_form] input[name=ShippingInsurancePrice]').val(insurance.toFixed(2));
			//$('form[name=paypal_checkout_form] input[name=ShippingPrice]').val(price.toFixed(2));
		});
		
		$('body').delegate('#__ShippingInsurance', 'click', function(){
			var obj=$('form[name=paypal_checkout_form] input[name=SId]:checked')
			var insurance=0;
			if($('#__ShippingInsurance').attr('checked')=='checked'){
				var insurance = parseFloat(obj.attr('insurance'));
			}
			
			$('form[name=paypal_checkout_form] input[name=ShippingInsurancePrice]').val(insurance.toFixed(2));
		});
		
		//使用优惠券
		$('body').delegate('#paypal_checkout_module .ex_coupon input.apply', 'click', function(){
			var coupon=$('#paypal_checkout_module .ex_coupon input[name=couponCode]').val();
			if(coupon!=''){
				$(this).removeClass('apply');

				$.post("/cart/ajax_get_coupon_info.html", '&coupon='+coupon, function(data){
					if(data.status==1){
						$('input[name=order_coupon_code]').val(data.coupon).attr('cutprice', data.cutprice);
	
						$('#paypal_checkout_module .ex_coupon .applyCoupon').html('The coupon code "<strong>'+coupon+'</strong>" is valid!<br /> Your discount is <span>'+setStr.currency_symbols+data.cutprice+'</span> <a href="javascript:;" id="removeCoupon">Remove</a>');
					}else{
						alert('The coupon code "'+coupon+'" is invalid. It either does not exist, has not been activated yet, or has expired..');
						$('#paypal_checkout_module .ex_coupon input[name=couponCode]').val('');
						$('#paypal_checkout_module .ex_coupon .applyCoupon input.btn').addClass('apply');
					}
				}, 'json');
			}
		});
		
		//删除优惠券
		$('body').delegate('#paypal_checkout_module #removeCoupon', 'click', function(){
			$('input[name=order_coupon_code]').val('').attr('cutprice', '0.00');
			
			var coupon_input='<strong>Coupon Code: </strong><input type="text" name="couponCode" id="couponCode" size="15" /><input type="button" class="btn apply" value="Apply" />'
			$('#paypal_checkout_module .ex_coupon .applyCoupon').html(coupon_input);
			
			$.post('/cart/remove_coupon.html');
		});		
		
		
		
		//关闭快捷支付
		$('body').delegate('#lb-close, #div_mask', 'click', function(){
			if($('#paypal_checkout_module').length){
				$('#paypal_checkout_module').remove();
				global_obj.div_mask(1);
				$('button.paypal_checkout_button').removeAttr('disabled');
			}
		});
		
		//提交快捷支付
		$('body').delegate('form[name=paypal_checkout_form]', 'submit', function(){
			var obj=$('form[name=paypal_checkout_form]');
			obj.find('input[type=submit]').attr('disabled', 'disabled').blur();
			if(!obj.find('input[name=SId]:checked').val() && obj.find('input[name=ShippingMethodType]').val()==''){
				alert('Please select a shipping method!');
				$('#excheckout_button').removeAttr('disabled');
				return false;
			}
			
			$('#paypal_checkout_module').hide();
			$('button.paypal_checkout_button').removeAttr('disabled');
			global_obj.div_mask(1);
		});
		/*paypal快捷支付部分(end)*/
	},
	
	checkout_init:function(){
		$('.itemFrom tbody tr:last-child').find('td').addClass('last');
		$('.edit_shopping_cart a').click(function(){window.location.href='/cart/';});
		$('#paymentObj').delegate('select[name=_payment_method]', 'change', function(){
			var index=$('select[name=_payment_method] option:selected').index();
			$('#paymentObj .payment>ul>li').hide().eq(index).show();
			$('#PlaceOrderFrom input[name=order_payment_method_pid]').val($(this).val());
			var fee=parseFloat($('#paymentObj .payment>ul>li').eq(index).attr('fee'));
			if(isNaN(fee)) fee=0;
			
			var amount=parseFloat($('#PlaceOrderFrom').attr('amountPrice'));	//产品总价
			var userPrice=parseFloat($('#PlaceOrderFrom').attr('userPrice'));	//会员优惠
			var discountPrice=parseFloat($('input[name=order_discount_price]').val());	//满额减价
			var cutprice=parseFloat($('input[name=order_coupon_code]').attr('cutprice'));	//折扣
			var price=parseFloat($('input[name=order_shipping_price]').val());	//运费
			var insurance=parseFloat($('input[name=order_shipping_insurance]').attr('price'));	//运费保险
			
			var totalAmount=amount-userPrice+price+insurance-cutprice-discountPrice;	//最终价格
			var feePrice=totalAmount*(fee/100);	//付款手续费
			
			$('#ot_fee').text(feePrice.toFixed(2)).attr('fee', fee);
			$('#ot_total').text((totalAmount*(1+fee/100)).toFixed(2));
			
			if(fee>0){
				$('#serviceCharge').show();
			}else{
				$('#serviceCharge').hide();
			}
		});
		
		/**** set shipping address start ****/
		$('#useAddress').text('Use This Shipping Address');
		if(address_count>0){	//set style shipping address
			obj=$('#lib_address li:eq(0) input[name=shipping_address_id]');
			obj.attr('checked', 'checked').parent().addClass('cur');
			$('#addressForm').css('display', 'none');
			obj.val()>0 && $('input[name=order_shipping_address_aid]').val(obj.val());
			obj.attr('CId')>0 && $('input[name=order_shipping_address_cid]').val(obj.attr('CId'));
			get_shipping_method_from_country(obj.attr('CId'));
		}else{
			$('#cancelAddr').css('display', 'none');
			$('#lib_address li:eq(0)').css('display', 'none');
			
			/*var CId=$('input[name=country_id]').val();
			get_shipping_method_from_country(CId);*/
		}
		
		$('#lib_address li').delegate('input[name=shipping_address_id]', 'click', function(){
			var value=$(this).val();
			var cid=$('#address_'+value).attr('CId');
			$('#lib_address li').removeClass('cur');
			$(this).parent().addClass('cur');
			$('input[name=order_shipping_address_aid]').val(value);
			$('input[name=order_shipping_method_sid]').val('').next('input[name=order_shipping_method_type]').val('').next('input[name=order_shipping_price').val('0.00');
			$.post('/account/', "do_action=set_default_address&AId="+value, function(data){//set default shipping method
				if(cid!=$('input[name=order_shipping_address_cid]').val()){
					$('input[name=order_shipping_address_cid]').val(cid);
					get_shipping_method_from_country(cid);
				}
			}, 'json');
		});
		
		$('#addAddress').click(function(){
			user_obj.set_default_address(0);
			$('#lib_address>li').hide();
			$('#addressForm').slideDown(500);
		});
		$('.edit_address_info').click(function(){
			user_obj.set_default_address($(this).prev().prev().val());
			$('#lib_address>li').hide();
			$('#addressForm').slideDown(500);
		});
		$('#cancelAddr').click(function(){
			$('#lib_address>li').show(500);
			$('#addressForm').slideUp(500);
		});
		
		if(address_perfect){
			$('#lib_address li:eq(0) .edit_address_info').click();
			$('#cancelAddr').hide();
		}
		/**** set shipping address end ****/
		

		/**** not login set country end ****/
		if($('.editAddr input[name=typeAddr]').val()==1){
			$('table.tb-shippingAddr tbody tr:eq(0)').find('th').html('<span class="required">*</span><label>Email:</label>').css('padding-top', '16px').siblings('td').html('<input type="text" name="Email" maxlength="200" class="elmbBlur" /><p class="errorInfo"></p>').css('padding-top', '16px');
			user_obj.set_default_address(0);
			var CId=$('#country').find('option:selected').val();
			//alert(CId);
			get_shipping_method_from_country(CId);
		}
		
		$('#country_chzn').delegate('li.group-option', 'click', function(){
			var CId=$('#country').find('option:selected').val();
			get_shipping_method_from_country(CId);
		});

		$('#addressInfo').delegate('.edit_nologin_address_info', 'click', function(){
			$('input[name=order_shipping_address_aid]').val(-1);
			$('#addressInfo').slideUp(500);
			$('#addressForm').slideDown(500);
		});
		/**** not login set country end ****/
		
		
		/**** set shipping delivery start ****/
		$('#shippingObj .shipping li a.red').click(function(){
			if($('#arriveSlide').css('display')=='none'){
				$('#arriveSlide').slideDown(500);
			}else{
				$('#arriveSlide').slideUp(500);
			}
		});
		
		$('#shipping_method_list').delegate('li', 'click', function(){//select shipping method
				var obj=$(this).find('input[name=_shipping_method]');
				var __SId=$('#PlaceOrderFrom input[name=order_shipping_method_sid]').val();
				var __CId=$('#PlaceOrderFrom input[name=order_shipping_method_cid]').val();
				var __typ=$('#PlaceOrderFrom input[name=order_shipping_method_type]').val();
				if(obj.val()==__SId && obj.attr('shippingtype')==__typ && obj.attr('cid')==__CId){
					return false;
				}
				if(obj.attr('disabled')) return false;
				$('#shipping_method_list li').find('input').removeAttr('checked');
				obj.attr('checked', 'checked');
				var SId=obj.val();
				var type=obj.attr('ShippingType');
				var price=obj.attr('price');
				var insurance=obj.attr('insurance');
				
				set_shipping_method(SId, price, type, insurance);
			}
		);
		
		$('#shipping_insurance').click(function(){
			var v=$(this).attr('checked')=='checked'?1:0;
			insurance_check(v);
		});
		
		function _getObjValue(obj, cols, j){
			return (obj[cols[j]]==null) || isEmpty(obj[cols[j]])? null : ((j<cols.length-1)? _getObjValue(obj[cols[j]], cols, j+1) : obj[cols[j]]);
		}
		
		function _getValue(obj, colName){
			if(obj==null) return null;
			cols=colName.split(".");
			return _getObjValue(obj, cols, 0);
		}
		
		function get_shipping_method_from_country(CId){	//change shipping method
			if(!CId){
				set_shipping_method(-1, 0, '', 0);
				return false;
			}
			var dataVal="CId="+CId;
			
			if($('form input[name=order_products_info]').val()){
				dataVal+=$('form input[name=shipping_method_where]').val();
			}
			$.post('/cart/get_shipping_methods.html', dataVal, function(data){
				if(data.status==1){
					var v=data.info;					
					var str='';
					for(i=0;i<v.length;i++){
						str = str + '<li name="'+v[i].Name.toUpperCase()+'">';
							str = str + '<span class="name">';
								str = str + '<input type="radio" name="_shipping_method" value="' + v[i].SId + '" price="'+ v[i].ShippingPrice + '" insurance="'+ v[i].InsurancePrice + '" ShippingType="' + v[i].type + '" cid="' + CId + '" />';
								str = str + '<label>' + v[i].Name + '</label>';
							str = str + '</span>';
							str = str + '<span>' + v[i].Brief + '</span>';
							if(v[i].Name.toUpperCase()=='DHL' && v[i].Shipping!=1000){
								if(v[i].ShippingPrice>0){
									str = str + '<span class="price waiting"></span>';
								}else str = str + '<span class="price">Free Shipping</span>';
							}else{
								str = str + '<span class="price">' + (v[i].ShippingPrice>0?setStr.currency_symbols + v[i].ShippingPrice:'Free Shipping') + '</span>';
							}
							str = str + '<div class="clear"></div>';
						str = str + '</li>';
						
						if(v[i].Name.toUpperCase()=='DHL' && v[i].Shipping!=1000){
							$('#shipping_method_list li[name=DHL] input[name=_shipping_method]').attr('disabled', true);
							var AId=$('input[name=order_shipping_address_aid]').val();
							$.post('/index.php?m=cart&a=ajax_get_dhl_info', 'AId='+AId, function(data){
								data=$.evalJSON(data);
								if(data.ret==1){
									$('#shipping_method_list li[name=DHL]>span.price').removeClass('waiting').text(setStr.currency_symbols + data.msg).parent().find('input[name=_shipping_method]').attr({'price':data.msg, 'disabled':false});
									$('#PlaceOrderFrom').append('<input type="hidden" name="order_shipping_DHL" value="'+data.msg+'" />');
								}
							}, 'html');
						}
					}
					$('#shipping_method_list').html(str);
					
					if(str==''){
						set_shipping_method(-1, 0, '', 0);
					}else{
						$('#shipping_method_list li:eq(0)').click();
					}
				}
			}, 'json');
		}
		
		function set_shipping_method(SId, price, type, insurance){	//选择运费
			if(SId==-1){
				global_obj.win_alert('Sorry! No delivery!');
			}
			$('input[name=order_shipping_method_sid]').val(SId);
			$('input[name=order_shipping_method_type]').val(type);
			$('input[name=order_shipping_price]').val(price);
			
			var v=$('#shipping_insurance').attr('checked')=='checked'?1:0;
			$('#shippingObj .shipping li.insurance dd.price em').text(insurance);
			var insurance=v==1?insurance:0;
			$('input[name=order_shipping_insurance]').val(v).attr('price', insurance);
			
			var amount=parseFloat($('#PlaceOrderFrom').attr('amountPrice'));	//产品总价
			var userPrice=parseFloat($('#PlaceOrderFrom').attr('userPrice'));	//会员优惠
			var discountPrice=parseFloat($('input[name=order_discount_price]').val());	//满额减价
			var price=parseFloat(price);	//运费
			var insurance=parseFloat(insurance);	//保险费
			var cutprice=parseFloat($('input[name=order_coupon_code]').attr('cutprice'));	//折扣
			var shippingPrice=price+insurance;	//运费、保险总价
			var feePrice=parseFloat($('#ot_fee').text());	//附加费
			if(isNaN(feePrice)) feePrice=0;
			var totalAmount=amount-userPrice+shippingPrice-cutprice-discountPrice+feePrice;	//最终价格
			
			$('#ot_shipping').text(price.toFixed(2));
			$('#ot_combine_shippnig_insurance').text(shippingPrice.toFixed(2));
			$('#ot_total').text(totalAmount.toFixed(2));
			show_shipping_insurance(v);
		}
		
		function insurance_check(v){//添加运费保险
			var amount=parseFloat($('#PlaceOrderFrom').attr('amountPrice'));	//产品总价
			var userPrice=parseFloat($('#PlaceOrderFrom').attr('userPrice'));	//会员优惠
			var discountPrice=parseFloat($('input[name=order_discount_price]').val());	//满额减价
			var cutprice=parseFloat($('input[name=order_coupon_code]').attr('cutprice'));	//折扣
			var price=parseFloat($('input[name=order_shipping_price]').val());	//运费
			var insurance=v==1?parseFloat($('#shipping_method_list input[checked=checked]').attr('insurance')):0;	//保险费
			if(isNaN(insurance)) insurance=0;
			$('input[name=order_shipping_insurance]').val(v).attr('price', insurance);
			
			var shippingPrice=price+insurance;	//运费、保险总价
			var feePrice=parseFloat($('#ot_fee').text());	//附加费
			var totalAmount=amount-userPrice+shippingPrice-cutprice-discountPrice+feePrice;	//最终价格
			
			$('#ot_shipping').text(price.toFixed(2));
			$('#ot_combine_shippnig_insurance').text(shippingPrice.toFixed(2));
			$('#ot_total').text(totalAmount.toFixed(2));
			show_shipping_insurance(v);
		}
		
		function show_shipping_insurance(v){
			if(v==1){
				$('#shippingInsuranceCombine').show().prev().hide();
			}else{
				$('#shippingInsuranceCombine').hide().prev().show();
			}
		}
		/**** set shipping delivery end ****/		
		
		
		/**** set coupon code start ****/
		var couponCode=$('input[name=order_coupon_code]').val();
		if(couponCode!=''){
			ajax_get_coupon_info(couponCode);
		}
		
		$('#new-cp').delegate('#to-use-coupon', 'click', function(){
			global_obj.div_mask();
			
			var coupon_html='<div id="cart_coupon_set">';
				coupon_html=coupon_html+'<div class="box_bg"></div><a class="noCtrTrack" id="lb-close">×</a>';
				coupon_html=coupon_html+'<div id="lb-wrapper"><form id="couponForm">';
					coupon_html=coupon_html+'<label>Enter your coupon code: </label>';
					coupon_html=coupon_html+'<input type="text" class="text elmbBlur" name="couponCode" id="couponCode">';
					coupon_html=coupon_html+'<p id="couponValResult"><span class="invalid red" style="display: none;">The coupon code "<strong></strong> " is invalid. It either does not exist, has not been activated yet, or has expired..</span><span class="netError red" style="display: none;"></span></p>';
					coupon_html=coupon_html+'<p class="footRegion"><button class="btn btn-success" id="couponApply" type="submit">Apply</button></p>';
				coupon_html=coupon_html+'</form></div>';
			coupon_html=coupon_html+'</div>';
			
			$('body').prepend(coupon_html);
			$('#cart_coupon_set').css({left:$(window).width()/2-125});
			
			$('#cart_coupon_set').delegate('form#couponForm', 'submit', function(){
				$('#couponApply').attr('disabled', 'disabled').blur();
				ajax_get_coupon_info($('#couponCode').val())
				$('#couponApply').removeAttr('disabled');
				return false;
			});
			
			$('#cart_coupon_set').delegate('#lb-close', 'click', function(){
				$('#cart_coupon_set').remove();
				global_obj.div_mask(1);
			});
		});
		
		function ajax_get_coupon_info(code){
			var str='';
			if($('input[name=order_products_info]').length){ str='&jsonData='+$('input[name=order_products_info]').val();}
			$.post("/cart/ajax_get_coupon_info.html", '&coupon='+code+str, function(data){
				if(data.status==1){
					$('#couponValResult>span').hide(200);
					$('#couponSavings').show(200);
					$('input[name=order_coupon_code]').val(data.coupon).attr('cutprice', data.cutprice);

					var amount=parseFloat($('#PlaceOrderFrom').attr('amountPrice'));	//产品总价
					var userPrice=parseFloat($('#PlaceOrderFrom').attr('userPrice'));	//会员优惠
					var discountPrice=parseFloat($('input[name=order_discount_price]').val());	//满额减价
					var cutprice=parseFloat($('input[name=order_coupon_code]').attr('cutprice'));	//折扣
					var price=parseFloat($('input[name=order_shipping_price]').val());	//运费
					var insurance=parseFloat($('input[name=order_shipping_insurance]').attr('price'));	//运费保险
					var feePrice=parseFloat($('#ot_fee').text());	//附加费
					
					var totalAmount=amount-userPrice+price+insurance-cutprice-discountPrice+feePrice;	//最终价格
					
					$('#ot_coupon').text(cutprice.toFixed(2)).show(200);
					$('#ot_total').text(totalAmount.toFixed(2));
					
					$('#new-coupon-valid>span').show().children('strong:eq(0)').text(data.coupon).siblings('span').text(setStr.currSymbol + cutprice.toFixed(2)).siblings('strong:eq(1)').text(data.end);
					$('#removeCoupon').show();
					$('#to-use-coupon').hide();
					
					$('#lb-close').click();
				}else{
					$('#couponValResult .invalid').show(200).children('strong').text(data.coupon);
				}
			}, 'json');
		}
		
		$('.new-coupon').delegate('#removeCoupon', 'click', function(){
			$('input[name=order_coupon_code]').val('').attr('cutprice', '0.00');

			var amount=parseFloat($('#PlaceOrderFrom').attr('amountPrice'));	//产品总价
			var userPrice=parseFloat($('#PlaceOrderFrom').attr('userPrice'));	//会员优惠
			var discountPrice=parseFloat($('input[name=order_discount_price]').val());	//满额减价
			var cutprice=parseFloat($('input[name=order_coupon_code]').attr('cutprice'));	//折扣
			var price=parseFloat($('input[name=order_shipping_price]').val());	//运费
			var insurance=parseFloat($('input[name=order_shipping_insurance]').attr('price'));	//运费保险
			var feePrice=parseFloat($('#ot_fee').text());	//附加费
			
			var totalAmount=amount-userPrice+price+insurance-cutprice-discountPrice+feePrice;	//最终价格
			
			$('#ot_coupon').text(cutprice.toFixed(2)).hide();
			$('#ot_total').text(totalAmount.toFixed(2));
			
			$('#to-use-coupon').show(200);
			$('#new-coupon-valid>span').hide().children('strong:eq(0)').text('').siblings('span').text('').siblings('strong:eq(1)').text('');
			$('#removeCoupon').hide();

			$('#couponSavings').hide();
			
			$.post('/cart/remove_coupon.html');
		});
		/**** set coupon code end ****/		


		/**** submit for place an order start ****/
		$('#orderFormSubmit').click(function(){
			var $obj=$(this);
			$obj.attr('id', 'orderFormProcessing');
			$obj.attr('disabled', 'disabled');
			
			var addrId=$('input[name=order_shipping_address_aid]');
			var countryId=$('input[name=order_shipping_address_cid]');
			var ShipId=$('input[name=order_shipping_method_sid]');
			var PayId=$('input[name=order_payment_method_pid]');
			if(addrId.val()==-1 || countryId.val()==-1){//检查收货地址	 && $('.editAddr input[name=typeAddr]').val()!=1
				$('body,html').animate({scrollTop:$('#addressObj').offset().top}, 500);
				global_obj.win_alert(lang_obj.cart.address_error);
				$obj.attr('id', 'orderFormSubmit');
				$obj.removeAttr('disabled');
				return false;
			}
			if(ShipId.val()==-1){//检查运费方式
				$('body,html').animate({scrollTop:$('#shippingObj').offset().top}, 500);
				global_obj.win_alert(lang_obj.cart.shipping_error);
				$obj.attr('id', 'orderFormSubmit');
				$obj.removeAttr('disabled');
				return false;
			}
			if(PayId.val()==-1){//检查运费方式
				$('body,html').animate({scrollTop:$('#paymentObj').offset().top}, 500);
				global_obj.win_alert(lang_obj.cart.payment_error);
				$obj.attr('id', 'orderFormSubmit');
				$obj.removeAttr('disabled');
				return false;
			}
			
			var Attr='';
			if($('.editAddr input[name=typeAddr]').val()==1){
				Attr=$('#PlaceOrderFrom').attr('nologin');
			}
			setTimeout(function(){
				$.post('/cart/placeorder.html', $('#PlaceOrderFrom').serialize()+Attr, function(data){
					if(data.status==1){
						window.location.href='/cart/complete/'+data.OId+'.html';
					}else if(data.status==-1){
						$('body,html').animate({scrollTop:$('#addressObj').offset().top}, 500);
						global_obj.win_alert(lang_obj.cart.address_error);
					}else if(data.status==-2){
						$('body,html').animate({scrollTop:$('#shippingObj').offset().top}, 500);
						global_obj.win_alert(lang_obj.cart.shipping_error);
					}else if(data.status==-3){
						$('body,html').animate({scrollTop:$('#paymentObj').offset().top}, 500);
						global_obj.win_alert(lang_obj.cart.payment_error);
					}else if(data.status==-4){
						global_obj.win_alert(lang_obj.cart.product_error, function(){ window.location.reload(); });
					}
					
					$obj.attr('id', 'orderFormSubmit');
					$obj.removeAttr('disabled');
				}, 'json');
			}, 1000);
			return false;
		});
		/**** submit for place an order start ****/
	},
	
	checkout_no_login:function(){
		$.post('/cart/set_no_login_address.html', $('.editAddr form').serialize(), function(data){
			if(data.status==1){
				$('#PlaceOrderFrom').attr('nologin', data.info);
				var html="<input type='radio' name='address' checked='checked' /> <strong>";
					html+=data.v.FirstName+' '+data.v.LastName+'</strong> (';
					html+=data.v.AddressLine1+' '+(data.v.AddressLine2 ? data.v.AddressLine2+' ' : '');
					html+=data.v.City+' '+(data.v.StateName ? data.v.StateName : data.v.State)+' '+data.v.ZipCode+' '+data.v.Country+')';
					html+="<a href='javascript:;' class='edit_nologin_address_info'>Edit</a>";
				
				$('#addressInfo').html(html).addClass('cur').slideDown(500);
				$('#addressForm').slideUp(500);
				$('input[name=order_shipping_address_aid]').val(0).next('input[name=order_shipping_address_cid]').val(data.v.CId);
				//cart_obj.checkout_init(parseInt(data.v.CId)).get_shipping_method_from_country();
			}
			//alert(data);
		}, 'json');
	},
	
	complete_init:function(){
		$('#lib_cart .complete').delegate('a.payButton', 'click', function(){
			$('.payment_info').slideUp(300).siblings('.pay_form').slideDown(500);
		});
		
		$('.pay_form').delegate('#Cancel', 'click', function(){
			$('.payment_info').slideDown(300).siblings('.pay_form').slideUp(500);
		});
		
		$('#PaymentForm').delegate('input[name=SentMoney]', 'keypress keyup', function(){// keydown
			$(this).val(($(this).val()).replace(/[^\d.]/g, ''));
		});
		$('#PaymentForm').delegate('input[name=MTCNNumber]', 'keypress keyup', function(){// keydown
			$(this).val(($(this).val()).replace(/[^\d]/g, ''));
		});
		$('#PaymentForm').delegate('input,select', 'click', function(){
			$(this).removeAttr('style');
		});
		
		$('#PaymentForm').submit(function(){
			if(global_obj.check_form($(this).find('*[notnull]'), $(this).find('*[format]'))){return false;}
			$('#paySubmit').attr('disabled', 'disabled');
			
			$.post('/cart/offline_payment.html', $(this).serialize(), function(data){
				if(data.status==1){
					window.top.location.reload();
				}
			}, 'json');
			
			return false;
		});
	}
};