using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyFirstMVCEntityFrameProject.Models {
    public class Vendor {
        public int ID { get; set; }
        [Required]
        [MaxLength(10)]
        [Index("VendorCodeUniqueIndex", IsUnique = true)]
        public string Code { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string Address { get; set; }
        [Required]
        [MaxLength(255)]
        public string City { get; set; }
        [Required]
        [MaxLength(2)]
        public string State { get; set; }
        [Required]
        [MaxLength(5)]
        public string Zip { get; set; }
        [MaxLength(12)]
        public string Phone { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
        public bool IsRecommended { get; set; }
    }
}