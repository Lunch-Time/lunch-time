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
    using System.Collections.Generic;
    
    public partial class User
    {
        public User()
        {
            this.Orders = new HashSet<Order>();
            this.Feedbacks = new HashSet<Feedback>();
            this.MenuItemWishes = new HashSet<MenuItemWish>();
            this.IdentityCards = new HashSet<IdentityCard>();
        }
    
        public int ID { get; set; }
        public string Name { get; set; }
        public int RoleID { get; set; }
        public int CompanyID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public Nullable<System.TimeSpan> Time { get; set; }
        public string NewPassword { get; set; }
        public Nullable<bool> IsVerified { get; set; }
    
        public virtual Company Company { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual UserRole UserRole { get; set; }
        public virtual UserSetting UserSetting { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<MenuItemWish> MenuItemWishes { get; set; }
        public virtual ICollection<IdentityCard> IdentityCards { get; set; }
    }
}