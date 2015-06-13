namespace Dinner.Helpers
{
    public static class ApplicationEnvironment
    {
        public static bool IsDebug
        {
            get
            {
                #if DEBUG
                    return true;
                #else
                    return false;
                #endif
            }
        }

        public static bool IsRelease
        {
            get
            {
                return !IsDebug;
            }
        }
    }
}