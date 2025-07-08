﻿using Microsoft.EntityFrameworkCore;
using BackEnd.Models;  

namespace BackEnd.DBContext
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}
		public DbSet<Category> Category { get; set; }
		public DbSet<DifficultyLevel> DifficultyLevel { get; set; }
		public DbSet<Flashcard> Flashcards { get; set; }
		public DbSet<MissingWord> MissingWord { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<UserProfiles> UserProfiles { get; set; }
		public DbSet<TestCategory> TestCategory { get; set; }
		public DbSet<Test> Test { get; set; }
		public DbSet<AnswerOption> AnswerOptions { get; set; }
		public DbSet<Question> Questions { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Flashcard>()
				.HasOne(f => f.Category)
				.WithMany(c => c.Flashcards)
				.HasForeignKey(f => f.CategoryId);

			modelBuilder.Entity<Flashcard>()
				.HasOne(f => f.DifficultyLevel)
				.WithMany(d => d.Flashcards)
				.HasForeignKey(f => f.DifficultyLevelId);

			
			modelBuilder.Entity<MissingWord>()
				.HasOne(m => m.Category)
				.WithMany(c => c.MissingWords)
				.HasForeignKey(m => m.CategoryId);

			modelBuilder.Entity<MissingWord>()
				.HasOne(m => m.DifficultyLevel)
				.WithMany(d => d.MissingWords)
				.HasForeignKey(m => m.DifficultyLevelId);

			
			modelBuilder.Entity<Test>()
				.HasOne(t => t.DifficultyLevel)
				.WithMany(dl => dl.Tests)
				.HasForeignKey(t => t.DifficultyLevelId);

			modelBuilder.Entity<Test>()
				.HasOne(t => t.TestCategory)
				.WithMany(c => c.Tests)
				.HasForeignKey(t => t.TestCategoryId);

			
			modelBuilder.Entity<Question>()
				.HasOne(q => q.Test)
				.WithMany(t => t.Questions)
				.HasForeignKey(q => q.TestId);

			
			modelBuilder.Entity<AnswerOption>()
				.HasOne(a => a.Question)
				.WithMany(q => q.AnswerOptions)
				.HasForeignKey(a => a.QuestionId);
		}

	}
}
