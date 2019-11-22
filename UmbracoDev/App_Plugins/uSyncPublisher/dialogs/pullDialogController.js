(function () {
    'use strict';

    function pullDialogController($scope, $q, contentResource, mediaResource,
        notificationsService,
        localizationService,
        uSyncHub, uSyncPublishService) {

        var vm = this;
        vm.close = close;

        vm.loading = true;
        vm.total = 0;   

        vm.product = {
            name: Umbraco.Sys.ServerVariables.uSyncPublisher.alias,
            version: Umbraco.Sys.ServerVariables.uSyncPublisher.version
        };

        vm.entity = $scope.model.entity;
        vm.isMedia = vm.entity.metaData.application === 'media';

        vm.page = {
            title: 'Pull content from another site'
        };

        vm.reportHeader = {
            title: 'Proposed Changes',
            description: 'Things that will be imported onto this site'
        };

        vm.servers = [];
        vm.onSelected = onSelected;
        vm.picked = false; 

        vm.showDisabled = false; 
        vm.flags = {
            includeChildren: { toggle: true, value: true },
            includeMedia: { toggle: true, value: true },
            includeLinked: { toggle: true, value: false },
            includeAncestors: { toggle: false, value: false },
            includeDependencies: { toggle: false, value: false },
            includeFiles: { toggle: false, value: false },
            includeMediaFiles: { toggle: true, value: false },
            deleteMissing: { toggle: true, value: true }
        };

        vm.pull = pull;
        vm.report = report;
        vm.apply = apply;

        vm.step = '';
        vm.update = {
            message: ''
        };

        init();

        function init() {

            initHub();

            uSyncPublishService.getServers('pull')
                .then(function (result) {
                    vm.servers = result.data;
                    checkServers(vm.servers);
                    vm.loading = false;
                });

            if (!vm.isMedia) {
                contentResource.getById($scope.model.entity.id)
                    .then(function (content) {
                        vm.content = content;
                    });
            }
            else {
                mediaResource.getById($scope.model.entity.id)
                    .then(function (content) {
                        vm.content = content;
                    });
            }

            var titleKey = 'usyncpublish_pullTitle';
            if (vm.isMedia) {
                titleKey = 'usyncpublish_pullMediaTitle';
            }

            localizationService.localize(titleKey)
                .then(function (data) { vm.page.title = data; });

            localizationService.localize('usyncpublish_reportPullTitle')
                .then(function (data) { vm.report.title = data; });

            localizationService.localize('usyncpublish_reportPullDesc')
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

        ////////

        function pull() {
            vm.working = true;
            vm.buttonState = 'busy';
            vm.step = 'Pulling from ' + vm.selectedServer.Name;

            uSyncPublishService.pullItems(
                vm.selectedServer.Alias,
                vm.content.id, vm.content.udi, vm.content.name, vm.flags, getClientId())
                .then(function (result) {
                    vm.pullId = result.data;

                    if (vm.pullId !== '') {
                        report(vm.pullId);
                    }
                });
        }

        function report(id) {
            vm.step = 'Generating Change Report';
            vm.update.message = '';

            uSyncPublishService.pullReport(id, getClientId())
                .then(function (result) {
                    vm.report = result.data;
                    vm.reported = true;
                    vm.working = false;
                    vm.buttonState = 'success';
                    vm.page.title = 'Incoming changes from ' + vm.selectedServer.Name;
                });
        }


        function apply() {

            vm.picked = false;
            vm.working = true;

            vm.step = 'Getting Media ' + vm.selectedServer.Name;
            vm.update.message = '';

            var promises = [];

            var errors = false; 

            promises.push(uSyncPublishService.pullMedia(vm.pullId, vm.selectedServer.Alias, getClientId())
                .then(function (result) {
                    console.log('media pulled', result.data.length);
                }, function (error) {
                        notificationsService.error('Error', error.data.ExceptionMessage);
                        errors = true;
                }));

            if (vm.flags.includeFiles) {
                promises.push(uSyncPublishService.pullFiles(vm.pullId, vm.selectedServer.Alias, getClientId())
                    .then(function (result) {
                        console.log('files pulled', result.data.length);
                    }, function (error) {
                        notificationsService.error('Error', error.data.ExceptionMessage);
                            errors = true;
                    }));
            }

            // 
            $q.all(promises).then(function () {
                if (!errors) {
                    doImport();
                }
                else {
                    // something went wrong. 
                }
            });
        }

        function doImport()
        {
            vm.step = 'Importing from ' + vm.selectedServer.Name;
            vm.update.message = '';

            uSyncPublishService.pullImport(vm.pullId, getClientId())
                .then(function (result) {
                    vm.report = result.data;
                    vm.imported = true;
                    vm.working = false;
                    vm.buttonState = 'success';
                    vm.page.title = 'Imported !';
                    vm.done = true;
                    vm.reportHeader = {
                        title: 'Imported Changes',
                        description: 'Items imported from ' + vm.selectedServer.Name
                    };
                });
        }

        ////////
        function onSelected(server) {
            vm.selectedServer = server;
            prepToggles(server);
            vm.picked = true;
        }

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }

        /////////
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
        .controller('uSyncPullDialogController', pullDialogController);
})();