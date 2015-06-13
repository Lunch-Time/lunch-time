namespace Dinner.Models
{
    using System;
    using System.Collections.Generic;

    using Dinner.Entities;

    public class UserTimingsModel
    {
        public DateTime Date { get; set; }
        public bool IsFreezed { get; set; }
        public IEnumerable<TimingModel> Timings { get; set; }
        public TimeSpan? DinnerTime { get; set; }
    }
}