namespace Dinner.Helpers
{
    using System;
    using System.IO;
    using System.Web.Mvc;

    /// <summary>
    /// The script tag.
    /// </summary>
    public class ScriptTag : IDisposable
    {
        private readonly TextWriter writer;

        private readonly TagBuilder builder;

        /// <summary>
        /// Initializes a new instance of the <see cref="ScriptTag"/> class.
        /// </summary>
        /// <param name="helper">
        /// The helper.
        /// </param>
        /// <param name="type">
        /// The type.
        /// </param>
        /// <param name="id">
        /// The id.
        /// </param>
        public ScriptTag(HtmlHelper helper, string type, string id)
        {
            this.writer = helper.ViewContext.Writer;
            this.builder = new TagBuilder("script");
            this.builder.MergeAttribute("type", type);
            this.builder.MergeAttribute("id", id);
            this.writer.WriteLine(this.builder.ToString(TagRenderMode.StartTag));
        }

        /// <summary>
        /// The dispose.
        /// </summary>
        public void Dispose()
        {
            this.writer.WriteLine(this.builder.ToString(TagRenderMode.EndTag));
        }
    }
}