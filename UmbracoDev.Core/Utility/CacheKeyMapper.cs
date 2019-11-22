using System.Collections.Generic;
using UmbracoDev.Core.Enums;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Core.Utility
{
    public static class CacheKeyMapper
    {
        /// <summary>
        /// Simple cache key mapper to easily map document types to an enum
        /// </summary>
        public static Dictionary<string, CacheKey> CacheKeyMaps = new Dictionary<string, CacheKey>() {
            { BlogPostPage.ModelTypeAlias, CacheKey.BlogPosts },
            { BlogCategory.ModelTypeAlias, CacheKey.BlogCategories },
        };
    }
}
