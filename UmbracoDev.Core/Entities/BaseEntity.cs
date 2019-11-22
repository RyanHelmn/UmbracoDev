using NPoco;

namespace UmbracoDev.Core.Entities
{
    [PrimaryKey("Id")]
    public class BaseEntity
    {
        public int Id { get; set; }
    }
}