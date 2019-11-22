using ClientDependency.Core;
using Umbraco.Core.Composing;

namespace UmbracoDev.Components
{
    public class BundleComponent : IComponent
    {
        public BundleComponent() { }

        public void Initialize()
        {
            CreateBundles();
        }

        private static void CreateBundles()
        {
            BundleManager.CreateCssBundle("Css",
                new CssFile("~/assets/styles/css/bootstrap.css"));

            BundleManager.CreateJsBundle("Js",
                new JavascriptFile("~/assets/scripts/min/jquery-3.3.1.slim.min.js"),
                new JavascriptFile("~/assets/scripts/min/bootstrap.bundle.min.js"),
                new JavascriptFile("~/assets/scripts/min/vue.min.js"));
        }

        public void Terminate()
        {
        }
    }
}