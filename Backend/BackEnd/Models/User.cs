using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
	public class User
	{
		public int Id { get; set; } // ID пользователя
		public string Email { get; set; } // Электронная почта
		public string PasswordHash { get; set; } // Хэш пароля
		public string Salt { get; set; } // Соль для пароля
		public string FullName { get; set; } // Полное имя пользователя 
		public DateTime CreatedAt { get; set; } // Дата регистрации
	}



}
