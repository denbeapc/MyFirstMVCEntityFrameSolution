angular
	.module('PrsApp')
	.controller('PurchaseOrderCtrl', PurchaseOrderCtrl);

PurchaseOrderCtrl.$inject = ["$routeParams", "$location", 'SystemSvc', 'PurchaseRequestLineItemSvc', 'VendorSvc'];

function PurchaseOrderCtrl($routeParams, $location, SystemSvc, PurchaseRequestLineItemSvc, VendorSvc) {
	var self = this;

	self.AdminRights = SystemSvc.GetAdminRights();
	self.SelectedVendorId = $routeParams.id;
	self.PageTitle = "Purchase Order";

	self.CreatePoForVendor = function(id) {
		self.PO = {};
		self.PO.Customer = SystemSvc.GetActiveUser();
		VendorSvc.Get(id).then(
			function(resp) {
				self.PO.Vendor = resp.data;
			},
			function(err) {
				console.error(err);
			}
		);
		
		VendorSvc.CreatePurchaseOrder(id).then(
				function(resp) {
					var purchaseRequestLineItemsForVendor = resp.data.purchaseOrder;
					// self.PO.LineItems = resp.data.poLines; TODO Migrate the rest of Accumulate... to Server side
					self.PO.Cost = resp.data.poCosts;
					AccumulateProductQuantityAmounts(purchaseRequestLineItemsForVendor);
				},
				function(err) {
					console.error(err);
				}
			);
	};
	self.CreatePoForVendor(self.SelectedVendorId);

	var AccumulateProductQuantityAmounts = function(purchaseRequestLineItems) {
		var tempPrLines = {}
		for(var idx in purchaseRequestLineItems) {
			var productId = purchaseRequestLineItems[idx].ProductID;
			var productName = purchaseRequestLineItems[idx].Product.Name;
			var quantity = purchaseRequestLineItems[idx].Quantity;
			if(typeof tempPrLines[productName] === 'undefined') {
				tempPrLines[productName] = {};
				tempPrLines[productName]['Quantity'] = quantity;
				tempPrLines[productName]['PurchaseRequestLineItem'] = purchaseRequestLineItems[idx];
			} else {
				tempPrLines[productName]['Quantity'] += quantity;
			}
		}

		// normalize the purchase request line item object
		self.PO.LineItems = [];
		var keys = Object.keys(tempPrLines);
		for(var key of keys) {
			var prln = tempPrLines[key];
			var poLine = {
				Product: prln.PurchaseRequestLineItem.Product.Name,
				Quantity: prln.Quantity,
				Price: prln.PurchaseRequestLineItem.Product.Price * .7,
				LineTotal: prln.Quantity * prln.PurchaseRequestLineItem.Product.Price * .7
			};
			self.PO.LineItems.push(poLine);
		}
	}

};