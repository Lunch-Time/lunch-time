using Dinner.Mail.Models;

namespace Dinner.Mail.Interfaces
{
    public interface IEmailSender
    {
        void Send(Email email);
    }
}