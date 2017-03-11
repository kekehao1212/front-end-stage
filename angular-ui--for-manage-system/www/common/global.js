/**
 created by wikies.wan
 */
$(function() {
	/***
	 cookie tool
	 **/
	$.cookie = (function() {
		var CookieManager = function() {};
		CookieManager.prototype = {
			constructor: CookieManager,
			destroy: function(name) {
				return this.write(name, '', -1);
			},
			read: function(name) {
				var expression = new RegExp('(^|; )' + encodeURIComponent(name) + '=(.*?)($|;)'),
					matches = document.cookie.match(expression);
				return matches ? decodeURIComponent(matches[2]) : null;
			},
			write: function(name, value, expire, path, domain, secure) {
				var date = new Date();
				if (expire && typeof expire === 'number') date.setTime(date.getTime() + expire * 1000);
				else expire = null;
				return document.cookie =
					encodeURIComponent(name) + '=' + encodeURIComponent(value) + (expire ? '; expires=' + date.toUTCString() : '') + '; path=' + (path ? path : '/') + (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
			}
		}
		return new CookieManager();
	})();
	/**
	 对话框类
	 **/

	function Dialog(option) {
		var defaults = {
			closeBtn: false,
			cancelShow: false,
			cancelText: '取消',
			cancelFn: nullFn,
			sureText: '确定',
			sureFn: nullFn,
			title: '提示',
			text: ''
		};
		var opts = $.extend({}, defaults, option);

		function nullFn() {
			return false;
		}

		var modalStr = '' + '<div class="v-mask">' + '	<div class="v-model">' + '		<div class="v-head">' + '			<div class="v-head-text">' + opts.title + '</div>' + '			<div class="v-head-close ' + (opts.closeBtn ? '' : 'hide') + '" data-act="close" >x</div>' + '		</div>' + '		<div class="v-body">' + opts.text + '		</div>' + '		<div class="v-bottom">' + '			<button type="button" class="btn btn-default ' + (opts.cancelShow ? '' : 'hide') + '" data-act="cancel">取消</button>' + '			<button type="button" class="btn btn-info" data-act="sure">确定</button>' + '		</div>' + '	</div>' + '</div>';

		this.obj = $(modalStr);
		this.option = opts;

	}
	Dialog.prototype.show = function() {
		var _this = this;
		var _obj = this.obj;
		_obj.appendTo("body").fadeIn("fast").find("[data-act='sure']").click(function() {
			_this.hide(_this.option.sureFn);
		});
		_obj.find("[data-act='cancel']").click(function() {
			_this.hide(_this.option.cancelFn);
		});
		_obj.find("[data-act='close']").click(function() {
			_this.hide();
		});
	}
	Dialog.prototype.hide = function(callback) {
			var _this = this;
			var _obj = this.obj;
			_obj.fadeOut("fast", function() {
				_obj.remove();
				if (typeof callback === 'function') {
					callback();
				}
			});
		}
		/**
		 提示框，重写原生的alert
		 参数 
		 text 提示内容
		 fn 关闭弹窗后的回调函数
		 */
	$.trace = function(text, fn) {
			var defaults = {
				sureFn: fn,
				text: text
			};
			var dialog = new Dialog(defaults);
			dialog.show();
		}
		/**
		 确认框，重写原声的confirm
		 参数
		 text 提示内容
		 sureFn 点击确认的回调函数
		 cancelFn 点击取消的回调函数	
		 */
	$.confirm = function(text, sureFn, cancelFn, isShow) {
		var defaults = {
			cancelShow: isShow == false ? false : true,
			cancelFn: cancelFn,
			sureFn: sureFn,
			text: text
		};
		var dialog = new Dialog(defaults);
		dialog.show();
	}


	Array.prototype.in_array = function(e) {
		for (i = 0; i < this.length && this[i] != e; i++);
		return !(i == this.length);
	}
	// includes

	Array.prototype.includes = function(e) {
		for (var i = this.length-1; i>=0;  i--){
			if(this[i]==e){
				return true
			}
		}
		return false
	}

	$.getType = function(o) {
		var _t;
		return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
	}

	$.deepCopy = function(destination, source) {
		for (var p in source) {
			if ($.getType(source[p]) == "array" || $.getType(source[p]) == "object") {
				destination[p] = $.getType(source[p]) == "array" ? [] : {};
				arguments.callee(destination[p], source[p]);
			} else {
				destination[p] = source[p];
			}
		}
		return destination;
	}

	$.getParameterFromObject = function(source) {
		var parameter = [];
		for (var p in source) {
			if (source[p] != null && source[p] != "" && source[p] != undefined && p != "p") {
				parameter.push(p + "=" + source[p]);
			}
		}
		if (parameter.length > 0) {
			parameter.push("p=1");
			parameter = parameter.join("&");
		} else {
			parameter = "";
		}
		return parameter;
	}
	
	$.getQueryStringByName = function(name) {
		var result = location.hash.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {
			return "";
		}
		return result[1];
	}


	Date.prototype.Format = function(fmt) {
		if (fmt == "" || fmt == undefined || fmt == null) {
			return "";
		}
		var o = {
			"M+": this.getMonth() + 1,
			//月份 
			"d+": this.getDate(),
			//日 
			"h+": this.getHours(),
			//小时 
			"m+": this.getMinutes(),
			//分 
			"s+": this.getSeconds(),
			//秒 
			"q+": Math.floor((this.getMonth() + 3) / 3),
			//季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}



});