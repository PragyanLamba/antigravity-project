using Antigravity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Antigravity.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Problem> Problems { get; set; }
    public DbSet<UserProgress> UserProgress { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure composite key for UserProgress if needed, or just relationships
        modelBuilder.Entity<UserProgress>()
            .HasOne(up => up.User)
            .WithMany()
            .HasForeignKey(up => up.UserId);

        modelBuilder.Entity<UserProgress>()
            .HasOne(up => up.Problem)
            .WithMany()
            .HasForeignKey(up => up.ProblemId);
            
        // Ensure ProblemId is unique per User
        modelBuilder.Entity<UserProgress>()
            .HasIndex(up => new { up.UserId, up.ProblemId })
            .IsUnique();
    }
}
