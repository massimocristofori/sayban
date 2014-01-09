var saybanCntrl = angular.module('saybanCntrl', []);
saybanCntrl.factory('phonegapReady', function($rootScope) {
    return function(fn) {
        var queue = [];
        var impl = function() {
            queue.push(Array.prototype.slice.call(arguments));
        };
        document.addEventListener('deviceready', function() {
            queue.forEach(function(args) {
                fn.apply(this, args);
            });
            impl = fn;
        }, false);
        return function() {
            return impl.apply(this, arguments);
        };
    };
});
saybanCntrl.factory('camera', function($rootScope, phonegapReady) {
    return {
        capturePhoto: phonegapReady(function(onSuccess, onError, options) {
            navigator.camera.getPicture(function() {
                var that = this;
                args = arguments;
                if(onSuccess) {
                    $rootScope.$apply(function() {
                        onSuccess.apply(that, args);
                    });
                }
            }, function() {
                var that = this;
                args = arguments;
                if(onError) {
                    $rootScope.$apply(function() {
                        onError.apply(that, args);
                    });
                }
            }, options);
        })
    };
});
saybanCntrl.factory('geolocation', function($rootScope, phonegapReady) {
    return {
        getCurrentPosition: phonegapReady(function(onSuccess, onError, options) {
            navigator.geolocation.getCurrentPosition(function() {
                    var that = this,
                        args = arguments;
                    if(onSuccess) {
                        $rootScope.$apply(function() {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function() {
                    var that = this,
                        args = arguments;
                    if(onError) {
                        $rootScope.$apply(function() {
                            onError.apply(that, args);
                        });
                    }
                },
                options);
        })
    };
});
saybanCntrl.controller('homeCntrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        /*$scope.search = "";
        $http.get("transiti.json").then(function(response) {
            $scope.informative = response.data;
        });
        $scope.list = function() {
            $http.get('/list/');
        }
        $scope.capturePhotoEdit = function() {
            alert("capture " + navigator);
            camera.capturePhoto(function(imageData) {
                alert("onphoto");
                $location.path("/add");
                
                $scope.saybanImage = "data:image/jpeg;base64," + imageData;
            }, function(message) {
                alert('Failed because: ' + message);
            }, {
                quality: 20,
                allowEdit: true
            });
            alert("capture end");
        }*/
    }
]);
saybanCntrl.controller('addCntrl', ['$scope', '$http', '$location', 'camera', 'geolocation',
    function($scope, $http, $location, camera, geolocation) {
        $scope.captured = false;
        $scope.saybanImage = "";
        $scope.currentLatitude = "";
        $scope.currentLongitude = "";
        $scope.currentTimestamp = "";
        $scope.capturePhoto = function() {
            camera.capturePhoto(function(imageData) {
                $scope.saybanImage = imageData;
                geolocation.getCurrentPosition(function(position) {
                    $scope.currentLatitude = position.coords.latitude;
                    $scope.currentLongitude = position.coords.longitude;
                    $scope.currentTimestamp = position.timestamp;
                });
                $scope.captured = true;
            }, function(message) {
                $location.path("/home");
            }, {
                quality: 20,
                allowEdit: true
            });
        }
    }
]);