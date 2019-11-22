using System.Web.Mvc;
using System.Web.Security;
using Umbraco.Web.Models;
using UmbracoDev.Core.Extensions;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Controllers.Signup
{
    public class SignupSurfaceController : BaseSurfaceController
    {
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Signup(SignupPageModel model)
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }

            if (Members.GetByEmail(model.Email) != null)
            {
                ModelState.AddModelError("", "User already exists, please use a different email.");
                return CurrentUmbracoPage();
            }

            var registrationModel = Members.CreateRegistrationModel(Member.ModelTypeAlias);
            registrationModel.Email = model.Email;
            registrationModel.Username = model.Email;
            registrationModel.UsernameIsEmail = true;
            registrationModel.CreatePersistentLoginCookie = false;
            registrationModel.LoginOnSuccess = true;
            registrationModel.MemberTypeAlias = Member.ModelTypeAlias;
            registrationModel.Name = model.FullName;
            registrationModel.Password = model.Password;
            Members.RegisterMember(registrationModel, out var status);

            if (status == MembershipCreateStatus.Success)
            {
                return RedirectToUmbracoPage(Umbraco.SingleContentOfType<ExtranetPage>(Umbraco.Website().Id).Id);
            }

            ModelState.AddModelError("", $"Signup failed, reason why: {status.ToString()}");
            return CurrentUmbracoPage();
        }
    }
}