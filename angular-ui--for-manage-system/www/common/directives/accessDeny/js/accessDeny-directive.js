/**
	vpalAccessDeny
 **/
appDirect
.directive('vpalAccessDeny',  function() {
	return {
				restrict: 'EAC',
				replace:true,
				scope:{
					vpalAccessDeny:"="
				},
				templateUrl:"common/directives/accessDeny/template/accessDeny.html",
				transclude: true,
				link:
				function postLink(scope,element,attr) {
	        	}
			};
});