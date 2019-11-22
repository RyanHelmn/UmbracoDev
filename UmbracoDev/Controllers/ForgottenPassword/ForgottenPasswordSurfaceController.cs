using System;
using System.Web.Mvc;
using AuthorizeNet.Util;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.Services;
using Umbraco.Web;
using Umbraco.Web.Models;
using UmbracoDev.Core.Extensions;
using UmbracoDev.Core.Helpers;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Controllers.ForgottenPassword
{
    public class ForgottenPasswordSurfaceController : BaseSurfaceController
    {
        private readonly IMemberService _memberService;

        public ForgottenPasswordSurfaceController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RequestPasswordReset(ForgottenPasswordPageModel model)
        {
            if (!ModelState.IsValid) return CurrentUmbracoPage();

            if (!(Members.GetByEmail(model.Email) is Member member))
            {
                ModelState.AddModelError("", "Member with this email does not exist, please try again.");
                return CurrentUmbracoPage();
            }

            var token = Guid.NewGuid();
            var memberContent = _memberService.GetById(member.Id);
            memberContent.SetValue("passwordResetDate", DateTime.Now);
            memberContent.SetValue("passwordResetToken", token);

            _memberService.Save(memberContent);

            var additionalBodyContent =
                $"<p>Click <a href=\"{model.Content.Url(mode: UrlMode.Absolute)}?memberId={member.Id}&token={token}\">here</a> to reset your password.</p>";
            EmailHelper.SendMail(model.Email, model.Content.ResetRequestEmail as Email, additionalBodyContent);

            TempData["ResetPasswordSuccess"] = true;
            return CurrentUmbracoPage();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ResetPassword(ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }

            var memberContent = _memberService.GetById(model.MemberId);
            if (memberContent == null)
            {
                ModelState.AddModelError("", "Member with this id does not exist, please try again.");
                return CurrentUmbracoPage();
            }

            if (!memberContent.GetValue<string>("passwordResetToken").EqualsIgnoreCase(model.Token))
            {
                return CurrentUmbracoPage();
            }

            try
            {
                memberContent.SetValue("passwordResetDate", null);
                memberContent.SetValue("passwordResetToken", null);
                _memberService.SavePassword(memberContent, model.Password);
                _memberService.Save(memberContent);

                EmailHelper.SendMail(memberContent.Email, (CurrentPage as ForgottenPasswordPage)?.ResetSuccessEmail as Email);

                return RedirectToUmbracoPage(Umbraco.SingleContentOfType<LoginPage>(Umbraco.Website().Id));
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", $"Failed to reset password: {e.Message}");
            }

            return CurrentUmbracoPage();
        }
    }
}