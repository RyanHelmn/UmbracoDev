using NPoco;

namespace UmbracoDev.Core.Entities.Commerce
{
    [TableName("commerceCategoryProductRelation")]
    public class CategoryProductRelation : BaseEntity
    {
        public string ProductId { get; set; }
        public string CategoryId { get; set; }
    }
}
