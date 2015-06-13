using System;

namespace Dinner.Entities.Exceptions
{
    public class CompanySettingsNotFoundException : Exception
    {
        public CompanySettingsNotFoundException(int companyID)
        {
            CompanyID = companyID;
        }

        public int CompanyID { get; private set; }
    }
}
