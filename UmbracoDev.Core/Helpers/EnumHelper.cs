using System;
using System.ComponentModel.DataAnnotations;
using UmbracoDev.Core.Extensions;

namespace UmbracoDev.Core.Helpers
{
    public static class EnumHelper<T>
    {
        public static T GetValueFromName(string name)
        {
            var type = typeof(T);
            if (!type.IsEnum) return default;

            foreach (var field in type.GetFields())
            {
                var attribute = Attribute.GetCustomAttribute(field, typeof(DisplayAttribute)) as DisplayAttribute;

                if (attribute != null)
                {
                    if (attribute.Name.EqualsIgnoreCase(name))
                    {
                        return (T)field.GetValue(null);
                    }
                }
                else
                {
                    if (field.Name.EqualsIgnoreCase(name))
                    {
                        return (T)field.GetValue(null);
                    }
                }
            }

            return default;
        }
    }
}
