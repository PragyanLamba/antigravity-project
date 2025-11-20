using System.ComponentModel.DataAnnotations;

namespace Antigravity.API.Models;

public class UserProgress
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    public User? User { get; set; }
    
    public string ProblemId { get; set; } = string.Empty;
    public Problem? Problem { get; set; }
    
    public bool IsCompleted { get; set; }
    
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
}
