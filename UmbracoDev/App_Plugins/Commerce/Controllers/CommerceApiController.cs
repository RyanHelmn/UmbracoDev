using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Umbraco.Web.WebApi;
using UmbracoDev.Core.Interfaces.Commerce;
using UmbracoDev.Infrastructure.Repositories.Commerce;

namespace UmbracoDev.App_Plugins.Commerce.Controllers
{
    public class CommerceApiController : UmbracoAuthorizedApiController
    {
        private readonly IProductsRepository _productsRepository = new ProductsRepository();
        private readonly ICategoriesRepository _categoriesRepository = new CategoriesRepository();

        public IHttpActionResult GetProduct([FromUri] int id)
        {
            var product = _productsRepository.Get(id);
            return Json(product, new JsonSerializerSettings{ ContractResolver = new CamelCasePropertyNamesContractResolver()});
        }
        public IHttpActionResult GetAllProducts()
        {
            var products = _productsRepository.GetAll();
            return Json(products, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }

        public IHttpActionResult GetCategory([FromUri] int id)
        {
            var category = _categoriesRepository.Get(id);
            return Json(category, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }
        public IHttpActionResult GetAllCategories()
        {
            var categories = _categoriesRepository.GetAll();
            return Json(categories, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }
    }
}