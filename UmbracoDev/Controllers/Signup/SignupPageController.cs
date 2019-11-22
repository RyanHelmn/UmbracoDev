using System.Web.Mvc;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;

namespace UmbracoDev.Controllers.Signup
{
    public class SignupPageController : RenderMvcController
    {
        public override ActionResult Index(ContentModel content)
        {
            var model = new SignupPageModel();

            return CurrentTemplate(model);
        }
    }
}