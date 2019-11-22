using System.ComponentModel.DataAnnotations;

namespace UmbracoDev.Controllers.ForgottenPassword
{
    public class ResetPasswordModel
    {
        [Required] public int MemberId { get; set; }
        [Required] public string Token { get; set; }
        [Required] public string Password { get; set; }
        [Required, Compare("Password"), Display(Name = "Confirm Password")] public string ConfirmPassword { get; set; }
    }
}