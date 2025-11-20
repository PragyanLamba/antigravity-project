using System.Security.Claims;
using Antigravity.API.Data;
using Antigravity.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Antigravity.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProgressController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProgressController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<string>>> GetUserProgress()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var completedProblemIds = await _context.UserProgress
            .Where(up => up.UserId == userId && up.IsCompleted)
            .Select(up => up.ProblemId)
            .ToListAsync();

        return Ok(completedProblemIds);
    }

    [HttpPost("{problemId}")]
    public async Task<IActionResult> ToggleProgress(string problemId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var progress = await _context.UserProgress
            .FirstOrDefaultAsync(up => up.UserId == userId && up.ProblemId == problemId);

        if (progress == null)
        {
            progress = new UserProgress
            {
                UserId = userId,
                ProblemId = problemId,
                IsCompleted = true,
                CompletedAt = DateTime.UtcNow
            };
            _context.UserProgress.Add(progress);
        }
        else
        {
            progress.IsCompleted = !progress.IsCompleted;
            progress.CompletedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
        return Ok(new { IsCompleted = progress.IsCompleted });
    }
}
