angular
	.module("PrsApp")
	.controller("VendorCtrl", VendorCtrl);

// Uses (injects) the libs $http, $routeParams, and $location
VendorCtrl.$inject = ["$http", "$routeParams", "$location"];

// Passes the variables of types $http, $routeParams, and $location
function VendorCtrl($http, $routeParams, $location) {
	// Sets a variable self equal to this
	// This has security issues and can be altered by outside functions
	var self = this;

	// Creates a variable inside of self that takes the (optional) parameters 'id'
	self.SelectedVendorID = $routeParams.id;

	// Used to set the Page Title dynamically
	self.PageTitle = "Vendor";

	// Creates an instance of an array called Vendors inside the variable Self
	self.Vendors = [];

	// JQuery function that retrieves a data list of type Vendors from the database
	$http.get("http://localhost:63409/Vendors/List")
		.then(
			// if successful
			function(resp) {
				// .data allows the user to access the part of the json object that contains the Vendor object
				self.Vendors = resp.data;
			},
			// if error
			function(err) {
				// Print error
				console.log("ERROR:", err);
			}
		);

	// JQuery function that retrieves a specific vendor from the database given an ID
	$http.get("http://localhost:63409/Vendors/Get/" + self.SelectedVendorID)
		.then(
			// if successful
			function(resp) {
				// .data allows the user to access the part of the json object that contains the Vendor object
				self.SelectedVendor = resp.data;
			},
			// if error
			function(err) {
				// Print error
				console.log("ERROR:", err);
			}
		);

	// JQuery function that updates a specific vendor from the database given an ID
	self.Update = function(vendor) {
		$http.post("http://localhost:63409/Vendors/Change", vendor)
			.then(
				// if successful
				function(resp) {
					$location.path("/vendors");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// A blank instance of a Vendor object that will store the values when adding a new Vendor
	self.NewVendor = {};

	// JQuery function that adds a new vendor to the database
	self.Add = function(vendor) {
		$http.post("http://localhost:63409/Vendors/Add", vendor)
			.then(
				// if successful
				function(resp) {
					$location.path("/vendors");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific vendor from the database given an ID
	self.Delete = function(id) {
		$http.post("http://localhost:63409/Vendors/Remove/" + id)
			.then(
				// if successful
				function(resp) {
					$location.path("/vendors");
				},
				// if error
				function(err) {
					// Print error
					console.log("ERROR:", err);
				}
			);
	}
}