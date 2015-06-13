using Dinner.Entities.Company;
using Dinner.Services.Security;
using Dinner.Storage;

namespace Dinner.Services.Impl
{
    using Dinner.Infrastructure.Security;

    internal class CompanyService : ICompanyService
    {
        private readonly IPrincipalProvider principalProvider;
        private readonly ICompanyStorage companyStorage;

        public CompanyService(
            IPrincipalProvider principalProvider, 
            ICompanyStorage companyStorage)
        {
            this.principalProvider = principalProvider;
            this.companyStorage = companyStorage;
        }

        public CompanySettingsModel GetSettings(int companyID)
        {
            return companyStorage.GetSettings(companyID);
        }

        public void SetSettings(CompanySettingsModel settings)
        {
            principalProvider.Principal.EnsureAdmin();
            companyStorage.SetSettings(settings);
        }
    }
}
