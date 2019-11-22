angular.module("umbraco.resources")
    .factory("commerceResource", function ($http) {
        return {
            getProduct: function (id) {
                return $http.get(Umbraco.Sys.ServerVariables.commerce.baseApiUrl + "GetProduct?id=" + id);
            },
            getAllProducts: function () {
                return $http.get(Umbraco.Sys.ServerVariables.commerce.baseApiUrl + "GetAllProducts");
            },
            getPagedProducts: function (itemsPerPage, pageNumber, sortColumn, sortOrder, searchTerm) {
                if (sortColumn == undefined) {
                    sortColumn = "";
                }

                if (sortOrder == undefined) {
                    sortOrder = "";
                }

                return $http.get(Umbraco.Sys.ServerVariables.commerce.baseApiUrl + "GetPagedProducts?itemsPerPage=" + itemsPerPage + "&pageNumber=" + pageNumber + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder + "&searchTerm=" + searchTerm);
            },

            getCategory: function (id) {
                return $http.get(Umbraco.Sys.ServerVariables.commerce.baseApiUrl + "GetCategory?id=" + id);
            },
            getAllCategories: function () {
                return $http.get(Umbraco.Sys.ServerVariables.commerce.baseApiUrl + "GetAllCategories");
            },
            getPagedCategories: function (itemsPerPage, pageNumber, sortColumn, sortOrder, searchTerm) {
                if (sortColumn == undefined) {
                    sortColumn = "";
                }

                if (sortOrder == undefined) {
                    sortOrder = "";
                }

                return $http.get(Umbraco.Sys.ServerVariables.commerce.baseApiUrl + "GetPagedCategories?itemsPerPage=" + itemsPerPage + "&pageNumber=" + pageNumber + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder + "&searchTerm=" + searchTerm);
            },

            getDataTypeFromValue: function (value) {
                var type = typeof value;
                console.log(type);
                if (type === "string") {
                    if (value.includes("true") || value.includes("false")) {
                        return "boolean";
                    } else {
                        return "textbox";
                    }
                } else if (type === "number") {
                    if (value.toString().includes(".")) {
                        return "decimal";
                    } else {
                        return "integer";
                    }
                } else if (type === "boolean") {
                    return "boolean";
                }
            }
        };
    });