using System;
using Microsoft.AspNetCore.Http;

namespace DATINGAPP.API.DTOs
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public int UserId { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime? AddedDate { get; set; }
        public bool IsMain { get; set; }
        public IFormFile File { get; set; }
        public PhotoDto()
        {
            AddedDate = DateTime.Now;
        }
    }
}