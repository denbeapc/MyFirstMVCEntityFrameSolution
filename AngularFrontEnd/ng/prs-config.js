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
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/users-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users', {
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/users-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/users-detail-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users/edit/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/users-edit-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/vendors', {
			// This view has advnaced components to it that rely on the functionality of the prs-vendor-controller class
			templateUrl: 'views/vendors-view.html',
			controller: 'VendorCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/vendors/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-vendor-controller class
			templateUrl: 'views/vendors-detail-view.html',
			controller: 'VendorCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/products', {
			// This view has advnaced components to it that rely on the functionality of the prs-product-controller class
			templateUrl: 'views/products-view.html',
			controller: 'ProductCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/products/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-product-controller class
			templateUrl: 'views/products-detail-view.html',
			controller: 'ProductCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/about', {
			templateUrl: 'views/about-view.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}