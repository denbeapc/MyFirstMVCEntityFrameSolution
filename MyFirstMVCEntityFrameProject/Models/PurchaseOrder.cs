using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFirstMVCEntityFrameProject.Models {
    public class PurchaseOrder {
        public int ID { get; set; }

        public int PurchaseRequestID { get; set; }
        public virtual PurchaseRequest PurchaseRequest { get; set; }

        public int ProductID { get; set; }
        public virtual Product Product { get; set; }

        public int Quantity { get; set; }
    }
}