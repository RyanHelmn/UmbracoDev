using System.Web.Mvc;
using UmbracoDev.Core.Extensions;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Controllers.Login
{
    public class LoginSurfaceController : BaseSurfaceController
    {
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginPageModel model)
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }

            if (Members.GetByEmail(model.Email) == null)
            {
                ModelState.AddModelError("Login", "User does not exist, please try again.");
                return CurrentUmbracoPage();
            }

            if (Members.Login(model.Email, model.Password))
            {
                return RedirectToUmbracoPage(Umbraco.SingleContentOfType<ExtranetPage>(Umbraco.Website().Id));
            }

            ModelState.AddModelError("Login", "Username or password is incorrect, please try again.");
            return CurrentUmbracoPage();
        }
    }
}