﻿(function () {
    'use strict';

    var listSnapshotsComponent = {
        templateUrl: Umbraco.Sys.ServerVariables.application.applicationPath + 'App_Plugins/uSyncSnapshots/Components/listSnapshotsComponent.html',
        controllerAs: 'vm',
        controller: listSnapshotsController
    };

    function listSnapshotsController(
        $scope, $rootScope,
        uSyncSnapshotService, uSyncHub,
        notificationsService, editorService) {

        var vm = this;
        vm.loading = true;
        vm.snapshots = [];


        vm.getSnapshots = getSnapshots;

        vm.remove = remove;
        vm.apply = apply;
        vm.download = download;
        vm.downloadAll = downloadAll;
        vm.importDialog = importDialog;

        vm.applyAll = applyAll;

        vm.report = report;
        vm.reportAll = reportAll;

        vm.working = false;
        vm.action = 'report';
        vm.results = [];
        vm.reported = false;

        initHub();
        getSnapshots();

        $scope.$on('usync-snapshot-reloaded', function () {
            vm.getSnapshots();
        });


        ///////////
        function getSnapshots() {
            uSyncSnapshotService.getSnapshots()
                .then(function (result) {
                    vm.snapshots = result.data;
                    vm.loading = false;
                });
        }

        function apply(alias) {
            vm.working = true;
            vm.reported = false;
            vm.action = 'Import';
            uSyncSnapshotService.apply(alias, getClientId())
                .then(function (result) {
                    vm.working = false;
                    vm.reported = true;
                    vm.results = result.data;
                    $rootScope.$broadcast('usync-snapshot-reloaded');
                }, function (error) {
                    vm.working = false;
                    notificationsService.error("Error", error.data.ExceptionMessage);
                });
        }

        function applyAll() {
            vm.working = true;
            vm.reported = false;
            vm.action = 'Import';
            uSyncSnapshotService.applyAll(getClientId())
                .then(function (result) {
                    vm.working = false;
                    vm.reported = true;
                    vm.results = result.data;
                    $rootScope.$broadcast('usync-snapshot-reloaded');
                }, function (error) {
                    vm.working = false;
                    notificationsService.error("Error", error.data.ExceptionMessage);
                });
        }

        function report(alias) {
            vm.working = true;
            vm.reported = false;
            vm.action = 'Report';
            uSyncSnapshotService.report(alias, getClientId())
                .then(function (result) {
                    vm.working = false;
                    vm.reported = true;
                    vm.results = result.data;
                }, function (error) {
                    vm.working = false;
                    notificationsService.error("error", error.data.ExceptionMessage);
                });
        }

        function reportAll() {
            vm.working = true;
            vm.reported = false;
            vm.action = 'Report';
            uSyncSnapshotService.reportAll(getClientId())
                .then(function (result) {
                    vm.working = false;
                    vm.reported = true;
                    vm.results = result.data;
                }, function (error) {
                    vm.working = false;
                    notificationsService.error("error", error.data.ExceptionMessage);
                });
        }


        function remove(alias) {

            vm.loading = true;

            uSyncSnapshotService.remove(alias)
                .then(function (result) {
                    getSnapshots();
                }, function (error) {
                    working = false;
                    notificationsService.error("error", error.data.ExceptionMessage);
                });
        }

        function download(snapshot) {
            uSyncSnapshotService.download(snapshot.Alias)
                .then(function (result) {
                    vm.buttonState = 'success';
                }, function (error) {
                    vm.buttonState = 'error';
                    notificationsService.error("error", error.data.ExceptionMessage);
                });
        }

        function downloadAll() {
            uSyncSnapshotService.downloadAll()
                .then(function (result) {
                    vm.buttonState = 'success';
                }, function (error) {
                    vm.buttonState = 'error';
                    notificationsService.error("error", error.data.ExceptionMessage);
                });
        }

        function importDialog() {

            editorService.open({

                title: 'Import Snapshot File',
                view: '/App_Plugins/uSyncSnapshots/dialog/importDialog.html',
                size: 'small',
                submit: function (done) {
                    editorService.close();
                    $rootScope.$broadcast('usync-snapshot-reloaded');
                },
                close: function () {
                    editorService.close();
                }
            });
        }

        function initHub() {
            uSyncHub.initHub(function (hub) {
                vm.hub = hub;

                vm.hub.on('add', function (data) {
                    vm.status = data;
                });

                vm.hub.on('update', function (update) {
                    vm.update = update;
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
        .component('usyncSnapshotsList', listSnapshotsComponent);
})();