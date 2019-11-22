namespace UmbracoDev.App_Plugins.Forum.Controllers.Tree
{
    public class TreeMenuItem
    {
        public int ParentId { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public string View { get; set; } = "edit";
    }
}