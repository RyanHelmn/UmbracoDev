using System;
using Umbraco.Core.Composing;
using Umbraco.Core.Dashboards;

namespace UmbracoDev.App_Plugins.Dashboards.Redirects
{
    [Weight(0)]
    public class RedirectsDashboard : IDashboard
    {
        public string[] Sections => new[] {"content"};

        public IAccessRule[] AccessRules => Array.Empty<IAccessRule>();

        public string Alias => RedirectsDashboardConstants.Alias;

        public string View => RedirectsDashboardConstants.View;
    }
}