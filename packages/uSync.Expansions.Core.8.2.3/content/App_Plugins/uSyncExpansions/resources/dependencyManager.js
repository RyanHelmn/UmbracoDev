(function () {
    'use strict';

    function dependencyManager() {

        var dependencyFlags = {
            none: 0,
            includeChildren: 2,
            includeAncestors: 4,
            includeDependencies: 8,
            includeFiles: 16,
            includeMedia: 32,
            includeLinked: 64,
            includeMediaFiles: 128
        };

        return {
            getFlags: getFlags
        };

        function getFlags(options) {

            var flags = 0;
            if (options.includeChildren) { flags |= dependencyFlags.includeChildren; }
            if (options.includeAncestors) { flags |= dependencyFlags.includeAncestors; }
            if (options.includeDependencies) { flags |= dependencyFlags.includeDependencies; }
            if (options.includeFiles) { flags |= dependencyFlags.includeFiles; }
            if (options.includeMedia) { flags |= dependencyFlags.includeMedia; }
            if (options.includeLinked) { flags |= dependencyFlags.includeLinked; }
            if (options.includeMediaFiles) { flags |= dependencyFlags.includeMediaFiles; }

            return flags; 

        }

    }

    angular.module('umbraco')
        .factory('uSyncDependencyManager', dependencyManager);
})();