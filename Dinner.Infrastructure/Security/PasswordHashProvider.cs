namespace Dinner.Infrastructure.Security
{
    using System.Security.Cryptography;
    using System.Text;

    internal sealed class PasswordHashProvider : IPasswordHashProvider
    {
        public string GetHash(string password)
        {
            // step 1, calculate MD5 hash from input
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.ASCII.GetBytes(password);
            byte[] hash = md5.ComputeHash(inputBytes);

            // step 2, convert byte array to hex string
            var sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }

            return sb.ToString();
        }
    }
}