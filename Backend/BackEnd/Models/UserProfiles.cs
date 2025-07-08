using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models; 

namespace BackEnd.Models
{
    public class UserProfiles
	{
        public int Id { get; set; }
        public int UserId { get; set; } 
        public int CorrectAnswersCount { get; set; }
        public bool IsLearned { get; set; } 
    }

}
