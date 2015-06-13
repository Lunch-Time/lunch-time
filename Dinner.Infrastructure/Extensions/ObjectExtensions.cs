namespace Dinner.Infrastructure
{
    using System;
    using System.Reflection;

    public static class ObjectExtensions
    {
        /// <summary>
        /// Gets attribute of type <see cref="TAttribute" /> from specified object instance.
        /// </summary>
        /// <typeparam name="TAttribute">Type of attribute.</typeparam>
        /// <param name="value">Object instance.</param>
        /// <returns>
        /// Attribute of type <see cref="TAttribute" /> assigned to specified object instance.
        /// </returns>
        public static TAttribute GetAttribute<TAttribute>(this object value) where TAttribute : Attribute
        {
            var type = value.GetType();
            var element = type.IsEnum ? (MemberInfo)type.GetField(value.ToString()) : type;

            var attribute = GetAttribute<TAttribute>(element);

            return attribute;
        }

        /// <summary>
        /// Gets attribute of type <see cref="TAttribute" /> from specified element.
        /// </summary>
        /// <typeparam name="TAttribute">Type of attribute.</typeparam>
        /// <param name="element">Element with assigned attribute.</param>
        /// <returns>
        /// Attribute of type <see cref="TAttribute" /> assigned to specified element.
        /// </returns>
        public static TAttribute GetAttribute<TAttribute>(this MemberInfo element) where TAttribute : Attribute
        {
            var attribute = (TAttribute)Attribute.GetCustomAttribute(element, typeof(TAttribute));

            return attribute;
        } 
    }
}