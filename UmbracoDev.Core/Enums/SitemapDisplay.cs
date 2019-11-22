using System.ComponentModel.DataAnnotations;

namespace UmbracoDev.Core.Enums
{
    public enum SitemapDisplay
    {
        Include = 0,
        [Display(Name = "Exclude Self")]
        ExcludeSelf = 1,
        [Display(Name = "Exclude Self and Children")]
        ExcludeSelfAndChildren = 2,
    }
}
