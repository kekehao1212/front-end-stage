appServices.factory('fetchService', ['$http', function($http) {
	return {
		fetchGet:function(url, data) {
			return $http({url:url,method:'get',data:data});
		},
		fetchPost:function(url, data) {
			return $http( {url:url,method:'post',data:data});
		}
	};
}]);