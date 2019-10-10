using System;
namespace DATINGAPP.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime? AddedDate { get; set; }
        public bool IsMain { get; set; }
    }
}