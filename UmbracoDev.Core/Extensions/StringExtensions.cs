using Umbraco.Core;

namespace UmbracoDev.Core.Extensions
{
    public static class StringExtensions
    {
        public static string IfBlank(this string str, string replace)
        {
            return str.IsNullOrWhiteSpace() ? replace : str;
        }

        public static string ToCamelCase(this string str)
        {
            if (!string.IsNullOrEmpty(str) && str.Length > 1)
            {
                return char.ToLowerInvariant(str[0]) + str.Substring(1);
            }
            return str;
        }

        public static bool EqualsIgnoreCase(this string str, string compare)
        {
            return str != null && str.ToLower().Equals(compare.ToLower());
        }

        public static bool IsNotNullOrWhitespace(this string str)
        {
            return !str.IsNullOrWhiteSpace();
        }
    }
}
