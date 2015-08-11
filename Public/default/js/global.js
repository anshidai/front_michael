var seckillData='0';

var global_obj={	
	check_form:function(notnull_obj, format_obj){
		var flag=false;
		if(notnull_obj){
			notnull_obj.each(function(){
				if($(this).val()==''){
					$(this).css('border', '1px solid red');
					flag==false && ($(this).focus());
					flag=true;
				}else{
					$(this).removeAttr('style');
				}
			});
			if(flag){return flag;};
		}
		if(format_obj){
			var reg={
				'MobilePhone':/^1[34578]\d{9}$/,
				'Telephone':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'Fax':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'Email':/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
				'Length':/^.*/
			};
			var tips={
				'MobilePhone':lang_obj.format.mobilephone,
				'Telephone':lang_obj.format.telephone,
				'Fax':lang_obj.format.fax,
				'Email':lang_obj.format.email,
				'Length':lang_obj.format.length
			};
			format_obj.each(function(){
				var o=$(this);
				var s=o.attr('format').split('|');
				if(!o.val()){
					flag=true;
					//return true;
				}else if((s[0]=='Length' && o.val().length!=parseInt(s[1])) || (s[0]!='Length' && reg[s[0]].test(o.val())===false)){
					global_obj.win_alert(tips[s[0]]);
					o.css('border', '1px solid red');
					o.focus();
					flag=true;
					//return false;
				}
			});
		}
		return flag;
	},
	
	check_form_oth:function(notnull_obj, format_obj){
		var flag=false;
		if(notnull_obj){
			notnull_obj.each(function(){
				if($(this).val()==''){
					$(this).css('border', '1px solid red');
					flag==false && ($(this).focus());
					flag=true;
				}else{
					$(this).removeAttr('style');
				}
			});
			if(flag){return flag;};
		}
		if(format_obj){
			var reg={
				'MobilePhone':/^1[34578]\d{9}$/,
				'Telephone':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'Fax':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'Email':/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
			};
			var tips={
				'MobilePhone':lang_obj.format.mobilephone,
				'Telephone':lang_obj.format.telephone,
				'Fax':lang_obj.format.fax,
				'Email':lang_obj.format.email
			};
			format_obj.each(function(){
				var o=$(this);
				if(o.val()){
					if(reg[o.attr('format')].test(o.val())===false){
						o.css('border', '1px solid red');
						o.focus();
						flag=true;
					}
				}
			});
		}
		return flag;
	},
	
	win_alert:function(tips, handle){
		global_obj.div_mask();
		$('body').prepend('<div id="global_win_alert"><div>'+tips+'</div><h1>'+lang_obj.global.confirm+'</h1></div>');
		$('#global_win_alert').css({
			position:'fixed',
			left:$(window).width()/2-200,
			top:'30%',
			background:'#fff',
			border:'1px solid #ccc',
			opacity:0.95,
			width:400,
			'z-index':100000,
			'border-radius':'8px'
		}).children('div').css({
			'text-align':'center',
			padding:'30px 10px'
		}).siblings('h1').css({
			height:40,
			cursor:'pointer',
			'line-height':'40px',
			'text-align':'center',
			'border-top':'1px solid #ddd',
			'font-weight':'bold'
		});
		$('#global_win_alert h1').click(function(){
			$('#global_win_alert').remove();
			global_obj.div_mask(1);
		});
		if($.isFunction(handle)){
			$('#global_win_alert h1').click(handle);
		}
	},
	
	div_mask:function(remove){
		if(remove==1){
			$('#div_mask').remove();
		}else{
			$('body').prepend('<div id="div_mask"></div>');
			$('#div_mask').css({width:'100%', height:$(document).height(), overflow:'hidden', position:'fixed', top:0, left:0, background:'#000', opacity:0.6, 'z-index':10000});
		}
	},
	
	 data_posting:function(display, tips){
		if(display){
			$('body').prepend('<div id="data_posting"><img src="/static/images/ico/data_posting.gif" width="16" height="16" align="absmiddle" />&nbsp;&nbsp;'+tips+'</div>');
			$('#data_posting').css({
				width:'188px',
				height:'24px',
				'line-height':'24px',
				padding:'0 8px',
				overflow:'hidden',
				border:'1px solid #bbb',
				background:'#ddd',
				position:'fixed',
				top:'40%',
				left:'48%',
				'z-index':10001
			});
		}else{
			setTimeout('$("#data_posting").remove();', 500);
		}
	},
	
	in_array:function(needle, arr){
		for(var i=0; i<arr.length && arr[i]!=needle; i++); 
		return !(i==arr.length);
	},
	
	is_array:function(data){
		if(Object.prototype.toString.call(data) == '[object Array]'){
			return true;
		}else{
			return false;
		}
	}
}

//Object => string
$.toJSON = typeof JSON == "object" && JSON.stringify ? JSON.stringify: function(e) {
	if (e === null) return "null";
	var t, n, r, i, s = $.type(e);
	if (s === "undefined") return undefined;
	if (s === "number" || s === "boolean") return String(e);
	if (s === "string") return $.quoteString(e);
	if (typeof e.toJSON == "function") return $.toJSON(e.toJSON());
	if (s === "date") {
		var o = e.getUTCMonth() + 1,
		u = e.getUTCDate(),
		a = e.getUTCFullYear(),
		f = e.getUTCHours(),
		l = e.getUTCMinutes(),
		c = e.getUTCSeconds(),
		h = e.getUTCMilliseconds();
		o < 10 && (o = "0" + o);
		u < 10 && (u = "0" + u);
		f < 10 && (f = "0" + f);
		l < 10 && (l = "0" + l);
		c < 10 && (c = "0" + c);
		h < 100 && (h = "0" + h);
		h < 10 && (h = "0" + h);
		return '"' + a + "-" + o + "-" + u + "T" + f + ":" + l + ":" + c + "." + h + 'Z"'
	}
	t = [];
	if ($.isArray(e)) {
		for (n = 0; n < e.length; n++) t.push($.toJSON(e[n]) || "null");
		return "[" + t.join(",") + "]"
	}
	if (typeof e == "object") {
		for (n in e) if (hasOwn.call(e, n)) {
			s = typeof n;
			if (s === "number") r = '"' + n + '"';
			else {
				if (s !== "string") continue;
				r = $.quoteString(n)
			}
			s = typeof e[n];
			if (s !== "function" && s !== "undefined") {
				i = $.toJSON(e[n]);
				t.push(r + ":" + i)
			}
		}
		return "{" + t.join(",") + "}"
	}
};

//string => Object
$.evalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse: function(str) {
	return eval("(" + str + ")")
};

$(function(){
	
	//关闭提示框
	$('body').delegate('#prompt_close, #prompt_button', 'click', function(){
		if($('#prompt_box').length){
			$('#prompt_box').remove();
			global_obj.div_mask(1);
		}
	});
	
});