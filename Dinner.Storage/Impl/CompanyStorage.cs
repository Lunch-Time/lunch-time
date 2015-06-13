using System.Linq;

using Dinner.Entities.Company;
using Dinner.Entities.Exceptions;
using Dinner.Storage.Repository;

namespace Dinner.Storage.Impl
{
    internal class CompanyStorage : ICompanyStorage
    {
        private readonly IDataContextFactory dataContextFactory;

        public CompanyStorage(IDataContextFactory dataContextFactory)
        {
            this.dataContextFactory = dataContextFactory;
        }

        public CompanySettingsModel GetSettings(int companyID)
        {
            CompanySettingsModel model = null;
            using (var dataContext = this.dataContextFactory.Create())
            {
                var companySettings = dataContext.CompanySettings.FirstOrDefault(x => x.CompanyID == companyID);
                if (companySettings == null)
                {
                    throw new CompanySettingsNotFoundException(companyID);
                }

                model = new CompanySettingsModel()
                {
                    CompanyID = companyID,
                    ShowMenuWithDescription = companySettings.ShowMenuWithDescription,
                    ShowMenuWithImages = companySettings.ShowMenuWithImages,
                    ShowMenuWithWeight = companySettings.ShowMenuWithWeight
                };
            }
            return model;
        }

        public void SetSettings(CompanySettingsModel settings)
        {
            using (var dataContext = this.dataContextFactory.Create())
            {
                var companySettings = dataContext.CompanySettings.FirstOrDefault(x => x.CompanyID == settings.CompanyID);
                if (companySettings == null)
                {
                    throw new CompanySettingsNotFoundException(settings.CompanyID);
                }

                companySettings.ShowMenuWithDescription = settings.ShowMenuWithDescription;
                companySettings.ShowMenuWithImages = settings.ShowMenuWithImages;
                companySettings.ShowMenuWithWeight = settings.ShowMenuWithWeight;

                dataContext.SaveChanges();
            }
        }
    }
}
