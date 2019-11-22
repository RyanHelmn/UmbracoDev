using System.ComponentModel.DataAnnotations;
using UmbracoDev.DocumentTypes;
using UmbracoDev.Models;

namespace UmbracoDev.Controllers.Login
{
    public class LoginPageModel : BaseRenderModel<LoginPage>
    {
        [Required, EmailAddress] public string Email { get; set; }
        [Required] public string Password { get; set; }
        [Display(Name = "Remember Password")] public bool RememberPassword { get; set; }
    }
}