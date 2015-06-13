namespace Dinner.Mail.Interfaces
{
    public interface IEmailTemplateContentReader
    {
        string Read(string templateName, string suffix);
    }
}