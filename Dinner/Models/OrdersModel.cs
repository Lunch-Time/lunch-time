namespace Dinner.Models
{
    using System;
    using System.Collections.Generic;

    using Dinner.Entities;

    public class OrdersModel
    {
        public DateTime Date { get; set; }

        public IEnumerable<UserOrdersModel> UsersOrders { get; set; }

        public IEnumerable<OrderedMenuModel> Orders { get; set; }
    }
}