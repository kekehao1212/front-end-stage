
if(location.hash===''){
    location.hash = '#/'
}

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    cache: true,
    templateUrl: 'common/views/home.html',
    controller: 'homeCtrl',
    access_level: 'common'
  })
  .state('rylai', {
    url: '/rylai',
    cache: true,
    templateUrl: 'common/views/rylai.html',
    controller: 'rylaiCtrl',
    access_level: 'common'
  })
  .state('index', {
    url: '/',
    cache: true,
    templateUrl: 'common/views/home.html',
    controller: 'homeCtrl',
    access_level: 'common'
  })
  
  .state('iframe', {
    url: '/iframe',
    cache: false,
    templateUrl: 'common/views/iframe.html',
    controller: 'iframeCtrl',
    access_level: 'common'
  })

  .state('error', {
    url: '/error',
    cache: true,
    templateUrl: 'common/views/404.html',
    controller: 'errorCtrl',
    access_level: 'common'
  })
  .state('oldStyle', {
    url: '/oldStyle',
    cache: true,
    templateUrl: 'common/views/oldStyle.html',
    controller: 'errorCtrl',
    access_level: 'common'
  })
  .state('message', {
    url: '/message',
    cache: true,
    templateUrl: 'common/views/404.html',
    controller: 'errorCtrl',
    access_level: 'common'
  })
  .state('nopermission', {
    url: '/nopermission',
    cache: true,
    templateUrl: 'common/views/home.html',
    controller: 'homeCtrl',
    access_level: 'common'
  })
   .state('log', {
    url: '/log',
    cache: true,
    templateUrl: 'common/views/deny.html',
    controller: 'errorCtrl',
    access_level: 'common'
  })

  .state('deny', {
    url: '/deny',
    cache: true,
    templateUrl: 'common/views/deny.html',
    access_level: 'common'
  })
  ;
  $urlRouterProvider.otherwise('error');
  $httpProvider.interceptors.push('httpInterceptor');
});

var ajaxCount = ajaxCount || 0;
//loading
app.factory('httpInterceptor', ["$rootScope", function ($rootScope) {
  $rootScope.loadingMask = false;
  var timestampMarker = {
      'request': function (config) {
        // 成功的请求方法
        NProgress.start();
        $rootScope.loadingMask = true;
        ajaxCount++;
        return config;
      },
      'response': function (response) {
        // 响应成功
          ajaxCount--;
          if (ajaxCount === 0) {
            NProgress.done();
            $rootScope.loadingMask = false;
          }
          return response;
      },
      'requestError': function(rejection) {
        $rootScope.loadingMask = false;
        // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
        return response; // 或新的promise
        // 或者，可以通过返回一个rejection来阻止下一步
        // return $q.reject(rejection);
      },
      'responseError': function(rejection) {
        NProgress.done();
        $rootScope.loadingMask = false;
        if (rejection.status === 500) {
          $.trace('500:服务器出错，请稍后重试，' + rejection.statusText);
        }
        else{
          $.trace(rejection.status + ": " + rejection.statusText);
        }
        
        // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
        return rejection; // 或新的promise
        // 或者，可以通过返回一个rejection来阻止下一步
        // return $q.reject(rejection);
      }
  };
  return timestampMarker;
}]);

// disable IE ajax request caching
app.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);