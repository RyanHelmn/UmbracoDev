(function () {
    "use strict";

    function productPickerEditorController($scope, productsResource) {

        var vm = this;
        var config = $scope.model.config;
        var numberOfProducts = config.numberOfProducts;

        vm.title = numberOfProducts > 1 ? "Products Picker" : "Product Picker";
        vm.submit = submit;
        vm.close = close;
        vm.select = select;

        productsResource.getAll().then(function(data) {
            vm.products = data;
        });

        function submit() {
            if ($scope.model.submit) {
                $scope.model.submit($scope.model);
            }
        }

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }

        function select(product) {
            $scope.model.selectedProduct = product;
        }
    }

    angular.module("umbraco").controller("ProductPicker.Editor.Controller", productPickerEditorController);
})();