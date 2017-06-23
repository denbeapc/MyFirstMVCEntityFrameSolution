using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyFirstMVCEntityFrameProject.Models
{
    public class MyFirstMVCEntityFrameProjectContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        // ("name= ... ") is the connection string found in Web.config
        public MyFirstMVCEntityFrameProjectContext() : base("name=MyFirstMVCEntityFrameProjectContext")
        {
        }

        public System.Data.Entity.DbSet<MyFirstMVCEntityFrameProject.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<MyFirstMVCEntityFrameProject.Models.Vendor> Vendors { get; set; }

        public System.Data.Entity.DbSet<MyFirstMVCEntityFrameProject.Models.Product> Products { get; set; }

        public System.Data.Entity.DbSet<MyFirstMVCEntityFrameProject.Models.PurchaseRequest> PurchaseRequests { get; set; }

        public System.Data.Entity.DbSet<MyFirstMVCEntityFrameProject.Models.PurchaseRequestLineItem> PurchaseRequestLineItems { get; set; }
    }
}
