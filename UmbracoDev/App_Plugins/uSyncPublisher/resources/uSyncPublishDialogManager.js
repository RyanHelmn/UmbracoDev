(function () {
    'use strict';

    function dialogManager($timeout, editorService, navigationService) {

        return {
            openPublishDialog: openPublishDialog,
            openPullDialog: openPullDialog,

            openMediaPush: openMediaPush,
            openMediaPull: openMediaPull
        };

        function openPublishDialog(options, cb) {
            openSyncDialog('Publish to...', 'publish', options, cb);
        }

        function openPullDialog(options, cb) {
            openSyncDialog('Pull content..', 'pull', options, cb);
        }

        function openSyncDialog(dialogTitle, dialogView, options, cb) {
            editorService.open({
                entity: options.entity,
                title: dialogTitle,
                size: 'small',
                view: Umbraco.Sys.ServerVariables.umbracoSettings.appPluginsPath + '/uSyncPublisher/dialogs/' + dialogView + '.html',
                submit: function (done) {
                    editorService.close();
                    if (cb !== undefined) {
                        cb(true);
                    }
                },
                close: function () {
                    editorService.close();
                    if (cb !== undefined) {
                        cb(false);
                    } 
                }
            });

            // wrap in a timeout, get rid of the 'bounce' 
            $timeout(function () {
                navigationService.hideDialog();
            });
        }

        function openMediaPush(options, cb) {
            openSyncDialog('Push Media', 'publish', options, cb);
        }

        function openMediaPull(options, cb) {
            openSyncDialog('Pull Media', 'pull', options, cb);
        }
    }

    angular.module('umbraco')
        .factory('uSyncPublishDialogManager', dialogManager);
})();