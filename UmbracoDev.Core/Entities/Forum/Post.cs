using System;
using System.Collections.Generic;
using NPoco;

namespace UmbracoDev.Core.Entities.Forum
{
    [TableName("forumPost")]
    public class Post : BaseEntity
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime PublishDate { get; set; }
        public int Views { get; set; }
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }
        public virtual List<Comment> Comments { get; set; }
    }
}
