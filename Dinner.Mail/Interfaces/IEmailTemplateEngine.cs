using Dinner.Mail.Models;

namespace Dinner.Mail.Interfaces
{
    public interface IEmailTemplateEngine
    {
        Email Execute(string templateName, object model = null);
    }
}