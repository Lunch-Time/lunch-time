namespace Dinner.Models
{
    using System;

    /// <summary>
    /// Purchase Order View Model.
    /// </summary>
    public class PurchaseOrderViewModel
    {
        /// <summary>
        /// Gets or sets the order identifier.
        /// </summary>
        /// <value>
        /// The order identifier.
        /// </value>
        public int OrderId { get; set; }

        /// <summary>
        /// Gets or sets the purchase time.
        /// </summary>
        /// <value>
        /// The purchase time.
        /// </value>
        public DateTime PurchaseTime { get; set; }
    }
}