using System.Collections.Generic;
using System.Linq;

namespace UmbracoDev.Core.Extensions
{
    public static class IEnumerableExtensions
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> items)
        {
            return items == null && !items.Any();
        }

        public static bool IsNotNullOrEmpty<T>(this IEnumerable<T> items)
        {
            return !items.IsNullOrEmpty();
        }
    }
}
