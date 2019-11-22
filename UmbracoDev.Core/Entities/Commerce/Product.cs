using NPoco;

namespace UmbracoDev.Core.Entities.Commerce
{
    [TableName("commerceProduct")]
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; }
    }
}
