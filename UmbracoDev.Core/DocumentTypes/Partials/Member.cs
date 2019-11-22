namespace UmbracoDev.DocumentTypes
{
    public partial class Member
    {
        public string FullName => $"{FirstName} {LastName}";
    }
}
