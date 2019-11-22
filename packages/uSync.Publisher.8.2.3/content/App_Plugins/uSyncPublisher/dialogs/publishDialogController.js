(function () {
    'use strict';

    function publishDialogController($scope, $q,
        notificationsService,
        localizationService,
        uSyncHub,
        uSyncPublishService,
        contentResource) {

        var vm = this;
        vm.loading = true;
        vm.total = 0;

        vm.entity = $scope.model.entity;
        // are we doing content or media 
        vm.isMedia = vm.entity.metaData.application === 'media';

        vm.product = {
            name: Umbraco.Sys.ServerVariables.uSyncPublisher.alias,
            version: Umbraco.Sys.ServerVariables.uSyncPublisher.version
        };

        vm.page = {
            title: 'Publish to another site'
        };

        vm.reportHeader = {
            title: 'Proposed Changes',
            description: 'Things that will be updated on the site'
        };

        vm.step = '';
        vm.update = {
            Message: 'Loading'
        };

        vm.status = {};
        vm.options = {};

        vm.servers = [];
        vm.onSelected = onSelected;

        vm.canpublish = false;
        vm.showDisabled = false;
        vm.flags = {
            includeChildren: { toggle: true, value: true },
            includeMedia: { toggle: true, value: true },
            includeLinked: { toggle: true, value: false },
            includeAncestors: { toggle: false, value: false },
            includeDependencies: { toggle: false, value: false },
            includeFiles: { toggle: false, value: false },
            includeMediaFiles: { toggle: true, value: false },
            deleteMissing: { toggle: true, value: false }
        };



        vm.close = close;
        vm.send = send;
        vm.publish = publish;

        vm.reported = false;
        vm.report = [];
        vm.errors = [];

        vm.target = {};

        init();

        ///
        function init() {

            initHub();

            uSyncPublishService.getServers('push')
                .then(function (result) {
                    vm.servers = result.data;
                    vm.loading = false;
                    checkServers(vm.servers);
                });

            var titleKey = 'usyncpublish_publishTitle';
            if (vm.isMedia) {
                titleKey = 'usyncpublish_publishMediaTitle';
            }

            // localize the dialog
            localizationService.localize(titleKey)
                .then(function (data) { vm.page.title = data; });

            localizationService.localize('usyncpublish_reportTitle')
                .then(function (data) { vm.report.title = data; });

            localizationService.localize('usyncpublish_reportDesc')
                .then(function (data) { vm.report.description = data; });

        }

        function checkServers(servers) {
            servers.forEach(function (server) {
                uSyncPublishService.checkServer(server.Alias)
                    .then(function (result) {
                        server.status = result.data;
                    });
            });
        }

        ///
        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }

        function onSelected(server) {
            vm.selectedServer = server;
            prepToggles(server);
            vm.canpublish = true;
        }


        function prepToggles(server) {

            var op = server.SendSettings;
            if (op !== undefined) {

                vm.flags.includeAncestors = setToggle(op.IncludeAncestors);
                vm.flags.includeChildren = setToggle(op.IncludeChildren);
                vm.flags.includeDependencies = setToggle(op.IncludeDependencies);
                vm.flags.includeFiles = setToggle(op.IncludeFiles);
                vm.flags.includeLinked = setToggle(op.IncludeLinked);
                vm.flags.includeMedia = setToggle(op.IncludeMedia);
                vm.flags.deleteMissing = setToggle(op.DeleteMissing);

                // override the settings for media 
                if (vm.isMedia) {
                    vm.flags.includeMedia = { toggle: false, value: true };
                    vm.flags.includeAncestors = { toggle: false, value: true };
                    vm.flags.includeFiles = { toggle: false, value: false };
                    vm.flags.includeLinked = { toggle: false, value: false };
                }

            }
        }

        function setToggle(value) {
            if (value !== undefined && value.startsWith('user')) {
                return { toggle: true, value: value.endsWith('yes') };
            }
            else {
                return { toggle: false, value: value === 'yes' };
            }
        }

        ///

        function send() {

            vm.working = true;
            vm.buttonState = 'busy';
            vm.step = 'Pushing to ' + vm.selectedServer.Name;

            uSyncPublishService.pushItems(
                vm.selectedServer.Alias,
                vm.entity.id, null, vm.entity.name, vm.flags, getClientId())
                .then(function (result) {
                    var id = result.data;
                    if (id !== '') {
                        vm.target = {
                            id: id,
                            server: vm.selectedServer.Alias
                        };
                        report(vm.target);
                    }
                }, function (error) {
                    notificationsService.error('Error', error.data.ExceptionMessage);
                    vm.errors.push(error.data);
                });
        }

        function report(target) {

            vm.step = 'Getting Change report';
            vm.update.Message = '';

            uSyncPublishService.reportItems(target.id, target.server, getClientId())
                .then(function (result) {
                    vm.report = result.data;
                    vm.reported = true;
                    vm.working = false;
                    vm.buttonState = 'success';
                    vm.page.title = 'Proposed changes to ' + target.server;
                }, function (error) {
                    notificationsService.error('Error', error.data.ExceptionMessage);
                    vm.errors.push(error.data);
                });
        }

        function publish() {
            vm.canpublish = false;
            vm.reported = true;
            vm.working = true;
            vm.buttonState = 'busy';
            vm.step = 'Pushing any required media';
            vm.update.Message = '';

            var promises = [];

            promises.push(uSyncPublishService.pushMedia(vm.target.id, vm.target.server, getClientId())
                .then(function (result) {
                    console.log('media pushed', result.data.length);
                }, function (error) {
                    notificationsService.error('Error', error.data.ExceptionMessage);
                    vm.errors.push(error.data);
                }));

            if (vm.flags.includeFiles) {
                promises.push(uSyncPublishService.pushFiles(vm.target.id, vm.target.server, getClientId())
                    .then(function (result) {
                        console.log('files pushed', result.data.length);
                    }, function (error) {
                        notificationsService.error('Error', error.data.ExceptionMessage);
                        vm.errors.push(error.data);
                    }));
            }

            // 
            $q.all(promises).then(function () {
                if (vm.errors.length === 0) {
                    doImport();
                }
                else {
                    // error :( 
                    vm.working = false;
                }
            });
        }

        function doImport() {

            vm.step = 'Publishing on ' + vm.selectedServer.Name;
            vm.update.Message = '';

            uSyncPublishService.importItems(vm.target.id, vm.target.server, getClientId(), vm.options)
                .then(function (result) {
                    vm.report = result.data;
                    vm.published = true;
                    vm.working = false;
                    vm.buttonState = 'success';
                    vm.page.title = 'Published !';
                    vm.done = true;
                    vm.reportHeader = {
                        title: 'Published Changes',
                        description: 'Items updated on the server'
                    };
                });
        }

        ////// SignalR things 
        function initHub() {
            uSyncHub.initHub(function (hub) {
                vm.hub = hub;

                vm.hub.on('update', function (update) {
                    vm.update = update;
                });

                vm.hub.on('add', function (status) {
                    vm.status = status;
                });

                vm.hub.start();
            });
        }

        function getClientId() {
            if ($.connection !== undefined && $.connection.hub !== undefined) {
                return $.connection.hub.id;
            }
            return "";
        }
    }

    angular.module('umbraco')
        .controller('uSyncPublishDialogController', publishDialogController);
})();