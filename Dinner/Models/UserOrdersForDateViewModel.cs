namespace Dinner.Models
{
    using System;
    using System.Collections.Generic;

    using Dinner.Entities;

    public class UserOrdersForDateViewModel
    {
        public int OrderID { get; set; }

        public DateTime Date { get; set; }

        public bool IsFreezed { get; set; }

        public bool IsPurchased { get; set; }

        public IList<OrderedMenuModel> Orders { get; set; }
    }
}