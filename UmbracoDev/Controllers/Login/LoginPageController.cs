using System.Web.Mvc;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;

namespace UmbracoDev.Controllers.Login
{
    public class LoginPageController : RenderMvcController
    {
        public override ActionResult Index(ContentModel content)
        {
            var model = new LoginPageModel();

            return CurrentTemplate(model);
        }
    }
}