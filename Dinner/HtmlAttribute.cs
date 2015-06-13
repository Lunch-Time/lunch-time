namespace System.Web.Mvc
{
    public static class Extensions
    {
        public static HtmlAttribute Css(this HtmlHelper html, string value)
        {
            return Css(html, value, true);
        }

        public static HtmlAttribute Css(this HtmlHelper html, string value, bool condition)
        {
            return new HtmlAttribute("class", " ").Add(value, condition);
        }

        public static HtmlAttribute Attr(this HtmlHelper html, string name, string value)
        {
            return Attr(html, name, value, true);
        }

        public static HtmlAttribute Attr(this HtmlHelper html, string name, string value, bool condition)
        {
            return Attr(html, name, null, value, condition);
        }

        public static HtmlAttribute Attr(this HtmlHelper html, string name, string seperator, string value, bool condition)
        {
            return new HtmlAttribute(name, seperator).Add(value, condition);
        }
    }

    public class HtmlAttribute : IHtmlString
    {
        /// <summary>
        /// The separator.
        /// </summary>
        private readonly string separator;

        /// <summary>
        /// The internal value.
        /// </summary>
        private string internalValue = string.Empty;

        /// <summary>
        /// Initializes a new instance of the <see cref="HtmlAttribute"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        public HtmlAttribute(string name)
            : this(name, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HtmlAttribute"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="separator">The separator.</param>
        public HtmlAttribute(string name, string separator)
        {
            this.Name = name;
            this.separator = separator ?? " ";
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Adds the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>The attribute.</returns>
        public HtmlAttribute Add(string value)
        {
            return this.Add(value, true);
        }

        /// <summary>
        /// Adds the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="condition">if set to <c>true</c> [condition].</param>
        /// <returns>The attribute.</returns>
        public HtmlAttribute Add(string value, bool condition)
        {
            if (!string.IsNullOrWhiteSpace(value) && condition)
            {
                this.internalValue += value + this.separator;
            }

            return this;
        }

        /// <inheritdoc />
        public string ToHtmlString()
        {
            string value = string.Empty;

            if (!string.IsNullOrWhiteSpace(this.internalValue))
            {
                value = string.Format(
                    "{0}=\"{1}\"",
                    this.Name,
                    this.internalValue.Substring(0, this.internalValue.Length - this.separator.Length));
            }

            return value;
        }
    }
}