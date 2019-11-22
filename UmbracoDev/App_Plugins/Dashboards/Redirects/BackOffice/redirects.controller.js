angular.module("umbraco").controller("RedirectsDashboard.Controller",
    function ($scope, $location) {

        $scope.redirects = $scope.redirects || [];
        $scope.search = "";
        $scope.editRedirect = angular.equals({}, $location.search().edit) ? null : $location.search().edit;
        $scope.createRedirect = angular.equals({}, $location.search().create) ? null : $location.search().create;
        $scope.selectedRedirects = [];

        loadRedirects();

        console.log($scope.editRedirect);

        $scope.selectRedirect = function () {
            $scope.selectedRedirects = [];
            angular.forEach($scope.redirects,
                function (value, key) {
                    if (value.selected) {
                        $scope.selectedRedirects.push(value);
                    }
                });
        };

        $scope.editRedirect = function (id) {
            $location.url("?edit=" + id);
        }

        function loadRedirects() {
            $scope.loading = true;

            // Retrieve redirects from database

            $scope.redirects = [
                {
                    id: 1,
                    selected: false,
                    rootNodeId: 001,
                    targetNodeId: 002,
                    oldUrl: "/old-url/",
                    newUrl: "/new-url/",
                    status: 302,
                    enabled: true
                },
                {
                    id: 2,
                    selected: false,
                    rootNodeId: 001,
                    targetNodeId: 002,
                    oldUrl: "/old-url/",
                    newUrl: "/new-url/",
                    status: 302,
                    enabled: true
                }
            ];

            $scope.loading = false;
        }

    });

angular.module("umbraco").controller("EditRedirects.Controller",
    function ($scope, $route, $location) {
        console.log($location.search());
    });

angular.module("umbraco").controller("CreateRedirects.Controller",
    function ($scope, $route, $location) {
        console.log($location.search());
    });