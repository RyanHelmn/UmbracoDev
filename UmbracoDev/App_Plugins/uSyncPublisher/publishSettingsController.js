(function () {
    'use strict';

    function publishSettingsController($scope, uSyncPublishService)
    {
        var vm = this;

        init();

        function init() {
            loadServers();
        }

        ////////

        function loadServers() {
            uSyncPublishService.getServers('push')
                .then(function (result) {
                    vm.servers = result.data;
                });
        }
    }

    angular.module('umbraco')
        .controller('uSyncPublishSettingsController', publishSettingsController);

})(); 