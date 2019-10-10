using System.Collections.ObjectModel;
using System.Collections.Generic;
using System;

namespace DATINGAPP.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
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
        public virtual ICollection<Photo> Photos { get; set; }
        public User()
        {
            Photos = new Collection<Photo>();
        }
    }
}