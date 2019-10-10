using System.Linq;
using System.Collections.ObjectModel;
using System;
using System.Collections.Generic;

namespace DATINGAPP.API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string KnownAs { get; set; }
        public string Introduction { get; set; }
        public string Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? LastActive { get; set; }
        public int Age { get { return DateTime.Now.Subtract(this.BirthDate.Value).Days / 365; } }
        public string Country { get; set; }
        public string City { get; set; }
        public string Interests { get; set; }
        public string LookingFor { get; set; }
        public string PicUrl { get { try { return this.Photos.Single(p => p.IsMain == true).Url; } catch { return ""; } } set { } }
        public virtual ICollection<PhotoDto> Photos { get; set; }
        public UserDto()
        {
            Photos = new Collection<PhotoDto>();
        }
    }
}