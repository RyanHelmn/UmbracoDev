angular.module("umbraco").controller("Commerce.EditController", function ($scope, $routeParams, commerceResource) {
    var vm = this;
    var type = $routeParams.id.split("?")[0];
    var id = $routeParams.id.split("?")[1].split("=")[1];

    switch (type.toLowerCase()) {
        case "products":
            commerceResource.getProduct(id).then(function (response) {
                var item = response.data;
                processItem(item);
            });
            break;
        case "categories":
            commerceResource.getCategory(id).then(function (response) {
                var item = response.data;
                processItem(item);
            });
            break;
    }

    function processItem(item) {
        var keys = Object.keys(item);
        vm.properties = [];

        keys.forEach(function (key) {
            if (key !== "id") {
                var value = item[key];

                vm.properties.push({
                    value: value,
                    view: commerceResource.getDataTypeFromValue(value),
                    label: key,
                    validation: {
                        required: true
                    }
                });
            }
        });
    }

    vm.save = function () {
        console.log(vm.product);
    }
});