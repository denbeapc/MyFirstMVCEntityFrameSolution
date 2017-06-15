namespace MyFirstMVCEntityFrameProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedProducts : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Products", "Photopath", c => c.String(maxLength: 255));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Products", "Photopath", c => c.String(nullable: false, maxLength: 255));
        }
    }
}
