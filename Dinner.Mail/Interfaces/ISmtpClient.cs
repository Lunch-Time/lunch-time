using System;
using System.Net.Mail;

namespace Dinner.Mail.Interfaces
{
    internal interface ISmtpClient : IDisposable
    {
        void Send(MailMessage message);
    }
}