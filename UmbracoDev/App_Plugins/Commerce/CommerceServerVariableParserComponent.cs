using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Umbraco.Core.Composing;
using Umbraco.Web;
using Umbraco.Web.JavaScript;
using UmbracoDev.App_Plugins.Commerce.Controllers;

namespace UmbracoDev.App_Plugins.Commerce
{
    public class CommerceServerVariableParserComponent : IComponent
    {
        public void Initialize()
        {
            ServerVariablesParser.Parsing += ServerVariablesParser_Parsing;
        }

        public void Terminate()
        {
        }

        private static void ServerVariablesParser_Parsing(object sender, Dictionary<string, object> e)
        {
            if (HttpContext.Current == null) return;
            var urlHelper =
                new UrlHelper(new RequestContext(new HttpContextWrapper(HttpContext.Current), new RouteData()));

            if (!e.Keys.Contains(CommerceConstants.Section))
                e.Add(CommerceConstants.Section, new Dictionary<string, object>
                {
                    {
                        "baseApiUrl",
                        urlHelper.GetUmbracoApiServiceBaseUrl<CommerceApiController>(controller =>
                            controller.GetAllProducts())
                    }
                });
        }
    }
}