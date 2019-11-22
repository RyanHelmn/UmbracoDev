using System;
using Newtonsoft.Json;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace UmbracoDev.Core.PropertyValueConverters.ProductPicker
{
    public class ProductPickerPropertyValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(IPublishedPropertyType publishedPropertyType)
        {
            return publishedPropertyType.EditorAlias.Equals("UmbracoDev.ProductPicker");
        }

        public override PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType publishedPropertyType)
        {
            return PropertyCacheLevel.Snapshot;
        }

        public override Type GetPropertyValueType(IPublishedPropertyType publishedPropertyType)
        {
            return typeof(ProductPicker);
        }

        public override object ConvertSourceToIntermediate(IPublishedElement owner,
            IPublishedPropertyType publishedPropertyType, object source, bool preview)
        {
            return source == null ? null : JsonConvert.DeserializeObject<ProductPicker>(source.ToString());
        }

        public override object ConvertIntermediateToObject(IPublishedElement owner,
            IPublishedPropertyType publishedPropertyType, PropertyCacheLevel referenceCacheLevel, object inter,
            bool preview)
        {
            return inter;
        }

        public override object ConvertIntermediateToXPath(IPublishedElement owner,
            IPublishedPropertyType publishedPropertyType, PropertyCacheLevel referenceCacheLevel, object inter,
            bool preview)
        {
            return inter;
        }
    }
}