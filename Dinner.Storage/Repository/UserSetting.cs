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
    
    public partial class UserSetting
    {
        public int UserID { get; set; }
        public Nullable<System.TimeSpan> Time { get; set; }
        public bool SendAdminNotification { get; set; }
        public bool SendChangedOrderNotification { get; set; }
        public bool SendWeeklyNotification { get; set; }
        public bool SendDailyNotification { get; set; }
    
        public virtual User User { get; set; }
    }
}
