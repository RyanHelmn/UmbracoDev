(function () {
    'use static';

    function dashboardController($scope, notificationsService, uSyncPublishService) {

        var vm = this;
        vm.loading = true;

        vm.server = {};
        vm.settings = {};

        vm.save = save;

        vm.copyText = copyText;

        vm.groups = [];

        getSettings();

        /////////////////
        function save() {
            saveSettings();
        }

        /////////////////
        function getSettings() {
            uSyncPublishService.getSettings()
                .then(function (result) {
                    vm.loading = false;
                    vm.settings = result.data;
                    vm.groups = vm.settings.SendSettings.Groups.toString();
                });
        }

        function saveSettings() {

            vm.settings.SendSettings.Groups = vm.groups.split(',');

            uSyncPublishService.saveSettings(vm.settings)
                .then(function (result) {
                    notificationsService.success('Save', 'Settings saved');
                }, function (error) {
                        notificationsService.error('Error', error.data.ExceptionMessage);
                });
        }

        function copyText() {
            var copyItem = document.getElementById("serverUrl");
            copyItem.select();
            copyItem.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");
            notificationsService.success('Copied', 'Server url copied to clipboard');
        }
    }

    angular.module('umbraco')
        .controller('uSyncPublisherDashboardController', dashboardController);
})();