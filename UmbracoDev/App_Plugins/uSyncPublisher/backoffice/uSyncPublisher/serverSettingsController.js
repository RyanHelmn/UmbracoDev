(function () {
    'use strict';

    function serverSettingsController($scope, $routeParams, $timeout,
        navigationService, notificationsService,
        uSyncPublishService) {
        var vm = this;
        vm.loading = true;
        vm.buttonState = 'init';
        vm.checkStatus = 'init';

        vm.status = {};
        vm.server = {
            Id: '',
            SendSettings: {},
            Icon: 'icon-server'
        };

        vm.checked = false; 

        vm.page = {
            title: 'server name',
            description: 'server description'
        };

        vm.alias = $routeParams.id;
        vm.save = saveServer;
        vm.checkServer = checkServer;

        if (vm.alias !== '-1') {
            loadServer();
        }
        else {
            // create 
            vm.loading = false; 
        }

        $timeout(function () {
            navigationService.syncTree({ tree: "uSyncPublisher", path: vm.alias });
        });


        ////////////////

        function loadServer() {
            uSyncPublishService.getServer(vm.alias)
                .then(function (result) {
                    vm.server = result.data;
                    vm.loading = false;
                    vm.groups = vm.server.SendSettings.Groups.toString();
                }, function (error) {
                    notificationsService.error('error', error.data.ExceptionMessage);
                });
        }

        function saveServer() {

            vm.server.SendSettings.Groups = vm.groups.split(',');

            vm.saved = false;
            vm.buttonState = 'busy';
            uSyncPublishService.saveServer(vm.server)
                .then(function (result) {
                    vm.buttonState = 'success';
                    notificationsService.success('saved', 'server settings updated');
                    vm.saved = true;
                    vm.checked = false;
                }, function (error) {
                    vm.buttonState = 'error';
                    notificationsService.error('error', error.data.ExceptionMessage);
                });
        }

        function checkServer() {
            vm.checked = true;
            vm.checkStatus = 'busy';
            vm.status = {};
            uSyncPublishService.checkServer(vm.server.Alias)
                .then(function (result) {
                    vm.checkStatus = 'success';
                    vm.status = result.data;
                    vm.saved = false;
                });
        }

    }

    angular.module('umbraco')
        .controller('uSyncPublisherServerSettingsController', serverSettingsController);
})();