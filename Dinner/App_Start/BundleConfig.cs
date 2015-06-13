using System.Web;
using System.Web.Optimization;

namespace Dinner
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            // without that, scripts from subdirectories are not included on page.
            // https://thedevstop.wordpress.com/2013/10/27/scriptbundle-subdirectories-no-longer-work-in-microsoft-web-optimization-1-1-0-when-optimizations-are-off/
            BundleTable.EnableOptimizations = true;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-migrate-1.2.1.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryform").Include(
            "~/Scripts/jquery.form.js"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
            "~/Scripts/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/chart").Include("~/Scripts/chart.js"));

            bundles.Add(new ScriptBundle("~/bundles/datepicker")
                .Include("~/Scripts/picker.js")
                .Include("~/Scripts/picker.date.js"));

            bundles.Add(new ScriptBundle("~/bundles/statistics")
                            .Include("~/Scripts/jqPlot/jquery.jqplot.min.js")
                            .Include("~/Scripts/jqPlot/jqplot.barRenderer.min.js")
                            .Include("~/Scripts/jqPlot/jqplot.canvasTextRenderer.min.js")
                            .Include("~/Scripts/jqPlot/jqplot.canvasAxisLabelRenderer.min.js")
                            .Include("~/Scripts/jqPlot/jqplot.canvasAxisTickRenderer.min.js")
                            .Include("~/Scripts/jqPlot/jqplot.categoryAxisRenderer.min.js")
                            .Include("~/Scripts/jqPlot/jqplot.highlighter.min.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(
                new StyleBundle("~/Content/css/dinner")
                    .Include("~/Content/css/dinner.css")
                    .Include("~/Content/css/bootstrap.css")
                    .Include("~/Content/css/toastr.css")
                    .Include("~/Content/css/user-orders-page.css")
                    .Include("~/Content/css/datepicker.classic.css")
                    .Include("~/Content/css/datepicker.classic.date.css")
                    .Include("~/Content/css/datepicker.classic.time.css")
                    .Include("~/Content/css/jquery.jqplot.min.css")
                    .Include("~/Content/css/ladda-themeless.css")
                    .Include("~/Content/css/glisse.css"));
            
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
        }
    }
}