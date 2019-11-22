namespace UmbracoDev.Core.Models
{
    public class PaginationModel
    {
        public PaginationModel(int itemsPerPage = 16)
        {
            ItemsPerPage = itemsPerPage;
            CurrentPage = 1;
        }

        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        public int ItemsPerPage { get; set; }
        public int CurrentPage { get; set; }
    }
}
