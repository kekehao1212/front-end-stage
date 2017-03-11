appCtrl.controller('iframeCtrl',['$rootScope','$scope', '$sce', function($rootScope,$scope,$sce) {
		var url = location.href;
		$scope.iframe = {};
		$scope.iframe.src = decodeURIComponent(url.substring(url.indexOf("?") + 1, url.length));
		$scope.iframe.src = $sce.trustAsResourceUrl($scope.iframe.src);
}]);