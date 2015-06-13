namespace Dinner.Entities.IdentityCards
{
    public class IdentityCardModel
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }

        public int? CustomerUserID { get; set; }
        public int CustomerCompanyID { get; set; }
        public string IdentityNumber { get; set; }
        public string PublicNumber { get; set; }
        public string CardHolderEmail { get; set; }
        public string CardHolderName { get; set; }
    }
}
