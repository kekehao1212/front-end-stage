appCtrl.controller('rylaiCtrl',['$rootScope', '$scope', 'http',function($rootScope, $scope,http) {
	$scope.datepicker1 = {
		start: '',
		end: ''
	}
	$scope.datepicker2 = {
		start: '2016-05-01',
		end: '2016-06-01'
	}
	$scope.datepicker3 = {
		start: '2016-05-01',
		end: '2016-06-01'
	}
	$scope.datepicker4=''
	$scope.name = 'jack'
	$scope.email = 'jack@vip.com'
	$scope.select2 = {
	    model: '1',
	    option: [
	      {value: '1', name: 'Option A'},
	      {value: '2', name: 'Option B'},
	      {value: '3', name: 'Option C'}
	    ]
	};
	$scope.permission = {
		test1:false,
		test2:false,
		test2:false
	}
	/*
	* Modal 摸态框
	*/
	$scope.modal = {
		title:'this is modal',
		ok:function(){
			$scope.modal.isShow = false
		},
		btnDisabled:true,// true or false
		isShow:false,
		size:"lg", //sm
		buttonShow:{
			ok: true,
			cancel: true
		},
	}
	$scope.showModal = function(){
		$scope.modal.isShow = true
	}

	

	function queryFn() {
		//$.confirm('213131312')
		return 
		http.get('/proxy/vpal-oss/api/log/list', {
			p: $scope.pagination.currentPage,
			s: $scope.pagination.size,
			start:$scope.pagination.start,
			end:$scope.pagination.end
		}, function(argument) {
			$scope.pagination.count = argument.data.value.count
			$scope.pagination.result = argument.data.value.results
			$scope.$digest()
		});
	}

	$scope.queryFn = queryFn

	$scope.btnQueryFn = function(){
		$scope.pagination.currentPage =  1
		$scope.queryFn()
	}

	$scope.pagination = {
		count: 0, //总数目
		currentPage: 1,
		result:[],
		showNumber: 5,// 可选
		size: 10,//可选
		onChange: queryFn
	}
	$scope.queryFn();


}]);