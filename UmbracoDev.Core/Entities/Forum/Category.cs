using NPoco;

namespace UmbracoDev.Core.Entities.Forum
{
    [TableName("forumCategory")]
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
