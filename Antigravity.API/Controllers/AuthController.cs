using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Antigravity.API.Data;
using Antigravity.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Antigravity.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AppDbContext context, IConfiguration configuration, ILogger<AuthController> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto request)
    {
        _logger.LogInformation("Register attempt for username: {Username}", request.Username);

        try 
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                _logger.LogWarning("Registration failed: Empty username or password.");
                return BadRequest("Username and password are required.");
            }

            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
            {
                _logger.LogWarning("Registration failed: Username {Username} already exists.", request.Username);
                return BadRequest("Username already exists.");
            }

            var user = new User
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation("User {Username} registered successfully.", request.Username);
            return Ok("User registered successfully.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during registration for {Username}", request.Username);
            return StatusCode(500, "Internal server error during registration.");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserDto request)
    {
        _logger.LogInformation("Login attempt for username: {Username}", request.Username);

        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
            {
                _logger.LogWarning("Login failed: User {Username} not found.", request.Username);
                return BadRequest("User not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                _logger.LogWarning("Login failed: Invalid password for {Username}.", request.Username);
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user);
            _logger.LogInformation("User {Username} logged in successfully.", request.Username);
            return Ok(new { Token = token, Username = user.Username });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred during login for {Username}", request.Username);
            return StatusCode(500, "Internal server error during login.");
        }
    }

    private string CreateToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["DurationInMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class UserDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
