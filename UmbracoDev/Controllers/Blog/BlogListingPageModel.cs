using System.Collections.Generic;
using UmbracoDev.DocumentTypes;
using UmbracoDev.Models;

namespace UmbracoDev.Controllers.Blog
{
    public class BlogListingPageModel : BaseRenderModel<BlogListingPage>
    {
        public List<BlogPostPage> BlogPosts { get; set; }
        public List<BlogCategory> BlogCategories { get; set; }
    }
}