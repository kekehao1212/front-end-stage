app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('test', {
		url: '/test',
		cache: false,
		templateUrl: 'risk-admin/views/test.html',
		controller: 'atomQueryCtrl',
		access_level: 'risk.atom.query'
	})

});