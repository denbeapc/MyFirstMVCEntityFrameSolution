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
			templateUrl: 'views/user/users-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users', {
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/user/users-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/user/users-detail-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users/edit/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/user/users-edit-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users/add', {
			// This view has advnaced components to it that rely on the functionality of the prs-user-controller class
			templateUrl: 'views/user/users-add-view.html',
			controller: 'UserCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/vendors', {
			// This view has advnaced components to it that rely on the functionality of the prs-vendor-controller class
			templateUrl: 'views/vendor/vendors-view.html',
			controller: 'VendorCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/vendors/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-vendor-controller class
			templateUrl: 'views/vendor/vendors-detail-view.html',
			controller: 'VendorCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/vendors/edit/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-vendor-controller class
			templateUrl: 'views/vendor/vendors-edit-view.html',
			controller: 'VendorCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/vendors/add', {
			// This view has advnaced components to it that rely on the functionality of the prs-vendor-controller class
			templateUrl: 'views/vendor/vendors-add-view.html',
			controller: 'VendorCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/products', {
			// This view has advnaced components to it that rely on the functionality of the prs-product-controller class
			templateUrl: 'views/product/products-view.html',
			controller: 'ProductCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/products/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-product-controller class
			templateUrl: 'views/product/products-detail-view.html',
			controller: 'ProductCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/products/edit/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-product-controller class
			templateUrl: 'views/product/products-edit-view.html',
			controller: 'ProductCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/products/add', {
			// This view has advnaced components to it that rely on the functionality of the prs-product-controller class
			templateUrl: 'views/product/products-add-view.html',
			controller: 'ProductCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/purchaserequests', {
			// This view has advnaced components to it that rely on the functionality of the prs-purchaserequest-controller class
			templateUrl: 'views/purchaserequest/purchaserequests-view.html',
			controller: 'PurchaseRequestCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/purchaserequests/detail/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-purchaserequest-controller class
			templateUrl: 'views/purchaserequest/purchaserequests-detail-view.html',
			controller: 'PurchaseRequestCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/purchaserequests/edit/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-purchaserequest-controller class
			templateUrl: 'views/purchaserequest/purchaserequests-edit-view.html',
			controller: 'PurchaseRequestCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/purchaserequests/add', {
			// This view has advnaced components to it that rely on the functionality of the prs-purchaserequest-controller class
			templateUrl: 'views/purchaserequest/purchaserequests-add-view.html',
			controller: 'PurchaseRequestCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/purchaserequestlineitems/:prId', {
			// This view has advnaced components to it that rely on the functionality of the prs-purchaserequest-controller class
			templateUrl: 'views/purchaserequestlineitem/purchaserequestlineitems-view.html',
			controller: 'PurchaseRequestLineItemCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/purchaserequestlineitems/edit/:id', {
			// This view has advnaced components to it that rely on the functionality of the prs-purchaserequest-controller class
			templateUrl: 'views/purchaserequestlineitem/purchaserequestlineitems-edit-view.html',
			controller: 'PurchaseRequestLineItemCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/purchaserequestlineitems/add/:prId', {
			// This view has advnaced components to it that rely on the functionality of the prs-purchaserequest-controller class
			templateUrl: 'views/purchaserequestlineitem/purchaserequestlineitems-add-view.html',
			controller: 'PurchaseRequestLineItemCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/about', {
			templateUrl: 'views/about-view.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}