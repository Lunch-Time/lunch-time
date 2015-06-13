namespace Dinner.Entities
{
    using System.Collections.Generic;

    public class UserOrdersModel
    {
        public int OrderID { get; set; }

        public int UserID { get; set; }

        public string UserIdentityNumber { get; set; }

        public string UserName { get; set; }

        public bool IsPurchased { get; set; }

        public IList<OrderedMenuModel> Orders { get; set; }
    }
}