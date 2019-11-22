(function () {
    'use strict';

    var serverPickerComponent = {
        templateUrl: Umbraco.Sys.ServerVariables.application.applicationPath + 'App_Plugins/uSyncPublisher/Components/uSyncServerPicker.html',
        bindings: {
            pickerTitle: '@',
            description: '@',
            servers: '<',
            onSelected: '&'
        },
        controllerAs: 'vm',
        controller: serverPickerController
    };

    function serverPickerController($scope, localizationService) {

        var vm = this;

        vm.selectServer = selectServer;

        vm.$onInit = function () {
            localize();
        };

        function selectServer(server) {
            if (server.status === undefined || server.status.Enabled !== true) {
                return;
            }

            for (let s = 0; s < vm.servers.length; s++) {
                vm.servers[s].selected = false;
            }
            server.selected = true;

            if (vm.onSelected) {
                vm.onSelected({ server: server });
            }
        }


        function localize() {

            if (vm.pickerTitle && vm.pickerTitle[0] === '@') {
                localizationService.localize(vm.pickerTitle.substring(1))
                    .then(function (data) {
                        vm.titleString = data;
                    });
            }
            else {
                vm.titleString = vm.pickerTitle;
            }

            if (vm.description && vm.description[0] === '@') {
                localizationService.localize(vm.description.substring(1))
                    .then(function (data) {
                        vm.descriptionString = data;
                    });
            }
            else {
                vm.descriptionString = vm.description;
            }
        }   

    }

    angular.module('umbraco')
        .component('usyncServerPicker', serverPickerComponent);
})();