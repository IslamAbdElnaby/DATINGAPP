using AutoMapper;
using DATINGAPP.API.DTOs;
using DATINGAPP.API.Models;

namespace DATINGAPP.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>()
            .ForMember(options => options.Id, opt => opt.Ignore())
            .ForMember(options => options.Photos, opt => opt.Ignore());

            CreateMap<RegisterUserDTO, User>()
            .ForMember(options => options.BirthDate, opt => opt.MapFrom(r => r.DateOfBirth))
            .ForMember(options => options.Name, opt => opt.MapFrom(r => r.Username));

            CreateMap<Photo, PhotoDto>();
            CreateMap<PhotoDto, Photo>()
            .ForMember(options => options.Id, opt => opt.Ignore());


        }
    }
}