angular
	.module("PrsApp")
	.controller("ProductCtrl", ProductCtrl);

// Uses (injects) the libs $http, and $routeParams
ProductCtrl.$inject = ["$http", "$routeParams"];

// Passes the variables of types $http, and $routeParams
function ProductCtrl($http, $routeParams) {
	// Sets a variable self equal to this
	// This has security issues and can be altered by outside functions
	var self = this;

	// Creates a variable inside of self that takes the (optional) parameters 'id'
	self.SelectedProductID = $routeParams.id;

	// Used to set the Page Title dynamically
	self.PageTitle = "Product";

	// Creates an instance of an array called Products inside the variable Self
	self.Products = [];

	// JQuery function that retrieves a data list of type Products from the database
	$http.get("http://localhost:63409/Products/List")
		.then(
			// if successful
			function(resp) {
				// .data allows the user to access the part of the json object that contains the Product object
				self.Products = resp.data;
			},
			// if error
			function(err) {
				// Print error
				console.log("ERROR:", err);
			}
		);

	// JQuery function that retrieves a specific product from the database given an ID
	$http.get("http://localhost:63409/Products/Get/" + self.SelectedProductID)
		.then(
			// if successful
			function(resp) {
				// .data allows the user to access the part of the json object that contains the Product object
				self.SelectedProduct = resp.data;
			},
			// if error
			function(err) {
				// Print error
				console.log("ERROR:", err);
			}
		);
}