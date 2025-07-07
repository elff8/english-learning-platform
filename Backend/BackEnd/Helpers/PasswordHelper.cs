using System;
using System.Security.Cryptography;
using System.Text;

namespace BackEnd.Helpers
{
	public class PasswordHelper
	{
		public static (string passwordHash, string salt) HashPassword(string password)
		{
			using (var hmac = new HMACSHA512())
			{
				var salt = Convert.ToBase64String(hmac.Key); // Генерация соли
				var passwordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password))); // Хэш
				return (passwordHash, salt);
			}
		}

		public static bool VerifyPassword(string password, string storedHash, string storedSalt)
		{
			using (var hmac = new HMACSHA512(Convert.FromBase64String(storedSalt)))
			{
				var hash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
				return hash == storedHash;
			}
		}
	}
}
