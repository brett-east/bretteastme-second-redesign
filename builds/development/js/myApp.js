(function(){
	
	angular.module("myApp", [])
	
	
	.directive("mainNav", function() {
		
		return {
			restrict: 'E',
			templateUrl: '/main-nav.html',
			replace: true
		};
		
	})
	
	
	.directive("mainFooter", function() {
		
		return {
			restrict: 'E',
			templateUrl: '/main-footer.html',
			replace: true
		};
		
	});
	
	
	
	
})();