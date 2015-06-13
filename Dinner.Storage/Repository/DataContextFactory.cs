namespace Dinner.Storage.Repository
{
    internal sealed class DataContextFactory : IDataContextFactory
    {
        public Entities Create()
        {
            return new Entities();
        }
    }
}