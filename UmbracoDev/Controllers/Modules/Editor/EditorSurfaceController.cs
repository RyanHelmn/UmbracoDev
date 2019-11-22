using System.Web.Mvc;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.Services;

namespace UmbracoDev.Controllers.Modules.Editor
{
    public class EditorSurfaceController : BaseSurfaceController
    {
        private IContentService _contentService;
        //private IProperty

        public EditorSurfaceController(IContentService consentService)
        {
            _contentService = consentService;
        }

        public ActionResult GetEditorForm()
        {
            var currentContent = _contentService.GetById(CurrentPage.Id);
            var properties = currentContent.Properties;

            //foreach(var property in properties)
            //{
            //    property.PropertyType.
            //}

            return Content("");
        }
    }
}