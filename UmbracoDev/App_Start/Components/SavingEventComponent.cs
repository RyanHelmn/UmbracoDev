using System.Linq;
using Umbraco.Core;
using Umbraco.Core.Composing;
using Umbraco.Core.Events;
using Umbraco.Core.Services;
using Umbraco.Core.Services.Implement;
using UmbracoDev.Core.Helpers;
using UmbracoDev.Core.Utility;

namespace UmbracoDev.Components
{
    internal class SavingEventComponent : IComponent
    {
        public void Initialize()
        {
            ContentService.Saving += ContentService_Saving;
        }

        private static void ContentService_Saving(IContentService sender, ContentSavingEventArgs e)
        {
            foreach (var content in e.SavedEntities.Where(c => CacheKeyMapper.CacheKeyMaps.ContainsKey(c.ContentType.Alias)))
            {
                var (key, value) = CacheKeyMapper.CacheKeyMaps.FirstOrDefault(x => x.Key.Equals(content.ContentType.Alias));
                CacheHelper.Clear(value.ToString());

                e.Messages.Add(new EventMessage("Cache", $"Cache has been successfully been cleared for {value}.", EventMessageType.Success));
            }
        }

        public void Terminate()
        {
        }
    }
}