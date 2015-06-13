namespace Dinner.Infrastructure
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;

    using Dinner.Infrastructure.Log;
    using Dinner.Infrastructure.Settings;

    public class ScriptsCompilationService : IScriptsCompilationService
    {
        /// <summary>
        /// The tools folder key.
        /// </summary>
        private const string ToolsFolderKey = "ToolsFolder";

        /// <summary>
        /// The settings.
        /// </summary>
        private readonly ISettings settings;

        /// <summary>
        /// The event log.
        /// </summary>
        private readonly IEventLog eventLog;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:System.Object" /> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        /// <param name="eventLog">The event log.</param>
        public ScriptsCompilationService(ISettings settings, IEventLog eventLog)
        {
            this.settings = settings;
            this.eventLog = eventLog;
        }

        public void Compile(string serverPath, string scriptsPath, IEnumerable<string> requiredScriptsPaths, string buildScriptName, string compiledScriptName, bool includeMap)
        {
            var serverScriptsPath = Path.Combine(serverPath, scriptsPath);

            var tempDirectory = this.CreateTempDirectory();
            var tempScriptsPath = Path.Combine(tempDirectory.FullName, scriptsPath);

            //var scriptsDirectory = new DirectoryInfo(serverScriptsPath);
            var tempScriptsDirectory = new DirectoryInfo(tempScriptsPath);
            //this.CopyDirectory(scriptsDirectory, tempScriptsDirectory);

            var allScriptsPaths = new List<string>();
            allScriptsPaths.Add(scriptsPath);
            allScriptsPaths.AddRange(requiredScriptsPaths);
            this.CopyScripts(tempDirectory, serverPath, allScriptsPaths);

            this.RunRjs(serverPath, tempScriptsDirectory.FullName, buildScriptName);

            this.CopyCompiledScriptToServer(tempScriptsPath, serverScriptsPath, compiledScriptName, includeMap);

            this.Cleanup(tempDirectory);
        }

        private void CopyScripts(DirectoryInfo tempDirectory, string serverPath, IEnumerable<string> scriptsPaths)
        {
            foreach (var scriptPath in scriptsPaths)
            {
                var tempScriptsPath = Path.Combine(tempDirectory.FullName, scriptPath);
                var tempScriptsDirectory = new DirectoryInfo(tempScriptsPath);

                var serverScriptsPath = Path.Combine(serverPath, scriptPath);
                var scriptsDirectory = new DirectoryInfo(serverScriptsPath);

                this.CopyDirectory(scriptsDirectory, tempScriptsDirectory);
            }            
        }

        private void RunRjs(string serverPath, string scriptsPath, string buildScriptName)
        {
            var toolsFolder = this.settings.GetValue<string>(ToolsFolderKey);

            var toolsPath = Path.Combine(serverPath, toolsFolder);
            var nodeExe = Path.Combine(toolsPath, "node.exe");
            var rjs = Path.Combine(toolsPath, "r.js");

            var buildScriptPath = Path.Combine(scriptsPath, buildScriptName);

            var arguments = string.Format("{0} -o {1}", rjs, buildScriptPath);

            var startInfo = new ProcessStartInfo
                   {
                       CreateNoWindow = false,
                       UseShellExecute = false,
                       RedirectStandardOutput = true,
                       RedirectStandardError = true,
                       FileName = nodeExe,
                       Arguments = arguments,
                       WindowStyle = ProcessWindowStyle.Hidden
                   };
            var process = Process.Start(startInfo);

            var standardOutput = process.StandardOutput.ReadToEnd();
            Console.WriteLine(standardOutput);
            
            var standardErrorOutput = process.StandardError.ReadToEnd();
            process.WaitForExit();

            if (!string.IsNullOrEmpty(standardErrorOutput))
            {
                throw new Exception(standardErrorOutput);
            }
        }

        private void CopyCompiledScriptToServer(
            string tempScriptsPath,
            string serverScriptsPath,
            string compiledScriptName,
            bool includeMap)
        {
            var compiledScriptPath = Path.Combine(tempScriptsPath, compiledScriptName);
            var targetPath = Path.Combine(serverScriptsPath, compiledScriptName);

            var compiledScriptFile = new FileInfo(compiledScriptPath);
            compiledScriptFile.CopyTo(targetPath, true);

            if (includeMap)
            {
                this.CopyCompiledScriptToServer(
                    tempScriptsPath,
                    serverScriptsPath,
                    compiledScriptName + ".map",
                    false);
            }
        }

        private void Cleanup(DirectoryInfo tempDirectory)
        {
            try
            {
                tempDirectory.Delete(true);
            }
            catch (Exception e)
            {
                this.eventLog.Log(EventLogType.Warning, "Could not clean up temp directory", e);
            }
        }

        private DirectoryInfo CreateTempDirectory()
        {
            var tempPath = Path.GetTempPath();

            tempPath = Path.Combine(tempPath, DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss"));
            var tempDirectory = Directory.CreateDirectory(tempPath);

            return tempDirectory;
        }

        private void CopyDirectory(DirectoryInfo sourceDirectory, DirectoryInfo targetDirectory)
        {
            // Check if the target directory exists, if not, create it.
            if (Directory.Exists(targetDirectory.FullName) == false)
            {
                Directory.CreateDirectory(targetDirectory.FullName);
            }

            // Copy each file into it's new directory.
            foreach (var file in sourceDirectory.GetFiles())
            {
                file.CopyTo(Path.Combine(targetDirectory.ToString(), file.Name), true);
            }

            // Copy each subdirectory using recursion.
            foreach (var sourceSubDirectory in sourceDirectory.GetDirectories())
            {
                var targetSubDirectory =
                    targetDirectory.CreateSubdirectory(sourceSubDirectory.Name);

                this.CopyDirectory(sourceSubDirectory, targetSubDirectory);
            }
        }
    }
}