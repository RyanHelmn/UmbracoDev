using UmbracoDev.Core.Extensions;

namespace UmbracoDev.DocumentTypes
{
    public partial class Website
    {
        public string TitleOrDefault => Title.IfBlank(Name);
    }
}
