using System.ComponentModel.DataAnnotations;

namespace Antigravity.API.Models;

public class Problem
{
    public string Id { get; set; } = string.Empty; // e.g., "two-sum"
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string Difficulty { get; set; } = string.Empty;
    
    public string Topic { get; set; } = string.Empty;
    
    public string LeetcodeUrl { get; set; } = string.Empty;
    
    public bool IsRecommendedForBeginners { get; set; }
}
