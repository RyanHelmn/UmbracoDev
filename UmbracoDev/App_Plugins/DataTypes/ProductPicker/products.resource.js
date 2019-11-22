function productsResource($q, $http, umbRequestHelper) {
    return {
        getAll: function () {
            return umbRequestHelper.resourcePromise(
                $http.get("backoffice/api/ProductsApi/GetAll"),
                "Failed to retrieve all products data");
        }
    };
}

angular.module("umbraco.resources").factory("productsResource", productsResource);