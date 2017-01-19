(function(){
	
	angular.module("myApp", [])
	
  
  .directive("mainHead", function() {
		
		return {
			restrict: 'E',
      title: '@',
			templateUrl: '/main-head.html',
			replace: true
		};
		
	})
	
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