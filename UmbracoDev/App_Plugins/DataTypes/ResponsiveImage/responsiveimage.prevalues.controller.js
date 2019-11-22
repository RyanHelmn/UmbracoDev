angular.module("umbraco")
    .controller("ResponsiveImage.Prevalues.Controller",
        function ($scope) {

            $scope.model.value = $scope.model.value || [];

            $scope.addCrop = function () {
                $scope.model.value.push({
                    name: "",
                    width: 0,
                    height: 0,
                    breakPoint: 0
                });
            };

            $scope.removeCrop = function (index) {
                $scope.model.value.splice(index, 1);
            };
        });