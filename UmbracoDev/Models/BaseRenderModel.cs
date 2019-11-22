using System;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web.Composing;
using Umbraco.Web.Models;

namespace UmbracoDev.Models
{
    public class BaseRenderModel<T> : ContentModel where T : IPublishedContent
    {
        public new T Content { get; set; }

        public BaseRenderModel(IPublishedContent content) : base(content)
        {
            Content = (T)Activator.CreateInstance(typeof(T), args: content);
        }

        public BaseRenderModel() : this(Current.UmbracoHelper.AssignedContentItem)
        {
        }

        // Shared Properties
    }
}