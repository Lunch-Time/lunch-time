namespace Dinner.Models
{
    public class ApplicationViewModel<TModel, TBag>
    {
        public ApplicationViewModel()
        {
        }

        public ApplicationViewModel(TModel model, TBag bag)
        {
            Bag = bag;
            Model = model;
        }

        public TBag Bag { get; private set; }
        public TModel Model { get; private set; }
    }
}