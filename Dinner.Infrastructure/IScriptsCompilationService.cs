namespace Dinner.Infrastructure
{
    using System.Collections.Generic;

    public interface IScriptsCompilationService
    {
        void Compile(string serverPath, string scriptsPath, IEnumerable<string> requiredScriptsPaths, string buildScriptName, string compiledScriptName, bool includeMap);
    }
}