/**
	sort
 **/
appDirect
	.directive('icePermission', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				value: "@",
				out: "="
			},
			controller: ['$scope', '$element', '$attrs', '$transclude', 'auth', function($scope, $element, $attrs, $transclude, auth) {
				$scope.isShow = false
			
				$scope.$watch('value', function(){
					auth.get(function(authData) {
						if (authData && authData.data && authData.data.value && (authData.data.respCode == 0 || authData.data.respCode == "success")) {
							if ( authData.data.value.perms && authData.data.value.perms.length) {
								$scope.isShow = authData.data.value.perms.in_array($scope.value || '')
								if ($scope.out != 'undefined') {
									$scope.out = $scope.isShow
								}
							} else if (authData.data.value.username == 'admin') {
								$scope.isShow = true
								if ($scope.out != 'undefined') {
									$scope.out = true
								}
							} else {
								$scope.isShow = false
								if ($scope.out != 'undefined') {
									$scope.out = false
								}
							}
						}

					});
				});
			}],
			templateUrl: "common/directives/permission/template.html",
			transclude: true,
			link: function postLink(scope, element, attr) {}
		};
	});