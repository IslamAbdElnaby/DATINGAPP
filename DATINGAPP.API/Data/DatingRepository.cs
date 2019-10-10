using System.Collections.Generic;
using System.Threading.Tasks;
using DATINGAPP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DATINGAPP.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.Photos)
                .SingleOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.Include(u => u.Photos).ToListAsync();
        }
        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.SingleOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetMainPhoto(int userId)
        {
            return await _context.Photos.SingleOrDefaultAsync(p => p.UserId == userId && p.IsMain);
        }
    }
}