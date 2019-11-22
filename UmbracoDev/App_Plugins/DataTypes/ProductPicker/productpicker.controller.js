(function () {
    "use strict";

    function productsController($scope, editorService) {
        var vm = this;

        vm.config = $scope.model.config;
        vm.open = open;

        function open() {
            var options = {
                title: "Products",
                view: "/App_Plugins/DataTypes/ProductPicker/productpickereditor.html",
                config: vm.config,
                submit: function (model) {
                    editorService.close();
                    $scope.model.value = model.selectedProduct;
                },
                close: function () {
                    editorService.close();
                }
            };
            editorService.open(options);
        }
    }

    angular.module("umbraco").controller("ProductPicker.Controller", productsController);
})();