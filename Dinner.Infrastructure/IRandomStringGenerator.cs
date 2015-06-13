namespace Dinner.Infrastructure
{
    public interface IRandomStringGenerator
    {
        string GenerateUrlSafeBase64EncodedKey(int length = 16);
    }
}
