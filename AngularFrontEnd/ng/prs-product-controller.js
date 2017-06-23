angular
	.module("PrsApp")
	.controller("ProductCtrl", ProductCtrl);

// Uses (injects) the libs $http, $routeParams, and $location
ProductCtrl.$inject = ["$http", "$routeParams", "$location"];

// Passes the variables of types $http, $routeParams, and $location
function ProductCtrl($http, $routeParams, $location) {
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

	// JQuery function that updates a specific product from the database given an ID
	self.Update = function(product) {
		$http.post("http://localhost:63409/Products/Change", product)
			.then(
				// if successful
				function(resp) {
					$location.path("/products");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	self.GetVendors = function() {
		$http.get("http://localhost:63409/Vendors/List")
			.then(
				function(resp) {
					self.Vendors = resp.data;
				},
				function(err) {
					console.log("ERROR:", err)
				}
			);
	}
	self.GetVendors();

	// A blank instance of a Product object that will store the values when adding a new Product
	self.NewProduct = {};

	// JQuery function that adds a new product to the database
	self.Add = function(product) {
		$http.post("http://localhost:63409/Products/Add", product)
			.then(
				// if successful
				function(resp) {
					$location.path("/products");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific product from the database given an ID
	self.Delete = function(id) {
		$http.post("http://localhost:63409/Products/Remove/" + id)
			.then(
				// if successful
				function(resp) {
					$location.path("/products");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
}