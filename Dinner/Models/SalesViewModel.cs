namespace Dinner.Models
{
    using System;
    using System.Collections.Generic;

    using Dinner.Entities;

    public class SalesViewModel
    {
        public DateTime Date { get; set; }

        public IEnumerable<UserOrdersModel> UsersOrders { get; set; }
    }
}