//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Dinner.Storage.Repository
{
    using System;
    
    public partial class p_UserOrder_GetByID_Result
    {
        public int OrderID { get; set; }
        public int MenuID { get; set; }
        public int CourseID { get; set; }
        public int CompanyID { get; set; }
        public int CourseCategoryID { get; set; }
        public int UserID { get; set; }
        public System.DateTime OrderDate { get; set; }
        public Nullable<System.TimeSpan> OrderTime { get; set; }
        public int OrderItemID { get; set; }
        public decimal Quantity { get; set; }
        public short Boxindex { get; set; }
        public string CourseCategoryName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public System.DateTime Date { get; set; }
        public bool IsPurchased { get; set; }
        public string Weight { get; set; }
    }
}
