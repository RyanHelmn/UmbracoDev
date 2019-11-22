using System.Web.Mvc;
using Umbraco.Core.Services;
using Umbraco.Web.Composing;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;
using UmbracoDev.Core.Extensions;

namespace UmbracoDev.Controllers.ForgottenPassword
{
    public class ForgottenPasswordPageController : RenderMvcController
    {
        private readonly IMemberService _memberService = Current.Services.MemberService;

        public ActionResult Index(ContentModel contentModel, int memberId = 0, string token = "")
        {
            var model = new ForgottenPasswordPageModel();
            if (memberId <= 0 || !token.IsNotNullOrEmpty()) return CurrentTemplate(model);

            var memberContent = _memberService.GetById(memberId);
            if (memberContent == null)
            {
                ModelState.AddModelError("", "User with this id does not exist, please try again");
                return CurrentTemplate(model);
            }

            if (memberContent.GetValue<string>("passwordResetToken").EqualsIgnoreCase(token))
            {
                model.Email = memberContent.Email;
                model.MemberId = memberId;
                model.Token = token;
                model.IsResettingPassword = true;

                return CurrentTemplate(model);
            }

            ModelState.AddModelError("",
                "Password reset token does not match, please try resetting your password again.");
            return CurrentTemplate(model);
        }
    }
}