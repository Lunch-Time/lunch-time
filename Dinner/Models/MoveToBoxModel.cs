namespace Dinner.Models
{
    using System;

    public class MoveToBoxModel
    {
        public int OrderId { get; set; }
        public short Box { get; set; }
        public float Quantity { get; set; }
        public DateTime Date { get; set; }
    }
}