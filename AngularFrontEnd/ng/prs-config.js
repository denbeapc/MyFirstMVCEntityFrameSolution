angular
	.module("PrsApp")
	.config(PrsConfig);

PrsConfig.$inject = ["$routeProvider"];

function PrsConfig($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home-view.html'
		})
		.when('/about', {
			templateUrl: 'views/about-view.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}