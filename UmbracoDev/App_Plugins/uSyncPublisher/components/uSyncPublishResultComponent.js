(function () {

    'use strict';

    var publishResultComponent = {
        templateUrl: Umbraco.Sys.ServerVariables.application.applicationPath + 'App_Plugins/uSyncPublisher/Components/uSyncPublishResult.html',
        bindings: {
            results: '<',
            total: '='
        },
        controllerAs: 'vm',
        controller: publishResultController
    };

    function publishResultController($scope, editorService) {

        var vm = this;

        // public methods
        vm.getTypeName = getTypeName;
        vm.showResult = showResult;
        vm.openDetail = openDetail;

        // public properties
        vm.groups = [];
        vm.total = 0;

        // intialization
        vm.$onInit = function () {
            vm.groups = groupByType(vm.results);
            vm.total = totalChanges();
        };

        /////////

        function openDetail(item) {
            var options = {
                item: item,
                title: 'uSync Change',
                view: Umbraco.Sys.ServerVariables.application.applicationPath + "App_Plugins/uSync8/changeDialog.html",
                close: function () {
                    editorService.close();
                }
            };
            editorService.open(options);
        }


        function getTypeName(typeName) {
            var umbType = typeName.substring(0, typeName.indexOf(','));
            return umbType.substring(umbType.lastIndexOf('.') + 2);
        }

        function groupByType(results) {

            var groups = [];

            results.map(function (item) {
                var found = false;

                groups.map(function (group) {
                    if (group.type === item.ItemType) {
                        group.items.push(item);
                        found = true;
                    }
                });

                if (!found) {
                    var newGroup = {
                        type: item.ItemType,
                        name: getTypeName(item.ItemType),
                        items: [],
                        showGroup: true
                    };
                        
                    newGroup.items.push(item);
                    groups.unshift(newGroup);
                }
            });

            for (let i = 0; i < groups.length; i++) {
                groups[i].itemCount = itemCount(groups[i].items);
                groups[i].changes = changeCount(groups[i].items);
            }

            return groups;
        }

        function itemCount(results) {

            var count = 0;
            for (let i = 0; i < results.length; i++) {
                if (results[i].Change !== 'Clean') {
                    count++;
                }
            }
            return count;
        }

        function totalChanges() {
            var total = 0;
            angular.forEach(vm.groups, function (group, key) {
                total += changeCount(group.items);
            });

            return total;
        }

        function changeCount(changes) {
            var count = 0;
            angular.forEach(changes, function (val, key) {
                if (val.Change !== 'NoChange' && val.Change !== 'Clean') {
                    count++;
                }
            });

            return count;
        }


        function showResult(result) {
            return result.Change !== 'Clean' && result.Change !== 'NoChange';
        }
    }

    angular.module('umbraco')
        .component('usyncPublishResultView', publishResultComponent);
})();