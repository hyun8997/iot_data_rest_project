/**
 *  GeoBoard Component - Ajax 
 * 
 *  GeoBoard 내 ajax 통신을 관리한다.
 */

var Ajax = function(options) {
	
	String.prototype.isBlank = function() {
		return (!this || /^\s*$/.test(this));
	};
	
	if(typeof options == "undefined") options = {};
	var contextPath = typeof options.contextPath == "undefined" ? location.origin : options.contextPath; 
	var callCount = typeof options.count == "undefined" ? 5 : options.count;
	var isLog = typeof options.isLog == "undefined" ? false : options.isLog;
	var timeout = typeof options.timeout == "undefined" ? 30000 : options.timeout;
	var loadComponent = typeof options.loadComponent == 'undefined' ? null : options.loadComponent;
	var currentCount = 0;
	var delayList = [];
	var isPageReload = false;
	
	var checkInit = true;
	
	function init() {
		if(typeof window["jQuery"] == "undefined") {
			alert("Ajax Error : jQuery 라이브러리를 등록해주시기 바랍니다.");
			checkInit = false;
		}
		
		if(loadComponent != null && !loadComponent.length) {
			loadComponent = jQuery(loadComponent);
		}
	}
	
	function delayCall() {
		if(delayList.length > 0 && currentCount < callCount) {
			var target = delayList[0];
			delayList.splice(0, 1);
			call(target.url, target.method, target.headers, target.params, target.async, target.success, target.error);
			delayCall();
		}
	}
	
	function call(url, method, headers, params, async, success, error) {
		if(!checkInit) {
			alert("Ajax Error : jQuery 라이브러리가 존재하지 않습니다.");
			return;
		}
		if(typeof async == "undefined" || async == null) async = true;
		if(async && currentCount >= callCount) {
			if(isLog) {
				console.log("요청개수가 많습니다. 조절해주시기 바랍니다.");
			}
			delayList[delayList.length] = {
					url : url,
					method : method,
					headers : headers,
					params : params,
					async : async,
					success : success,
					error : error
			}
			return;
		}
		
		currentCount++;
		
		if(method == null) method = "get";
		if(url.indexOf("http") == -1) url = contextPath+url;
		
		if(isLog){
			console.log("Request Ajax : " + url);
			console.log("       method : " + method);
			if(params != null) {
				console.log("       params : " + JSON.stringify(params));
			}else{
				console.log("       params : null");
			}
			console.log("       async : " + async);
		}
		
		if(!headers) {
			headers = {};
		}
		
		headers["isAjax"] = true;
		
		try{
			var _csrf = jQuery("META[name='_csrf']").attr("content");
			var _csrf_header = jQuery("META[name='_csrf_header']").attr("content");
			if(_csrf != "" && _csrf_header != "") {
				headers[_csrf_header] = _csrf;
			}
		}catch(e) {
			console.log(e);
		}
		
		if(loadComponent != null && currentCount > 0) {
			loadComponent.show();
		}
		return jQuery.ajax({
			url : url,
			type : method,
			data : params,
			dataType : "json",
			timeout : timeout,
			async : async,
			headers : headers,
			success : function(data) {
				currentCount--;
				if(currentCount < 0) {
					currentCount = 0;
				}

				if(currentCount == 0 && loadComponent != null) {
					loadComponent.hide();
				}
				delayCall();
				if(data) {
					if(data.RESULT == "SUCCESS") {
						success.apply(this, arguments);
					}else{
						if(isLog) {
							//console.log(data.EXCEPTION);
						}
						
						if(error) {
							error.apply(this, arguments);
						}
					}
				}else{
					if(isLog) {
						console.log(url+" 결과가 없습니다. 확인바랍니다.");
					}
				}
			},
			error : function(jqXHR, exception) {
				if(!isPageReload && (jqXHR.status == 9403 || jqXHR.status == 403)) {
					alert("장시간 이용하지 않아 세션이 만료되었습니다. 화면을 갱신합니다.");
					isPageReload = true;
					location.reload();
				}else if(!isPageReload && jqXHR.status == 9405) {
					alert("잘못된 접근 권한입니다. 계정 정보를 확인해주시기 바랍니다.");
				}else if(!isPageReload && jqXHR.status == 9401) {
					alert("로그인 후 사용하실 수 있습니다. 로그인해주시기 바랍니다.");
				}
				
				currentCount--;
				if(currentCount < 0) {
					currentCount = 0;
				}

				if(currentCount == 0 && loadComponent != null) {
					loadComponent.hide();
				}
				delayCall();
				if(isLog) {
					//console.log(exception);
				}
				if(error) {
					error.apply(this, arguments);
				}
			}
		});
	}
	
	init();
	return {
		call : function(url, method, headers, params, async, success, error) {
			return call(url, method, headers, params, async, success, error);
		},
		getContextPath : function() {
			return contextPath;
		}
	}
};