using System;

namespace Dinner.Mail.Models
{
    public abstract class BaseTemplateModel
    {
        // public string From { get; set; }

        public string To { get; set; }

        public virtual EmailTemplateType TemplateName { get; internal set; }
    }
}