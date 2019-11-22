using NPoco;

namespace UmbracoDev.Core.Entities.Commerce
{
    [TableName("commerceCategory")]
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
