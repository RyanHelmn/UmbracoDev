using NPoco;

namespace UmbracoDev.Core.Entities.Forum
{
    [TableName("forumComment")]
    public class Comment : BaseEntity
    {
        public int MemberId { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }
    }
}
