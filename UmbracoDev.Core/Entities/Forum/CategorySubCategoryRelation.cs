using NPoco;

namespace UmbracoDev.Core.Entities.Forum
{
    [TableName("forumCategorySubCategoryRelation")]
    public class CategorySubCategoryRelation : BaseEntity
    {
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
    }
}
