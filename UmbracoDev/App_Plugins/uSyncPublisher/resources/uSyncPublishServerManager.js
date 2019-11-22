(function () {
    'use strict';

    function serverManager() {

        return {
            prepToggles: prepToggles,
        };


        function prepToggles(server) {

            var flags = {};
            var op = server.SendSettings;
            if (op !== undefined) {
                flags.includeAncestors = setToggle(op.IncludeAncestors);
                flags.includeChildren = setToggle(op.IncludeChildren);
                flags.includeDependencies = setToggle(op.IncludeDependencies);
                flags.includeFiles = setToggle(op.IncludeFiles);
                flags.includeLinked = setToggle(op.IncludeLinked);
                flags.includeMedia = setToggle(op.IncludeMedia);
                flags.deleteMissing = setToggle(op.DeleteMissing);
            }

            return flags;
        }

        function setToggle(value) {
            if (value !== undefined && value.startsWith('user')) {
                return { toggle: true, value: value.endsWith('yes') };
            }
            else {
                return { toggle: false, value: value === 'yes' };
            }
        }


    }

    angular.module('umbraco')
        .factory('uSyncPublishServerManager', serverManager);


})();