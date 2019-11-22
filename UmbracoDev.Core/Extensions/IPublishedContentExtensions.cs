using Umbraco.Core.Models.PublishedContent;

namespace UmbracoDev.Core.Extensions
{
    public static class IPublishedContentExtensions
    {
        public static T As<T>(this IPublishedContent publishedContent, T something) where T : class
        {
            return publishedContent as T;
        }
    }
}
