(function () {
    'use strict';

    var usyncSendOptionComponent = {
        templateUrl: Umbraco.Sys.ServerVariables.application.applicationPath + 'App_Plugins/uSyncPublisher/Components/uSyncSendOption.html',
        bindings: {
            option: '=',
            label: '@',
            description: '@',
            showDisabled: '<'
        },
        controllerAs: 'vm',
        controller: sendOptionController
    };

    function sendOptionController($scope) {

        var vm = this;
        vm.canToggle = canToggle;
        vm.toggle = toggle;


        function canToggle(option) {
            return option.toggle;
        }

        function toggle(option) {
            if (option.toggle) {
                option.value = !option.value;
            }
        }
    }

    angular.module('umbraco')
        .component('usyncSendOption', usyncSendOptionComponent);

})();