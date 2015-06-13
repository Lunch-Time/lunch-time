using Dinner.Mail.Models;

namespace Dinner.Mail.Interfaces
{
    public interface IEmailSystem
    {
        void SendMail(BaseTemplateModel model);
    }
}