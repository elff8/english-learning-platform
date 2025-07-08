	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;

	namespace BackEnd.Models
	{
		public class MissingWord
		{
			public int Id { get; set; }
			public string SentenceWithBlank { get; set; } 
			public string CorrectWord { get; set; }  
			public int? CategoryId { get; set; }  
			public Category Category { get; set; }
			public string Translation { get; set; } 

			public int DifficultyLevelId { get; set; }

			public DifficultyLevel DifficultyLevel { get; set; }

		}
	

	}
