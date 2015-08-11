//loading加载效果
$.fn.loading=function(e){
	e=$.extend({opacity:.5,size:"big"},e);
	$(this).each(function(){
		if($(this).hasClass("masked")) return;
		var obj=$(this);
		var l=$('<div class="loading"></div>').css("opacity", 0);
		obj.addClass("masked").append(l);
		var lb=$('<div class="loading_msg loading_big"></div>').appendTo(obj);
		lb.css({
			top: obj.height() / 2 - (lb.height() + parseInt(lb.css("padding-top")) + parseInt(lb.css("padding-bottom"))) / 2,
			left: obj.width() / 2 - (lb.width() + parseInt(lb.css("padding-left")) + parseInt(lb.css("padding-right"))) / 2
		});
	});
	return this;
}
//取消loading加载效果
$.fn.unloading=function(){
	$(this).each(function(){
		$(this).find(".loading_msg, .loading").remove();
		$(this).removeClass("masked");
	});
}


//滚动插件
$.fn.carousel=function(e){
	e=$.extend({itemsPerMove:2,duration:1e3,vertical:!1,specification:"",width:0,height:0,step:1,preCtrEntity:"pre_arrow",nextCtrEntity:"next_arrow"},e);
	var t=this,
		n=t.find(".viewport"),
		r=n.find(".list"),
		i,s,o,u,a,f=!1,
		l={
			init:function(){
				var oFirst=r.children(":first"),
					oLast=r.children(":last"),
					l,c,list_len=r.children().length;
				
				if(e.vertical){	//判断滚动方式
					l=Math.max(oFirst.outerHeight(!0), oLast.outerHeight(!0));
					i=l*e.itemsPerMove;
					c=oFirst.outerHeight(!0)-oFirst.outerHeight();
					t.addClass("vertical").css({height:e.height||i-c, width:e.width||oFirst.outerWidth(!0)});
					r.height(l*list_len);
					if(l*list_len>(e.height || i-c)){
						s={scrollTop:"-="+i};
						o={scrollTop:i};
						u={scrollTop:"-="+i*e.step};
						a={scrollTop:i*e.step};
						this.bind_event();
					}
				}else{
					l=Math.max(oFirst.outerWidth(!0), oLast.outerWidth(!0));
					i=l*e.itemsPerMove;
					c=oFirst.outerWidth(!0)-oFirst.outerWidth();
					t.addClass("horizontal").css({height:e.height||oFirst.outerHeight(!0), width:e.width||i-c});
					r.width(l*list_len);
					if(l*list_len>(e.width || i-c)){
						s={scrollLeft:"-="+i};
						o={scrollLeft:"+="+i};
						u={scrollLeft:"-="+i*e.step};
						a={scrollLeft:i*e.step};
						this.bind_event();
					}
				}
			},
			step_prev:function(t){
				if(f) return;f=!0;
				for(var o=0;o<e.itemsPerMove;o++)r.prepend(r.children(":last"));
				n[e.vertical?"scrollTop":"scrollLeft"](i).stop().animate(s,{
					duration:e.duration,
					complete:function(){
						t-=1;
						f=!1;
						t>0 && l.step_prev(t);
					}
				});
			},
			step_next:function(t){
				if(f) return;
				f=!0;
				n.stop().animate(o, {
					duration:e.duration,
					complete:function(){
						l.repeatRun(function(){
							r.children(":last").after(r.children(":first"))
						}, e.itemsPerMove);
						e.vertical?n.scrollTop(0):n.scrollLeft(0);
						t-=1;
						f=!1;
						t>0 && l.step_next(t);
					}
				})
			},
			moveSlide:function(t){
				t==="next"?this.step_next(e.step):this.step_prev(e.step)
			},
			repeatRun:function(e,t){
				for(var n=0; n<t; n++) e()
			},
			bind_event:function(){
				t.find(".btn").on("click", function(e){
					l.moveSlide($(this).hasClass("prev")?"prev":"next")
				});
			}
		}
	l.init();
}


//倒计时插件
$.fn.genTimer=function(e){
	function u(e){
		var t=Math.floor(e/n),
			r=Math.floor((e-t*n)/36e5),
			i=Math.floor((e-t*n-r*1e3*60*60)/6e4),
			s=Math.floor((e-t*n-r*1e3*60*60-i*1e3*60)/1e3);
		return {hours:("0"+r).slice(-2), minutes:("0"+i).slice(-2), seconds:("0"+s).slice(-2), dates:t}
	}
	
	var t={
			beginTime:new Date,
			day_label:"day",
			days_label:"days",
			unitWord:{hours:":", minutes:":", seconds:""},
			type:"day",
			callbackOnlyDatas:!1
		},
		n=864e5,
		r=$.extend({}, t, e),
		i=this;
		
	r.targetTime=r.targetTime.replace(/\-/g, "/");
	var s=new Date(r.targetTime)-new Date(r.beginTime),
	o=function(){
		if(s<0){
			r.callback.call(i, r.callbackOnlyDatas ? {hours:"00", minutes:"00", seconds:"00",dates:0}: "00"+r.unitWord.hours+"00"+r.unitWord.minutes+"00");
			clearInterval(i.interval);
		}else{
			var e=u(s);
			if(r.callbackOnlyDatas) r.callback.call(i, e);
			else if(r.type=="day") s>=n*2 ? r.callback.call(i, '<span class="day_count">'+e.dates+'</span><span class="day">'+r.days_label+'</span><span class="day_seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>") : s>=n ? r.callback.call(i, '<span class="day_count">'+e.dates+'</span><span class="day">'+r.day_label+'</span><span class="day_seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>") : r.callback.call(i, '<span class="seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			else if(r.type=="diffNoDay"){
				var t=e.hours;
				s>=n && (t=Number(e.dates*24)+Number(e.hours));
				r.callback.call(i, '<span class="hours">'+t+'</span><span class="miniutes">'+r.unitWord.hours+e.minutes+'</span><span class="senconds">'+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			}else{
				var t=e.hours;
				s>=n && (t=Number(e.dates*24)+Number(e.hours));
				r.callback.call(i, '<span class="seconds">'+t+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			}
		}
		s-=1e3
	};
	i.interval=setInterval(o, 1e3);
	o();
	return this
}


//购物车
$(".header_cart").hover(function(){
	var $this=$(this),
		$lang=$this.attr('lang');
		$note=$this.find(".cart_note");
		
	$this.addClass("header_active");
	$note.show();
	if(!$note.html()){
		$.ajax({
			url:"/static/theme/t010/lang/"+$lang+"/inc/header_cart.php",
			async:false,
			type:'get',
			dataType:'html',
			success:function(result){
				if(result){
					$note.html(result);
				}
			}
		});
	}
}, function(){
	$(this).removeClass("header_active").find(".cart_note").hide();
});


//添加收藏夹
$(".add_favorite").click(function(){
	var ProId=$(this).attr("data");
	$.get('/account/favorite/add'+ProId+'.html', '', function(data){
		if(data.status==1 || data.status==0){
			var excheckout_html='<div id="prompt_box">';
				excheckout_html+='<div class="box_bg"></div><a class="noCtrTrack" id="prompt_close">×</a>';
				excheckout_html+='<div id="prompt_content">';
				if(data.status==1){
					excheckout_html+='<div class="cart_view"><p>This product Bookmarked!</p></div>';
				}else{
					excheckout_html+='<div class="cart_view"><p>This product has been favorites!</p></div>';
				}
				excheckout_html+='<p class="footRegion">';
					excheckout_html+='<a href="javascript:;" class="btn btn-success" id="prompt_button">Return to Shopping</a><a href="/account/favorite/" class="btn btn-success">Go to view</a>';
				excheckout_html+='</p>';
				excheckout_html+='</div>';
			excheckout_html+='</div>';
			
			$('#prompt_box').length && $('#prompt_box').remove();
			$('body').prepend(excheckout_html);
			$('#prompt_box').css({left:$(window).width()/2-220});
			if(!$('#div_mask').length) global_obj.div_mask();
		}else{
			account_obj.set_form_sign_in();
			$('form[name=signin_form]').append('<input type="hidden" name="comeback" value="global_obj.div_mask(1);$(\'#signin_module\').remove();$(\'.add_favorite[data='+ProId+']\').click();" />');
		}
	}, 'json');
});


//产品详细页折扣倒计时
$(".discount_count").find(".discount_time").each(function(){
	var time=new Date();
	$(this).genTimer({
		beginTime: setStr.curDate,
		targetTime: $(this).attr("endTime"),
		callback: function(e){
			this.html(e)
		}
	});
});


//产品列表页筛选
$("#more_prop").click(function(){
	$(this).hide();
	$("#less_prop").show();
	$('[overshow=true]').show();
});
$("#less_prop").click(function(){
	$(this).hide();
	$("#more_prop").show();
	$('[overshow=true]').hide();
});


$(document).ready(function(){
	//设置货币、价格
	$('#top_bar .crossn li').each(function(){
		var dd=$(this).find('dd.user');
        if(dd.length){
			var oWidth=($(this).width()-22);
			dd.css('width', oWidth+'px');
		}
    });
	$('#currency').text(setStr.currSymbol);
	$('.currency_data').text(setStr.currency_symbols);
	var price='';
	$('.price_data').each(function(){
        price=price+'|'+$(this).attr('data');
    });
	if(price!=''){
		var $obj='';
		$.post('/init.html', 'typ=price&data='+price, function(data){
			if(data.status==1){
				for(i=0; i<=$('.price_data').length; i++){
					$obj=$('.price_data').eq(i);
					$obj.text(data.price[i]);
					if($obj.parents('.pro_item').find('.icon_discount').length && !$obj.parents('.pro_item').find('.icon_seckill:visible').length){
						$obj.parents('.pro_item').find('.icon_discount, .icon_discount_foot').show();
					}
				}
			}
		}, 'json');
	}
	
	if(seckillData!=''){
		$.post('/init.html', 'typ=seckill&wProId='+seckillData, function(data){
			if(data.status==1){
				for(k in data.result){
					$('span.price_data[keyid='+k+']').text(data.result[k]);
					$('span.price_data[keyid='+k+']').parents('.pro_item').find('.icon_seckill').show().siblings('.icon_discount, .icon_discount_foot').hide();
				}
			}
		}, 'json');
	}
	
	//订阅
	$('#newsletter').submit(function(){
		if(global_obj.check_form($(this).find('*[notnull]'), $(this).find('*[format]'))){return false;}
		$(this).find('input[type=submit]').attr('disabled', 'disabled');
		
		$.post('/init.html', 'typ=newsletter&'+$(this).serialize(), function(data){
			if(data.status==1){
				global_obj.win_alert('Added to subscribe successful!', function(){
					$('#newsletter input[name=Email]').val('');
				});
			}else{
				global_obj.win_alert('"'+data.Email+'" This mailbox already exists subscription!');
			}
		}, 'json');
		
		$(this).find('input[type=submit]').removeAttr('disabled');
		return false;
	});
	
	/*导航分类下拉(start)*/
	if($('#nav .nav_categories').attr('page')!='index'){
		$('#nav').delegate('.nav_menu', 'mouseover', function(){$(this).find('.nav_categories').fadeIn(400);});
		$('#nav').delegate('.nav_menu', 'mouseleave', function(){$(this).find('.nav_categories').fadeOut(400);});
	}else{
		$('#nav .nav_categories').css('height', '478px');
		var obj=$('#nav .nav_categories>ul>li');
		for(i=12; i<obj.length; i++){obj.eq(i).remove();}
	}
	$('#nav').delegate('.nav_categories>ul>li', 'mouseover', function(){
		$(this).find('h2>a').addClass('FontColor').next('em').addClass('NavArrowHoverColor');
		var json=$.evalJSON($(this).attr('data'));
		if(json.length){
			var index=$(this).addClass('hover').index();
			if(!$(this).find('.nav_subcate').length){
				var html='<div class="nav_subcate">';
				for(i=0; i<json.length; i++){
					html=html+'<dl'+(i>=3?' class="tline"':'')+'><dt><a href="'+json[i].url+'" title="'+json[i].text+'">'+json[i].text+'</a></dt>';
					if(json[i].children){
						var jsonchild=json[i].children;
						html=html+'<dd>';
						for(j=0; j<jsonchild.length; j++){
							html=html+'<a href="'+jsonchild[j].url+'" title="'+jsonchild[j].text+'">'+jsonchild[j].text+'</a>';
						}
						html=html+'</dd>';
					}
					html=html+'</dl>';
					if((i+1)%3==0){html=html+'<div class="blank12"></div>';}
				}
				html=html+"</div>";
				$(this).append(html);
			}
			if(index<=11){
				$(this).find('.nav_subcate').css('top',(-index*40-8)+'px');
			}else{
				$(this).find('.nav_subcate').css('bottom',-40+'px');
			}
		}
	});
	$('#nav').delegate('.nav_categories>ul>li', 'mouseleave', function(){$(this).removeClass('hover').find('h2>a').removeClass('FontColor').next('em').removeClass('NavArrowHoverColor').parent().parent().find('.nav_subcate').remove();});
	$('#nav .nav_item li').addClass('NavBorderColor2').children('a').addClass('NavBorderColor1 NavHoverBgColor');
	/*导航分类下拉(end)*/
	
	$('#header .search form').submit(function(){if(global_obj.check_form($(this).find('*[notnull]'))){return false;}});
	
	$('#top_bar .currency').delegate('a', 'click', function(){
		var v=$(this).attr('data');
		$.post('/init.html', 'typ=currency&currency='+v, function(data){
			if(data.status==1){
				window.top.location.reload();
			}
		}, 'json');
	});
});


