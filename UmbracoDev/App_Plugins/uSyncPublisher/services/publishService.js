(function () {
    'use strict';

    function publishService($http) {

        var sendService = Umbraco.Sys.ServerVariables.uSyncPublisher.sendService;
        var publishService = Umbraco.Sys.ServerVariables.uSyncPublisher.publishService;

        var dependencyFlags = {
            none: 0,
            includeChildren: 2,
            includeAncestors: 4,
            includeDependencies: 8,
            includeFiles: 16,
            includeMedia: 32,
            includeLinked: 64
        };

        return {
            // push
            pushItems: pushItems,
            reportItems: reportItems,
            importItems: importItems,

            pushMedia: pushMedia,
            pushFiles: pushFiles,

            // pulls 
            pullItems: pullItems,
            pullReport: pullReport,
            pullImport: pullImport,
            pullMedia: pullMedia,
            pullFiles: pullFiles,
             
            // Server checks 
            getServers: getServers,
            getServer: getServer,
            checkServer: checkServer,

            // settings 
            saveServer: saveServer,
            deleteServer: deleteServer,

            getSettings: getSettings,
            saveSettings: saveSettings
        };

        function getFlags(options) {
            var flags = 0;
            if (options.includeChildren.value) { flags |= dependencyFlags.includeChildren; }
            if (options.includeAncestors.value) { flags |= dependencyFlags.includeAncestors; }
            if (options.includeDependencies.value) { flags |= dependencyFlags.includeDependencies; }
            if (options.includeFiles.value) { flags |= dependencyFlags.includeFiles; }
            if (options.includeMedia.value) { flags |= dependencyFlags.includeMedia; }
            if (options.includeLinked.value) { flags |= dependencyFlags.includeLinked; }

            return flags;
        }


        ////////////////
        /// push 

        function pushItems(server, id, udi, name, flags, clientId) {
            return $http.post(sendService + 'PushItems', 
                {
                    server: server,
                    items: [{
                        id: id,
                        Udi: udi,
                        name: name,
                        flags: getFlags(flags)
                    }],
                    removeOrphans: flags.deleteMissing.value,
                    includeFileHash: flags.includeFiles.value,
                    clientId: clientId
                });
        }

        function reportItems(id, alias, clientId) {
            return $http.get(sendService + 'Report/' + id + '?server=' + alias + '&clientId=' + clientId);
        }

        function importItems(id, alias, clientId, options) {
            return $http.post(sendService + 'Import/' + id + '?server=' + alias + '&clientId=' + clientId, options);
        }

        function pushMedia(id, alias, clientId) {
            return $http.post(sendService + 'PushMedia/' + id + '?server=' + alias + '&clientId=' + clientId);
        }

        function pushFiles(id, alias, clientId) {
            return $http.post(sendService + "PushFiles/" + id + '?server=' + alias + '&clientId=' + clientId);
        }

        /////////////////
        // pulls

        function pullItems(server, id, udi, name, flags, clientId) {
            return $http.post(sendService + 'PullItems',
                {
                    server: server,
                    items: [{
                        id: id,
                        Udi: udi,
                        name: name,
                        flags: getFlags(flags)
                    }],
                    removeOrphans: flags.deleteMissing.value,
                    includeFileHash: flags.includeFiles.value,
                    clientId: clientId
                });
        }

        function pullReport(id, clientId) {
            return $http.get(sendService + 'PullReport/' + id + '?clientId=' + clientId);
        }

        function pullImport(id, clientId) {
            return $http.get(sendService + 'PullImport/' + id + '?clientId=' + clientId);
        }

        function pullMedia(id, server, clientId) {
            return $http.get(sendService + 'PullMedia/' + id + '?server=' + server + '&clientId=' + clientId);
        }

        function pullFiles(id, server, clientId) {
            return $http.get(sendService + 'PullFiles/' + id + '?server=' + server + '&clientId=' + clientId);
        }

        ///////////////////
        /// server checks

        function getServers(action) {
            return $http.get(publishService + 'GetServers/?action=' + action);
        }

        function getServer(alias) {
            return $http.get(publishService + 'GetServer/?alias=' + alias);
        }

        function checkServer(alias) {
            return $http.get(publishService + 'CheckServer/?server=' + alias);
        }

        ///////////////////
        // settings get/set

        function getSettings() {
            return $http.get(publishService + 'GetSettings');
        }

        function saveSettings(settings) {
            return $http.post(publishService + 'SaveSettings', settings);
        }

        function saveServer(server) {
            return $http.post(publishService + 'SaveServer', server);
        }

        function deleteServer(alias) {
            return $http.delete(publishService + 'DeleteServer/?server=' + alias);
        }

    }

    angular.module('umbraco')
        .factory('uSyncPublishService', publishService);
})();