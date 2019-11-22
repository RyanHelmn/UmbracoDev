using System.Net.Configuration;
using System.Net.Mail;
using System.Text;
using System.Web.Configuration;
using Umbraco.Web;
using Umbraco.Web.Composing;
using UmbracoDev.Core.Extensions;
using UmbracoDev.DocumentTypes;

namespace UmbracoDev.Core.Helpers
{
    public static class EmailHelper
    {
        private static readonly SmtpSection SmtpSection =
            (SmtpSection) WebConfigurationManager.GetSection("system.net/mailSettings/smtp");

        public static void SendMail(string to, Email email, string additionalBodyContent = "")
        {
            var umbracoHelper = Current.UmbracoHelper;

            var body = new StringBuilder();
            body.AppendLine(email.Body.ToHtmlString());
            if (additionalBodyContent.IsNotNullOrEmpty()) body.AppendLine(additionalBodyContent);

            if (umbracoHelper.SharedContent().FirstChildOfType(Emails.ModelTypeAlias) is Emails emails)
            {
                body.Insert(0, emails.Header.ToHtmlString());
                body.Insert(body.Length - 1, emails.Footer.ToHtmlString());
            }

            var message = new MailMessage
            {
                From = new MailAddress(email.From.IfBlank(SmtpSection.From)),
                Subject = email.Subject.IfBlank(email.Name),
                Body = body.ToString()
            };
            message.To.Add(new MailAddress(to));

            message.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {
                smtp.UseDefaultCredentials = true;
                smtp.Send(message);
            }
        }
    }
}