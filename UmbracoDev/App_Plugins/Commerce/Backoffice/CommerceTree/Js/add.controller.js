angular.module("umbraco").controller("Commerce.AddController", function ($scope, $routeParams, commerceResource) {
    var vm = this;
    var addType = $routeParams.id;

    vm.name = "Add New " + addType.substr(0, 1).toUpperCase() + addType.substr(1);

    vm.save = function() {
        console.log(vm.product);
    }
});