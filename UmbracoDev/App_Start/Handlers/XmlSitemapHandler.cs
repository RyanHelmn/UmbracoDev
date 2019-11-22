using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using Umbraco.Web;
using Umbraco.Web.Composing;
using UmbracoDev.Core.Enums;
using UmbracoDev.Core.Extensions;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Handlers
{
    public class XmlSitemapHandler : IHttpHandler
    {
        private readonly IUmbracoContextFactory _umbracoContextFactory = DependencyResolver.Current.GetService<IUmbracoContextFactory>();

        public bool IsReusable => true;

        public void ProcessRequest(HttpContext context)
        {
            using (_umbracoContextFactory.EnsureUmbracoContext())
            {
                var document = new XDocument()
                {
                    Declaration = new XDeclaration("1.0", "UTF-8", null)
                };

                var homePage = Current.UmbracoHelper.Website().FirstChild<HomePage>();
                WritePagesToSitemap(context, document, homePage);
            }
        }

        private static void WritePagesToSitemap(HttpContext context, XDocument document, HomePage homePage)
        {
            var nameSpace = XNamespace.Get("http://www.sitemaps.org/schemas/sitemap/0.9");
            var rootElement = new XElement(nameSpace + "urlset");

            foreach (var page in homePage.DescendantsOrSelf<BasePage>())
            {
                if (page.XmlSitemapDisplayType == SitemapDisplay.ExcludeSelf || page.AncestorsOrSelf<BasePage>().Any(x => x.XmlSitemapDisplayType == SitemapDisplay.ExcludeSelfAndChildren)) continue;
                var element = new XElement(nameSpace + "url");
                element.Add(new XElement(nameSpace + "loc", page.Url(mode: Umbraco.Core.Models.PublishedContent.UrlMode.Absolute)));
                element.Add(new XElement(nameSpace + "lastmod", page.UpdateDate.ToUniversalTime()));
                rootElement.Add(element);
            }

            document.Add(rootElement);

            context.Response.ContentType = "text/xml";
            context.Response.Write(document.ToString());
        }
    }
}