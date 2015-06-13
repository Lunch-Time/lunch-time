using System;
using System.Security.Cryptography;
using System.Text;

namespace Dinner.Infrastructure
{
    public class RandomStringGenerator : IRandomStringGenerator
    {
        public string GenerateUrlSafeBase64EncodedKey(int length = 16)
        {
            var randomArray = new byte[length];

            // Create random salt and convert to string 
            var rng = new RNGCryptoServiceProvider();
            rng.GetBytes(randomArray);

            var result = new StringBuilder(
                Convert.ToBase64String(randomArray)
                    .TrimEnd('='));
            result.Replace('+', '-');
            result.Replace('/', '_');
            return result.ToString();
        }
    }
}
