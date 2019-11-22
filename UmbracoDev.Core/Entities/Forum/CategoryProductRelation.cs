using NPoco;

namespace UmbracoDev.Core.Entities.Forum
{
    [TableName("forumCategoryPostRelation")]
    public class CategoryPostRelation : BaseEntity
    {
        public string PostId { get; set; }
        public string CategoryId { get; set; }
    }
}
