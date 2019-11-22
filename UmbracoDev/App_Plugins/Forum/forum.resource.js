angular.module("umbraco.resources")
    .factory("forumResource", function ($http) {
        return {
            getAllCategories: function () {
                return $http.get(Umbraco.Sys.ServerVariables.forum.baseApiUrl + "GetAllCategories");
            },

            getPagedCategories: function (itemsPerPage, pageNumber, sortColumn, sortOrder, searchTerm) {
                if (sortColumn == undefined) {
                    sortColumn = "";
                }

                if (sortOrder == undefined) {
                    sortOrder = "";
                }

                return $http.get(Umbraco.Sys.ServerVariables.forum.baseApiUrl + "getPagedCategories?itemsPerPage=" + itemsPerPage + "&pageNumber=" + pageNumber + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder + "&searchTerm=" + searchTerm);
            }
        };
    });