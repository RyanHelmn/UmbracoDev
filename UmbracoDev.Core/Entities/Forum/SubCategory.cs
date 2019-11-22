using NPoco;

namespace UmbracoDev.Core.Entities.Forum
{
    [TableName("forumSubCategory")]
    public class SubCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
