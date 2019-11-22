angular.module("umbraco").controller("Commerce.OverviewController", function ($scope, $location, $routeParams, commerceResource) {

    var vm = this;
    var type = $routeParams.id.substr(0, 1).toUpperCase() + $routeParams.id.substr(1);
    vm.name = vm.type + " Overview";
    vm.add = add;
    vm.edit = edit;
    vm.delete = deleteItem;
    vm.getType = getType;

    switch (type.toLowerCase()) {
        case "products":
            vm.items = [
                {
                    id: 1,
                    name: "Product 1",
                    price: 100,
                    active: true
                },
                {
                    id: 2,
                    name: "Product 2",
                    price: 50,
                    active: false
                }
            ];

            vm.headings = Object.keys(vm.items[0]);
            break;
        case "categories":
            vm.items = [
                {
                    id: 1,
                    name: "Category 1",
                    description: "Some category description",
                    active: true
                },
                {
                    id: 2,
                    name: "Category 2",
                    description: "Some long category description, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare laoreet scelerisque. In non est vestibulum, rutrum ligula et, elementum justo. Ut porta libero ac arcu viverra, sed vehicula urna mollis. Integer sodales orci quis facilisis faucibus. Ut non ullamcorper felis. Ut sit amet sapien velit. Donec sollicitudin, nibh nec scelerisque rhoncus, lectus ex dictum est, et sollicitudin velit felis vitae urna. Nunc in bibendum lacus. Suspendisse vel placerat sem.",
                    active: true
                }
            ];

            vm.headings = Object.keys(vm.items[0]);
            break;
    }

    function add() {
        $location.path("/commerce/commerceTree/add/" + type + "?id=-1");
    }

    function edit(item) {
        $location.path("/commerce/commerceTree/edit/" + type + "?id=" + item.id);
    }

    function deleteItem(item) {
        if (confirm("Are you sure you want to delete " + item.name)) {
            var index = vm.items.indexOf(item);
            vm.items.splice(index, 1);
        }
    }

    function getType(value) {
        return typeof value;
    }
});