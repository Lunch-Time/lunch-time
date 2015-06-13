using System;
using System.Collections.Generic;
using Dinner.Entities;

namespace Dinner.Models.Orders
{
    public class ReportOrdersModel
    {
        public DateTime Date { get; set; }

        public double TotalPurchasedSum { get; set; }

        public double TotalResidueSum { get; set; }

        public IEnumerable<UserOrdersModel> UsersOrders { get; set; }

        public IEnumerable<ReportOrderedItemModel> OrderedItems { get; set; }
    }
}