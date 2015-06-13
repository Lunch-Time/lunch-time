namespace Dinner.Models
{
    public class StatisticRecordsGroup
    {
        public Record[] Records { get; set; }

        public string GroupName { get; set; }
        
        public int MaxYAxisValue { get; set; }
        
        public struct Record
        {
            public string Title;
            public float Value;
            public string CategoryName;
        }
    }
}