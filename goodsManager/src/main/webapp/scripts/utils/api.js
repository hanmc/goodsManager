if (!window.IM) {
	window.IM = {};
}

var token = $U.getUrlParam('token');
IM.api = function() {

	//TEST TODO
	var PATH = $U.getUrl('hmc/service/');

	var api = {};

	var beforeRequest = function(callback) {

		if ($.isPlainObject(callback)) {
			var loadingArea = callback.loadingArea;
			if (loadingArea && !$.isPlainObject(loadingArea)) {
				loadingArea = {target:loadingArea};
			}
			var loadingButton = callback.loadingButton;
			var disableButton = callback.disableButton;
			if (disableButton && !$.isArray(disableButton)) {
				disableButton = [disableButton];
			}
			var before = callback.before;

			if (loadingArea) {
				loadingArea = $.extend({content:IM.utils.LOADING_NORMAL}, loadingArea);
				IM.utils.Loading(loadingArea.target, true, loadingArea.content);
			}
			if (loadingButton) {
				loadingButton.loading(true);
			}
			if (disableButton && disableButton.length > 0) {
				$(disableButton).each(function(index, button) {
					button.disable();
				});
			}
			if ($.isFunction(before)) {
				before();
			}
		}
	};

	var afterRequest = function(callback) {

		if ($.isPlainObject(callback)) {
			var loadingArea = callback.loadingArea;
			if (loadingArea && !$.isPlainObject(loadingArea)) {
				loadingArea = {target:loadingArea};
			}
			var loadingButton = callback.loadingButton;
			var disableButton = callback.disableButton;
			if (disableButton && !$.isArray(disableButton)) {
				disableButton = [disableButton];
			}
			var after = callback.after;

			if (loadingArea) {
				IM.utils.Loading(loadingArea.target, false);
			}
			if (loadingButton) {
				loadingButton.loading(false);
			}
			if (disableButton && disableButton.length > 0) {
				$(disableButton).each(function(index, button) {
					button.enable();
				});
			}
			if ($.isFunction(after)) {
				after();
			}
		}
	};

	var doSuccess = function(data, callback) {
		
		var success, fail;
		if ($.isFunction(callback)) {
			success = callback;
		} else if ($.isPlainObject(callback)){
			success = callback.success;
			fail = callback.fail;
		}
		if (data === null || data === undefined) {
			data = '';
		}
		console.log(success)
		if (data.returnCode !== undefined && data.returnCode !== null && data.returnCode !== '') {
			var ret;
			if ($.isFunction(fail)) {
				ret = fail(data);
			}
			if (ret !== false) {
				if (data.returnCode == '000016') {	//session invalid
					alert("服务不存在，请检查数据库信息");
					return;
				}else if(data.returnCode == '0000'){
					success(data);
				}else{
					alert('错误码：'+data.returnCode+'，错误信息：'+data.returnMsg);
				}
			}
		} else if ($.isFunction(success)) {
			success(data);
		}
	};
	api.doSuccess = doSuccess;

	var doFail = function(data, callback) {

		data.returnCode = 'HTTP-' + data.returnCode;
		var fail;
		if ($.isPlainObject(callback)){
			fail = callback.fail;
		}
		var ret;
		if ($.isFunction(fail)) {
			ret = fail(data);
		}
		if (ret !== false && data.returnCode != 'HTTP-0') {
			alert('错误码：'+data.returnCode+'，错误信息：'+data.returnMsg);
		}
	};
	api.doFail = doFail;

	var simulate = function(data, callback) {
		beforeRequest(callback);
		//setTimeout(function(){
			afterRequest(callback);
			doSuccess(data, callback);
		//}, 1000);
	};
	api.simulate = simulate;

	var request = function(method, url, params, callback,dataTypeTemp) {
		var contentType = dataTypeTemp=='text'?'application/x-www-form-urlencoded;charset=UTF-8':'application/json; charset=utf-8';
		var dataType = dataTypeTemp=='text'?'text':'json';

		if (params) {
			$.each(params, function(key, value) {
				if (value === null || value === undefined) {
					delete params[key];
				}
			});
			if(dataType == 'json'){
				params = JSON.stringify(params);
			}
		}
		beforeRequest(callback);
		return $.ajax({
			url : PATH + url,
			data : params,
			type : method,
			contentType : contentType,
			cache : false,
			traditional : true,
			beforeSend : function(request){
				request.setRequestHeader("x-token", token);
			},
			success : function(data, textStatus, jqXHR) {
				//setTimeout(function() {
					//fix for 302 Redirect
					if (jqXHR.responseText == '') {
						data = '';
					}
					if ($.trim(jqXHR.responseText).indexOf('<!DOCTYPE html') == 0) {
						//console.log(url);
						IM.utils.reload();
					} else {
						afterRequest(callback);
						doSuccess(data, callback);
					}
				//}, 1000);
			}, error : function(jqXHR, textStatus, errorThrown) {
				afterRequest(callback);
				var returnCode = jqXHR.status, returnMsg = errorThrown;
				doFail({returnCode:returnCode, returnMsg:returnMsg}, callback);
			}
		});
	};

	/* 通用Get方法 */
	api.Get = function(url, params, callback) {

		return request('GET', url, params, callback);
	};

	/* 通用Post方法 */
	api.Post = function(url, params, callback,dataType) {

		return request('POST', url, params, callback,dataType);
	};

	/* 通用Put方法 */
	api.Put = function(url, params, callback) {

		return request('PUT', url, params, callback);
	};

	/* 通用Delete方法 */
	api.Delete = function(url, params, callback) {

		return request('DELETE', url, params, callback);
	};

	return api;
}();

