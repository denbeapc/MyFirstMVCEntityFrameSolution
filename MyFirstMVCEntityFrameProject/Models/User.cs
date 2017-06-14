using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyFirstMVCEntityFrameProject.Models {
    public class User {
        public int ID { get; set; }
        [Required]
        [MaxLength(20)]
        [Index("UserNameUniqueIndex", IsUnique = true)]
        public string UserName { get; set; }
        [Required]
        [MaxLength(10)]
        public string Password { get; set; }
        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }
        [MaxLength(12)]
        public string Phone { get; set; }
        [Required]
        [MaxLength(75)]
        public string Email { get; set; }
        public bool IsReviewer { get; set; }
        public bool IsAdmin { get; set; }


    }
}