using Microsoft.EntityFrameworkCore;

namespace My.Weight.Api.Models;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Metrics> Metrics { get; set; }
    public DbSet<Event> Events { get; set; }
}