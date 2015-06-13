using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

using Dinner.Mail.Interfaces;

namespace Dinner.Mail.Impl
{
    public abstract class EmailTemplate : IEmailTemplate
    {
        private readonly StringBuilder buffer;

        [DebuggerStepThrough]
        protected EmailTemplate()
        {
            To = new List<string>();
            ReplyTo = new List<string>();
            CC = new List<string>();
            Bcc = new List<string>();
            Headers = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            buffer = new StringBuilder();
        }

        public string From { get; set; }

        public string Sender { get; set; }

        public ICollection<string> To { get; private set; }

        public ICollection<string> ReplyTo { get; private set; }

        public ICollection<string> CC { get; private set; }

        public ICollection<string> Bcc { get; private set; }

        public IDictionary<string, string> Headers { get; private set; }

        public string Subject { get; set; }

        public string Body
        {
            get { return buffer.ToString(); }
        }

        protected dynamic Model { get; private set; }

        public void SetModel(dynamic model)
        {
            Model = model;
        }

        public abstract void Execute();

        public virtual void Write(object value)
        {
            WriteLiteral(value);
        }

        public virtual void WriteLiteral(object value)
        {
            buffer.Append(value);
        }

        public virtual void WriteAttribute(
            string attr,
            Tuple<string, int> token1,
            Tuple<string, int> token2,
            Tuple<Tuple<string, int>, Tuple<object, int>, bool> token3)
        {
            object value = token3 != null ? token3.Item2.Item1 : string.Empty;
            string output = token1.Item1 + value + token2.Item1;
            buffer.Append(output);
        }

        ////public virtual void WriteAttribute(
        ////    string attr,
        ////    Tuple<string, int> token1,
        ////    Tuple<string, int> token2,
        ////    Tuple<Tuple<string, int>, Tuple<string, int>, bool> token3,
        ////    dynamic d)
        ////{
        ////    object value = token3 != null ? token3.Item2.Item1 : string.Empty;
        ////    string output = token1.Item1 + value + token2.Item1;
        ////    buffer.Append(output);
        ////}
    }
}