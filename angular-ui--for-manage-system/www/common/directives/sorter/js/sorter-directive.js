/**
	sort
 **/
appDirect
.directive('vpalSort',  function() {
	return {
				restrict: 'EAC',
				replace:true,
				scope:{
					vpalName:"@",
					vpalSort:"="
				},
				controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
					$scope.sortQuery = function(columnName){
				        if($scope.vpalSort.column.name == columnName){
				            $scope.vpalSort.column.sort = !$scope.vpalSort.column.sort;
				        }
				        else{
				            $scope.vpalSort.column.sort = true;
				        }
				        $scope.vpalSort.column.name = columnName;
				        $scope.vpalSort.queryData.column = columnName;
				        $scope.vpalSort.queryData.order = $scope.vpalSort.column.sort===true?"desc":"asc";
				        $scope.vpalSort.query(1);
    				}
				}]
				,
				templateUrl:"common/directives/sorter/template/sorter.html",
				transclude: true,
				link:
				function postLink(scope,element,attr) {
	        	}
			};
});
