using Umbraco.Core;
using Umbraco.Core.Composing;
using Umbraco.Web;
using Umbraco.Web.Dashboards;
using UmbracoDev.Components;

namespace UmbracoDev
{
    public class CustomComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            // Dashboards
            composition.Dashboards().Remove<ContentDashboard>();

            // Components
            composition.Components().Append<BundleComponent>();
            composition.Components().Append<SavingEventComponent>();
        }
    }
}