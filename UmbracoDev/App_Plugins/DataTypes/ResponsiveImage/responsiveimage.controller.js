angular.module("umbraco")
    .controller("ResponsiveImage.Controller",
        function ($scope, editorService, angularHelper) {

            var config = angular.copy($scope.model.config);
            var currentForm = angularHelper.getCurrentForm($scope);
            var unsubscribe = $scope.$on('formSubmitting', function () {
                $scope.currentCrop = null;
                $scope.currentPoint = null;
            });

            $scope.imageLoaded = imageLoaded;
            $scope.cropImage = cropImage;
            $scope.done = done;
            $scope.clear = clear;
            $scope.reset = reset;
            $scope.close = close;
            $scope.focalPointChanged = focalPointChanged;

            $scope.addImage = function () {
                editorService.mediaPicker({
                    onlyImages: true,
                    multiPicker: false,
                    submit: function (item) {
                        var image = item.selection[0];
                        $scope.model.value = {
                            url: image.image
                        }

                        $scope.imageSrc = $scope.model.value.url;
                        $scope.model.value.crops = config.crops;

                        editorService.close()
                    },
                    close: function () {
                        editorService.close();
                    }
                })
            }

            if ($scope.model.value) {
                $scope.imageSrc = $scope.model.value.url;

                if ($scope.model.value.crops) {
                    _.each($scope.model.value.crops, function (saved) {
                        var configured = _.find(config.crops, function (item) {
                            return item.alias === saved.alias;
                        });
                        if (configured && configured.height === saved.height && configured.width === saved.width) {
                            configured.coordinates = saved.coordinates;
                        }
                    });

                    $scope.model.value.crops = config.crops;

                    if (!$scope.model.value.focalPoint) {
                        $scope.model.value.focalPoint = {
                            left: 0.5,
                            top: 0.5
                        };
                    }
                }
            }

            function setModelValueWithSrc(src) {
                if (!$scope.model.value || !$scope.model.value.src) {
                    $scope.model.value = angular.extend(angular.copy($scope.model.config), { src: src });
                }
            }

            function focalPointChanged(left, top) {
                $scope.model.value.focalPoint = {
                    left: left,
                    top: top
                };

                $scope.responsiveImageForm.$setDirty();
            }

            function cropImage(targetCrop) {
                if (!$scope.currentCrop) {
                    $scope.currentCrop = angular.copy(targetCrop);
                    $scope.currentPoint = null;
                    $scope.responsiveImageForm.$setDirty();
                } else {
                    close();
                    $timeout(function () {
                        cropImage(targetCrop);
                        $scope.pendingCrop = false;
                    });
                    $scope.pendingCrop = true;
                }
            }

            function done() {
                if (!$scope.currentCrop) {
                    return;
                }

                var editedCrop = _.find($scope.model.value.crops, function (crop) {
                    return crop.name === $scope.currentCrop.name;
                });

                editedCrop.coordinates = $scope.currentCrop.coordinates;
                $scope.close();
                $scope.responsiveImageForm.$setDirty();
            }

            function reset() {
                $scope.currentCrop.coordinates = undefined;
                $scope.done();
            }

            function close() {
                $scope.currentCrop = undefined;
                $scope.currentPoint = undefined;
            }

            function clear(crop) {
                $scope.imageSrc = null;
                if ($scope.model.value) {
                    $scope.model.value = null;
                }

                $scope.responsiveImageForm.$setDirty();
            }

            function imageLoaded(isCroppable, hasDimensions) {
                $scope.isCroppable = isCroppable;
                $scope.hasDimensions = hasDimensions;
            }

            $scope.$on('$destroy', function () {
                unsubscribe();
            });

        });