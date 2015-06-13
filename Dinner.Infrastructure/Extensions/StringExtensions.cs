namespace Dinner.Infrastructure
{
    using System;

    public static class StringExtensions
    {
        /// <summary>
        /// Compares two specified strings in case-insentitive mode.
        /// </summary>
        /// <param name="a">The first string.</param>
        /// <param name="b">The second string.</param>
        /// <returns>True whether two specified strings have the same value.</returns>
        public static bool EqualsIgnoreCase(this string a, string b)
        {
            return string.Equals(a, b, StringComparison.InvariantCultureIgnoreCase);
        }

        /// <summary>
        /// Converts the specified string to the integer.
        /// </summary>
        /// <param name="s">The arguments.</param>
        /// <returns>The integer or null.</returns>
        public static int? ToIntOrNull(this string s)
        {
            int value;
            return int.TryParse(s, out value) ? value : (int?)null;
        }
    }
}
