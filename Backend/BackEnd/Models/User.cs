using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Email { get; set; } 
		public string PasswordHash { get; set; } 
		public string Salt { get; set; } 
		public string FullName { get; set; } 
		public DateTime CreatedAt { get; set; }
	}



}
