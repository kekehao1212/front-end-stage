// controller
var appCtrl = angular.module('starter.controllers', ['angularFileUpload', 'ui.bootstrap.datetimepicker']);

// directive
var appDirect = angular.module('starter.directive', []);

// service
var appServices = angular.module('starter.services', []);

// service
var appComponents = angular.module('starter.components', []);

var mockPage = ['home', 'error', 'deny', 'rylai','test']

var app = angular
  .module('starter', ['ui.router', 'ngAnimate', 'starter.controllers', 'starter.services', 'starter.directive', 'starter.components', 'switcher']);
Rylai(app)
app.run(
  ['$rootScope', '$location', '$state', '$stateParams',  '$http', 'auth', 'rylaiCommon', 'nav',
    function($rootScope, $location, $state, $stateParams,  $http, auth, rylaiCommon, nav) {
      var search = $location.search()
      
      var msg = {
        respCode:200,
        respMsg:'admin域加载成功',
        value:{

        }
      }
      window.parent.postMessage(msg, '*')
      
      $rootScope.layout = {
        tree: {
          data: []
        },
        levelMenu: {
          data: []
        },
        userInfo: {
          data: []
        }
      }
      $rootScope.$on('$stateChangeStart', function(evt, next, curr) {
        // 判断用户权限
        auth.get(function(authData) {
          if (authData.data.respCode == 0 || authData.data.respCode == "success") {
            nav.get(function(json) {
                $rootScope.layout.levelMenu.data = rylaiCommon.getLevelMenu(json.data.value.parent, next.name)
                if ($rootScope.layout.levelMenu && $rootScope.layout.levelMenu.data && $rootScope.layout.levelMenu.data.length == 0 && !mockPage.includes(next.name)) {
                  if (next.name != 'deny') {
                    evt.preventDefault()
                    location.href = "/layout.html#/deny";
                  }
                }
            })
          } else if (authData.data.respCode == 302 || authData.data.respCode == "not.login") {
            if(search.targetName=='beifu'){
              var redirectUrl = authData.data.value.redirect
              var redirectUrlParam = redirectUrl.split('?')[1]
              var bfBckkUrl = ''
              location.href = bfBckkUrl
              return
            }
            if (next.name != 'deny') {
              evt.preventDefault()
              location.href = "/layout.html#/deny";
            }

            $.confirm('用户认证信息过期，请重新登录', function() {
              var url = authData.data.value.redirect;
              location.href = url;
            }, function() {}, false)
          }
        });
      });

      $rootScope.$on('$viewContentLoaded', function() {
        //beifu style
        var isBeifu = $.getQueryStringByName('targetName') == 'beifu'?true:false;
        if(isBeifu){
          var $container = $(".container-fluid");
          $('#ng-starter').addClass('container-beifu')
          //$container.addClass('container-beifu');
        }
      });

      // 判断用户权限
      auth.get(function(authData) {
        if (authData.data.respCode == 0 || authData.data.respCode == "success") {
          $rootScope.layout.userInfo.data = {
            name: authData.data.value.name,
            roles: authData.data.value.roles,
            detail: [{
              title: '注销',
              event: function(argument) {
                $.confirm('确定注销', function() {
                  location.href = ''
                })
              }
            }]
          }
          nav.get(function(json) {
            $rootScope.layout.tree.data = json.data.value.parent
            $rootScope.$digest()
          })
        }
      });
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://media.w3.org/**'
  ]);
});