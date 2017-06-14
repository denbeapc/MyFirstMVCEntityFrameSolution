using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyFirstMVCEntityFrameProject.Models {
    public class Product {
        public int ID { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        [MaxLength(50)]
        public string VendorPartNumber { get; set; }
        [Range(0, 1000)]
        public decimal Price { get; set; }
        [Required]
        [MaxLength(10)]
        public string Unit { get; set; }
        [Required]
        [MaxLength(255)]
        public string Photopath { get; set; }

        public int VendorID { get; set; }
        public virtual Vendor Vendor { get; set; }
    }
}