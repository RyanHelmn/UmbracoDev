using System.ComponentModel.DataAnnotations;
using UmbracoDev.DocumentTypes;
using UmbracoDev.Models;

namespace UmbracoDev.Controllers.Signup
{
    public class SignupPageModel : BaseRenderModel<SignupPage>
    {
        [Required, EmailAddress] public string Email { get; set; }
        [Required, Display(Name = "First Name")] public string FirstName { get; set; }
        [Required, Display(Name = "Last Name")] public string LastName { get; set; }
        [Required] public string Password { get; set; }
        [Required, Compare("Password"), Display(Name = "Confirm Password")] public string ConfirmPassword { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}