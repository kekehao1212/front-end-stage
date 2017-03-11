;(function (argument) {
	window.CssLoader = {
		version : '1.1.1',
		css: function(src,callback){
			var style = document.createElement('link'),
				loaded;
			style.setAttribute('href', src);
			style.rel = 'stylesheet';
			style.type = 'text/css';
		    if (callback) {
		    style.onreadystatechange = style.onload = function() {
		        if (!loaded) {
		          callback();
		        }
		        loaded = true;
		      };
		    }
		    var head = document.getElementsByTagName("head")[0];
		    (head || document.body).appendChild(style);
		    return this;
		}
	}
})();

var cssMap = {
	'commonMain' : '/common/css/main.min.css',
	'riskAdminMain' : '/risk-admin/css/main.min.css',
	'clearsettleMain' : '/clearsettle/css/main.min.css',
	'cmapAdminMain' : '/cmap-admin/css/main.min.css',
	'cardAdminMain' : '/card-admin/css/main.min.css',
	'ordersMain' : '/orders/css/main.min.css',
	'refundMain' : '/refund/css/main.min.css',
//	'secure' : '/secure/css/main.min.css',

	// lib
	'nprogress':"/components/nprogress/nprogress.css",
	'bootstrap':"/components/bootstrap/dist/css/bootstrap.min.css",
	'daterangepicker':'/components/bootstrap-daterangepicker/daterangepicker.css',
	'switch':'/lib/angular-switcher/angular-switcher.min.css',
	'font':"/lib/font-awesome-4.4.0/css/font-awesome.min.css",
	// 'bootstrapTheme':"/components/bootstrap/dist/css/bootstrap-theme.min.css",
	// 'dateboxmain':"/components/easy-ui/dateboxmain.min.css",
	// 'datetimepicker':"/components/bootstrap/css/bootstrap-datetimepicker.min.css",
	// 'datetimepickerNew':"/components/angular-bootstrap-datetimepicker/css/datetimepicker.css"
}
CssLoader
	.css(cssMap.nprogress)
	.css(cssMap.bootstrap)
	.css(cssMap.daterangepicker)
	.css(cssMap.font)
	.css(cssMap.switch)
	// .css(cssMap.dateboxmain)
	// .css(cssMap.datetimepicker)
	// .css(cssMap.datetimepickerNew)

	.css(cssMap.commonMain)
	.css(cssMap.riskAdminMain)
	
	;
