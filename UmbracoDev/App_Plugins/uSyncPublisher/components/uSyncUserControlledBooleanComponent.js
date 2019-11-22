(function () {
    'use strict';

    var userControlledBooleanComponent = {
        templateUrl: Umbraco.Sys.ServerVariables.application.applicationPath + 'App_Plugins/uSyncPublisher/Components/uSyncUserControlledBoolean.html',
        bindings: {
            title: '@',
            option: '='
        },
        controllerAs: 'vm',
        controller: userControlledBooleanController

    };

    function userControlledBooleanController($scope) {

        var vm = this;

        vm.userControlled = userControlled;
        vm.defaultValue = defaultValue;

        vm.toggleDefault = toggleDefault;
        vm.toggleUser = toggleUser;

        function toggleUser() {
            if (vm.option === undefined) {
                vm.option = 'user-yes';
            }

            else if (vm.option.startsWith('user-'))
            {
                vm.option = vm.option.substring(5);
            }
            else {
                vm.option = 'user-' + vm.option;
            }
        }
        function toggleDefault() {

            if (vm.option === undefined) {
                vm.option = 'yes';
            }
            else if (vm.option.substring(vm.option.indexOf('-') + 1) === 'yes') {
                vm.option = vm.option.substring(0, vm.option.indexOf('-') + 1) + 'no';
            }
            else {
                vm.option = vm.option.substring(0, vm.option.indexOf('-') + 1) + 'yes';
            }

        }
        

        function userControlled() {            
            return vm.option !== undefined && vm.option.startsWith('user-');
        }

        function defaultValue() {
            return vm.option !== undefined && vm.option.substring(vm.option.indexOf('-') + 1) === 'yes';
        } 


    }

    angular.module('umbraco')
        .component('usyncUserControlledBoolean', userControlledBooleanComponent);
})();