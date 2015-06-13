namespace Dinner.Storage.Repository
{
    public interface IDataContextFactory
    {
        Entities Create();
    }
}
