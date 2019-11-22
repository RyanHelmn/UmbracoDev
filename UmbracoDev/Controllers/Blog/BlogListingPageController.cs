using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;
using UmbracoDev.Core.Enums;
using UmbracoDev.Core.Helpers;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Controllers.Blog
{
    public class BlogListingPageController : RenderMvcController
    {
        public override ActionResult Index(ContentModel content)
        {
            var model = new BlogListingPageModel
            {
                BlogPosts = CacheHelper.GetOrStore(CacheKey.BlogPosts.ToString(), DateTime.Now.AddDays(1).Minute,
                    () => content.Content.Children.OfType<BlogPostPage>().ToList()),
                BlogCategories = CacheHelper.GetOrStore(CacheKey.BlogCategories.ToString(),
                    DateTime.Now.AddDays(1).Minute,
                    () => CacheHelper.Get<List<BlogPostPage>>(CacheKey.BlogPosts.ToString())
                        .SelectMany(x => x.BlogCategories.OfType<BlogCategory>()).ToList())
            };

            return CurrentTemplate(model);
        }
    }
}