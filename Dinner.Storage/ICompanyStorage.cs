using Dinner.Entities.Company;

namespace Dinner.Storage
{
    public interface ICompanyStorage
    {
        CompanySettingsModel GetSettings(int companyID);
        void SetSettings(CompanySettingsModel settings);
    }
}
