using Dinner.Entities.Company;

namespace Dinner.Services
{
    public interface ICompanyService
    {
        CompanySettingsModel GetSettings(int companyID);
        void SetSettings(CompanySettingsModel settings);
    }
}
