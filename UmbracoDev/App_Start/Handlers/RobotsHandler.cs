using System;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web;
using Umbraco.Web.Composing;
using UmbracoDev.Core.Enums;
using UmbracoDev.Core.Extensions;
using UmbracoDev.Core.Helpers;

namespace UmbracoDev.Handlers
{
    public class RobotsHandler : IHttpHandler
    {
        private readonly IUmbracoContextFactory _umbracoContextFactory = DependencyResolver.Current.GetService<IUmbracoContextFactory>();

        public bool IsReusable => true;

        public void ProcessRequest(HttpContext context)
        {
            using (var cref = _umbracoContextFactory.EnsureUmbracoContext())
            {
                if (WebConfigHelper.GetCurrentEnvironment() != CurrentEnvironment.Production)
                {
                    context.Response.Write("UserAgent: *" + Environment.NewLine + "Disallow /");
                }
                else
                {
                    context.Response.Write(Current.UmbracoHelper.Settings().Robots);
                }
            }
        }
    }
}