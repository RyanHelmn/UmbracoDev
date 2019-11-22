(function () {
    'use strict';

    function deleteController($scope,
        treeService,
        navigationService,
        notificationsService,
        uSyncPublishService) {
        var vm = this;

        vm.alias = $scope.currentNode.id;

        vm.cancel = cancel;
        vm.performDelete = performDelete;

        ///////
        function performDelete() {
            uSyncPublishService.deleteServer(vm.alias)
                .then(function (result) {

                    var rootNode = treeService.getTreeRoot($scope.currentNode);
                    treeService.removeNode($scope.currentNode);
                    navigationService.hideMenu();

                    notificationsService.success("deleted", "Server has been removed");
                });
        }


        function cancel() {
            navigationService.hideDialog();
        }
    }

    angular.module('umbraco')
        .controller('uSyncPublishDeleteController', deleteController);

})();