using UmbracoDev.Core.Enums;
using UmbracoDev.Core.Extensions;
using UmbracoDev.Core.Helpers;

namespace UmbracoDev.DocumentTypes
{
    public partial class BasePage
    {
        public string MetaTitleOrDefault => MetaTitle.IfBlank(Name);
        public SitemapDisplay XmlSitemapDisplayType => EnumHelper<SitemapDisplay>.GetValueFromName(XmlSitemapDisplay);
        public SitemapDisplay UserSitemapDisplayType => EnumHelper<SitemapDisplay>.GetValueFromName(UserSitemapDisplay);
    }
}
