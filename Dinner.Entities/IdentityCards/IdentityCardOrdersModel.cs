using System.Runtime.Serialization;

namespace Dinner.Entities.IdentityCards
{
    public class IdentityCardOrdersModel
    {
        public IdentityCardOrderStatus Status { get; set; }

        public string CardHolderName { get; set; }

        public string CardHolderEmail { get; set; }

        public UserOrdersModel UserOrders { get; set; }
    }

    public enum IdentityCardOrderStatus
    {
        [EnumMember(Value = "CardNotFound")]
        CardNotFound = 0,

        [EnumMember(Value = "CardNotMapped")]
        CardNotMapped = 1,

        [EnumMember(Value = "OrderNotFound")]
        OrderNotFound = 2,

        [EnumMember(Value = "Success")]
        Success = 3
    }
}
