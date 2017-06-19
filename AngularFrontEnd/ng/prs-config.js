angular
	.module("PrsApp")
	.config(PrsConfig);

// Uses (injects) the libs $routeProvider and $locationProvider
PrsConfig.$inject = ["$routeProvider", "$locationProvider"];

// Passes variables of the types $routeProvider, and $locationProvider
function PrsConfig($routeProvider, $locationProvider) {
	// URL slash codes were altered in the newest update of Angular
	// The hashPrefix simplifies the URL codes
	$locationProvider.hashPrefix('');

	// $routeProvider establishes dynamically altered views for the HTML code to use
	$routeProvider
		.when('/', {
			templateUrl: 'views/home-view.html'
		})
		.when('/users', {
			// This view has advnaced components to it that rely on the functionality of the prs-controller class
			templateUrl: 'views/users-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users', {
			// This view has advnaced components to it that rely on the functionality of the prs-controller class
			templateUrl: 'views/users-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-controller class
			templateUrl: 'views/users-detail-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/about', {
			templateUrl: 'views/about-view.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}