using System.Collections.Generic;
using UmbracoDev.Core.Entities.Forum;
using Umbraco.Web.WebApi;

namespace UmbracoDev.App_Plugins.Forum.Controllers
{
    public class ForumApiController : UmbracoAuthorizedApiController
    {
        public List<Category> GetAllCategories()
        {
            return new List<Category>();
        }
    }
}