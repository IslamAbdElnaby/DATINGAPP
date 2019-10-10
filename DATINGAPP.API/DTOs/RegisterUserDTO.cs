using System;
using System.ComponentModel.DataAnnotations;

namespace DATINGAPP.API.DTOs
{
    public class RegisterUserDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password length must be between 4 and 8")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get { return DateTime.Now; } }
        public DateTime LastActive { get { return DateTime.Now; } }
        public RegisterUserDTO()
        {
        }
    }
}