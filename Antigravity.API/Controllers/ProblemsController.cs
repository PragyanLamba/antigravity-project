using Antigravity.API.Data;
using Antigravity.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Antigravity.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProblemsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProblemsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Problem>>> GetProblems()
    {
        return await _context.Problems.ToListAsync();
    }
    
    // Endpoint to seed data if empty (for convenience)
    [HttpPost("seed")]
    public async Task<IActionResult> SeedProblems([FromBody] List<Problem> problems)
    {
        if (!await _context.Problems.AnyAsync())
        {
            _context.Problems.AddRange(problems);
            await _context.SaveChangesAsync();
            return Ok("Problems seeded.");
        }
        return Ok("Problems already exist.");
    }
}
