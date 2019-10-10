using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DATINGAPP.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
namespace DATINGAPP.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var res = await next();
            int userId = int.Parse(res.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = res.HttpContext.RequestServices.GetService<IDatingRepository>();
            var user = await repo.GetUser(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}