namespace Dinner.Entities.Order
{
    public class ChangeOrderItemBoxindexResult
    {
        public int NewID { get; set; }
        public float NewQuantity { get; set; }
        public int OldID { get; set; }
        public float OldQuantity { get; set; }
    }
}
