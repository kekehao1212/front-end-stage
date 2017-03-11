var version = 'ssssss'
var libMap = {
    'app': '/app.js',
    //repo routers 
    //['common','refund','orders','risk-admin','cmap-admin','card-admin','clearsettle']
    'commonRouter': '/common/router.config.js?v=' + version,
    'riskAdminRouter': '/risk-admin/router.config.js?v=' + version,
    'cardAdminRouter': '/card-admin/router.config.js?v=' + version,
    'clearsettleRouter': '/clearsettle/router.config.js?v=' + version,
    'cmapAdminRouter': '/cmap-admin/router.config.js?v=' + version,
    'ordersRouter': '/orders/router.config.js?v=' + version,
    'refundRouter': '/refund/router.config.js?v=' + version,
    // 'bpsRouter':'/bps/router.config.js?v='+version,

    //repo controller
    'controllerMain': '/common/js/controllers/main.js?v=' + version,
    'riskAdminCtrl': '/risk-admin/js/controllers/main.js?v=' + version,
    'cardAdminCtrl': '/card-admin/js/controllers/main.js?v=' + version,
    'clearsettleCtrl': '/clearsettle/js/controllers/main.js?v=' + version,
    'cmapAdminCtrl': '/cmap-admin/js/controllers/main.js?v=' + version,
    'ordersCtrl': '/orders/js/controllers/main.js?v=' + version,
    'refundCtrl': '/refund/js/controllers/main.js?v=' + version,
    // 'bpsCtrl':'/bps/js/controllers/main.js?v='+version,

    //**加解密路由配置 begin
    'secureRouter':'/secure/router.config.js?v='+ version,
    'secureMain':'/secure/js/controllers/main.js?v='+ version,
    //**加解密路由配置 end

    'globalMain': '/common/global.js?v=' + version,
    'serviceMain': '/common/js/service/service.js?v=' + version,
    'directiveMain': '/common/js/directives/directives.js?v=' + version,

    'angular': '/components/angular/angular.min.js?v=' + version,
    'router': '/components/angular-ui-router/release/angular-ui-router.min.js?v=' + version,
    'animate': '/components/angular-animate/angular-animate.min.js?v=' + version,
    'jquery': '/components/jquery/jquery.min.js?v=' + version,
    // 'datetimepicker':'/components/bootstrap/js/bootstrap-datetimepicker.min.js?v='+version,
    'nprogress': '/components/nprogress/nprogress.js?v=' + version,
    'bootstrap': '/components/bootstrap/dist/js/bootstrap.min.js?v=' + version,
    'moment': '/lib/moment-with-locales.min.js',
    'daterangepicker': '/components/bootstrap-daterangepicker/daterangepicker.js',
    'modernizr': '/lib/modernizr/modernizr-2.8.3-respond-1.4.2.min.js?v=' + version,
    'switch': './lib/angular-switcher/angular-switcher.min.js?v=' + version,
    'rylai': '/lib/rylai/rylai.js?v=' + version,
    'upload': '/components/uploadFile/angular-file-upload.min.js',
    'datetimepickerNew_moment': '/components/angular-bootstrap-datetimepicker/js/moment.js',
    'datetimepickerNew_datetimepicker': '/components/angular-bootstrap-datetimepicker/js/datetimepicker.js',
    'datetimepickerNew_templates': '/components/angular-bootstrap-datetimepicker/js/datetimepicker.templates.js'

}

//LAB
$LAB
    // entry app.js
    .script(libMap.app)
    .wait()

    // all routers
    .script(libMap.commonRouter)
    .script(libMap.riskAdminRouter)
   

    //service
    .script(libMap.serviceMain)

    //directive
    .script(libMap.directiveMain)

    // controller
    .script(libMap.controllerMain)
    .script(libMap.riskAdminCtrl)
    
    .wait(function() {
        // start app by manual
        var appDom = document.getElementById("ng-starter");
        angular.bootstrap(appDom, ['starter']);
    });