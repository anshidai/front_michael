;$(function(){
	
	//ajax post submit请求
    $('.ajax-post').click(function(){
		var target,query,form;
		var target_form = $(this).attr('target-form'); 
		var that = this;
        var nead_confirm = false;
		
		//alert(111)
		
		if(($(this).attr('type')=='submit') || (target = $(this).attr('href')) || (target = $(this).attr('url')) ){
            form = $('.'+target_form);
			
			if($(this).attr('hide-data') === 'true'){//无数据时也可以使用的功能
            	form = $('.hide-data');
            	query = form.serialize();
            }else if (form.get(0)==undefined) {
            	return false;
            }else if(form.get(0).nodeName=='FORM' ) {
                if ($(this).hasClass('confirm') ) {
                    if(!confirm('Confirm to perform this operation?')) {
                        return false;
                    }
                }
                if($(this).attr('url') !== undefined) {
                	target = $(this).attr('url');
                }else{
                	target = form.get(0).action;
                }
                query = form.serialize();
            }else if(form.get(0).nodeName=='INPUT' || form.get(0).nodeName=='SELECT' || form.get(0).nodeName=='TEXTAREA') {
                form.each(function(k,v) {
                    if(v.type=='checkbox' && v.checked==true) {
                        nead_confirm = true;
                    }
                })
                if(nead_confirm && $(this).hasClass('confirm')) {
                    if(!confirm('Confirm to perform this operation?')){
                        return false;
                    }
                }
                query = form.serialize();
            }else{
                if($(this).hasClass('confirm')) {
                    if(!confirm('Confirm to perform this operation?')) {
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }
			$(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);
			
			$.post(target, query, function(data) {
				console.log(data)
			},'json');
		}
	});
	return false;	
});