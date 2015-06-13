namespace Dinner.Attributes
{
    using System;
    using System.ComponentModel.DataAnnotations;

    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class IntermediaEmail : DataTypeAttribute
    {
        private const string IntermediaDomain = "@intermedia.net";

        /// <summary>
        /// Initializes a new instance of the <see>
        ///                                       <cref>T:System.ComponentModel.DataAnnotations.DataTypeTypeAttribute</cref>
        ///                                   </see>
        ///     class by using the specified type name.
        /// </summary>
        public IntermediaEmail()
            : base(DataType.EmailAddress)
        {
            ErrorMessage = string.Format(
                "Доступ к системе возможен только с использованием почты в домене {0}", 
                IntermediaDomain);
        }

        /// <summary>
        /// Checks that the value of the data field is valid.
        /// </summary>
        /// <returns>
        /// true always.
        /// </returns>
        /// <param name="value">The data field value to validate.</param>
        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return true;
            }
            var input = value as string;
            if (input != null)
            {
                return input.EndsWith(IntermediaDomain, StringComparison.InvariantCultureIgnoreCase);
            }
            return false;
        }
    }
}