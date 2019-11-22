using System.ComponentModel.DataAnnotations;
using UmbracoDev.DocumentTypes;
using UmbracoDev.Models;

namespace UmbracoDev.Controllers.ForgottenPassword
{
    public class ForgottenPasswordPageModel : BaseRenderModel<ForgottenPasswordPage>
    {
        [Required, EmailAddress] public string Email { get; set; }
        public int MemberId { get; set; }
        public string Token { get; set; }

        public bool IsResettingPassword { get; set; }
    }
}