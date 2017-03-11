/**
	sort
 **/
 
appDirect
	.directive('iceInputNumber', function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				ngModel: "="
			},
			controller: ['$scope', '$element', '$attrs', '$transclude',  function($scope, $element, $attrs, $transclude) {
				$scope.$watch('ngModel', function(newValue, oldValue) {
					oldValue = oldValue || "";
					newValue = newValue || "";
					var newValueStr = newValue.toString();
					var oldValueStr = oldValue.toString();
					var newValueLength = newValueStr.length;
					var oldValueLength = oldValueStr.length;
					var index = newValueStr.indexOf('.');//小数点位置
					if (newValue != oldValue || newValueLength != oldValueLength) {
						//大于100
						if(newValue>100){
							$scope.ngModel = oldValue;
						}
						// 小于0
						else if( newValue<0){
							$scope.ngModel = 0;
						}
						// 小数不能超过两位 1.223 =>
						else if(index>0&&(newValueLength - index)>3){
							$scope.ngModel = ((newValueStr+'').substring(0,index + 3))*1;
						}
					}
				});
			}],
			transclude: true,
			link: function postLink(scope, element, attr) {}
		};
	});