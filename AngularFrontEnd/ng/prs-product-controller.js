angular
	.module("PrsApp")
	.controller("ProductCtrl", ProductCtrl);

ProductCtrl.$inject = ["$http", "$routeParams", "$location", "ProductSvc", "VendorSvc", "SystemSvc"];

function ProductCtrl($http, $routeParams, $location, ProductSvc, VendorSvc, SystemSvc) {
	var self = this;
	self.PageTitle = "Product";

	SystemSvc.VerifyUserLogin();
	self.AdminRights = SystemSvc.GetAdminRights();
	
	// JQuery function that retrieves a data list of type Product from the database
	ProductSvc.List()
		.then(
			function(resp) {
				self.Products = resp.data;
			},
			function(err) {
				self.Products = [];
				console.log("[ERROR] ", err);
			}
		);

	self.SelectedProductID = $routeParams.id;

	// JQuery function that retrieves a specific product from the database given an ID
	ProductSvc.Get(self.SelectedProductID)
		.then(
			function(resp) {
				self.SelectedProduct = resp.data;
			},
			function(err) {
				console.log("[ERROR] ", err);
			}
		);

	// JQuery function that updates a specific product from the database given an ID
	self.Update = function(product) {
		ProductSvc.Change(product)
			.then(
				function(resp) {
					$location.path("/products");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	self.GetVendors = function() {
		VendorSvc.List()
			.then(
				function(resp) {
					self.Vendors = resp.data;
				},
				function(err) {
					self.Vendors = [];
					console.log("[ERROR] ", err);
				}
			);
	}
	self.GetVendors();

	self.NewProduct = {};

	// JQuery function that adds a new product to the database
	self.Add = function(product) {
		ProductSvc.Add(product)
			.then(
				function(resp) {
					$location.path("/products");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}

	// JQuery function that deletes a specific product from the database given an ID
	self.Delete = function(id) {
		ProductSvc.Remove(id)
			.then(
				function(resp) {
					$location.path("/products");
				},
				function(err) {
					console.log("ERROR:", err);
				}
			);
	}
}