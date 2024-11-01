using GreaterGradesBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GreaterGradesBackend.Infrastructure
{
    public class GreaterGradesBackendDbContext : DbContext
    {
        public GreaterGradesBackendDbContext(DbContextOptions<GreaterGradesBackendDbContext> options)
            : base(options)
        {
        }

        public DbSet<Class> Classes { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Institution> Institutions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Many-to-Many Relationship Configuration with Restrict for join tables
            modelBuilder.Entity<User>()
                .HasMany(s => s.Classes)
                .WithMany(c => c.Students)
                .UsingEntity<Dictionary<string, object>>(
                    "StudentClass",
                    sc => sc.HasOne<Class>().WithMany().HasForeignKey("ClassId").OnDelete(DeleteBehavior.Restrict),
                    sc => sc.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.Restrict)
                );

            modelBuilder.Entity<User>()
                .HasMany(s => s.TaughtClasses)
                .WithMany(c => c.Teachers)
                .UsingEntity<Dictionary<string, object>>(
                    "TeacherClass",
                    sc => sc.HasOne<Class>().WithMany().HasForeignKey("ClassId").OnDelete(DeleteBehavior.Restrict),
                    sc => sc.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.Restrict)
                );

            // Configure delete behavior for Grades
            modelBuilder.Entity<Grade>()
                .HasOne(g => g.User)
                .WithMany(u => u.Grades)
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Grade>()
                .HasOne(g => g.Assignment)
                .WithMany(a => a.Grades)
                .HasForeignKey(g => g.AssignmentId)
                .OnDelete(DeleteBehavior.Cascade);

            // Institution cascade configuration
            modelBuilder.Entity<User>()
                .HasOne(u => u.Institution)
                .WithMany(i => i.Users)
                .HasForeignKey(u => u.InstitutionId) // Explicitly set InstitutionId as the foreign key
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Class>()
                .HasOne(c => c.Institution)
                .WithMany(i => i.Classes)
                .HasForeignKey(c => c.InstitutionId) // Explicitly set InstitutionId as the foreign key
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
