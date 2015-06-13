namespace Dinner
{
    using System.Web;
    using System.Web.Mvc;

    using Dinner.Infrastructure;

    public class RequireJsConfig
    {
        private const string LibsBuild = "libs.build.js";
        private const string LibsMin = "libs.min.js";
        private const string LibsPath = @"Scripts\Libs";

        private const string ApplicationBuild = "application.build.js";
        private const string ApplicationMin = "LunchTime.min.js";
        private const string ApplicationPath = @"Scripts\LunchTime";
        private const string FrameworkPath = @"Scripts\Framework";


        public static void Register()
        {
            var scriptsCompilationService = (IScriptsCompilationService)DependencyResolver.Current.GetService(typeof(IScriptsCompilationService));

            var serverPath = HttpContext.Current.Server.MapPath("~/");
            
            scriptsCompilationService.Compile(serverPath, LibsPath, new string[0], LibsBuild, LibsMin, false);
            scriptsCompilationService.Compile(serverPath, ApplicationPath, new[] { LibsPath, FrameworkPath }, ApplicationBuild, ApplicationMin, true);
        }
    }
}