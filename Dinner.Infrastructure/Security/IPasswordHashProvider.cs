namespace Dinner.Infrastructure.Security
{
    public interface IPasswordHashProvider
    {
        string GetHash(string password);
    }
}