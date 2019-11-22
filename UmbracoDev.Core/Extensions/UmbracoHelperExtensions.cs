using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Core.Extensions
{
    public static class UmbracoHelperExtensions
    {
        public static Website Website(this UmbracoHelper umbracoHelper) => GetCurrentWebsite(umbracoHelper);
        public static Settings Settings(this UmbracoHelper umbracoHelper) => umbracoHelper.SingleContentOfType<Settings>(umbracoHelper.Website().Id);
        public static SharedContent SharedContent(this UmbracoHelper umbracoHelper) => umbracoHelper.SingleContentOfType<SharedContent>(umbracoHelper.Website().Id);
        public static GlobalSharedContent GlobalSharedContent(this UmbracoHelper umbracoHelper) => umbracoHelper.ContentAtRoot().OfType<GlobalSharedContent>().FirstOrDefault();

        private static Website GetCurrentWebsite(UmbracoHelper umbracoHelper)
        {
            var websites = umbracoHelper.ContentAtRoot().OfType<Website>().ToList();
            if(websites.Count() == 1)
            {
                return websites.FirstOrDefault();
            }

            // TODO Return the assigned website based on current content
            return null;
        }

        /// <summary>
        /// Grabs the first descendant of the content type under the website
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="umbracoHelper"></param>
        /// <param name="websiteId"></param>
        /// <returns></returns>
        public static T SingleContentOfType<T>(this UmbracoHelper umbracoHelper, int websiteId) where T : class, IPublishedContent
        {
            return umbracoHelper.Content(websiteId).Descendants<T>().FirstOrDefault();
        }

        /// <summary>
        /// Grabs all of the descendents of the content type under the website
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="umbracoHelper"></param>
        /// <param name="websiteId"></param>
        /// <returns></returns>
        public static IEnumerable<T> ContentOfType<T>(this UmbracoHelper umbracoHelper, int websiteId) where T : class, IPublishedContent
        {
            return umbracoHelper.Content(websiteId).Descendants<T>();
        }
    }
}
