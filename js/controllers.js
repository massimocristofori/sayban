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
                uploadPhoto();
            }, function(message) {
                $location.path("/home");
            }, {
                quality: 20,
                allowEdit: true,
                destinationType : camera.DestinationType.FILE_URI,
                   sourceType      : camera.PictureSourceType.PHOTOLIBRARY
            });
        }
        $scope.uploadPhoto =
        function() {
            alert($scope.saybanImage);
            
            var options = new FileUploadOptions();
            
            options.fileKey = "file";
            options.fileName = $scope.saybanImage.substr($scope.saybanImage.lastIndexOf('/') + 1);
            options.mimeType = "image/gif";
           
            /*var params = {};
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;*/
            
            var ft = new FileTransfer();
            
            ft.upload($scope.saybanImage, encodeURI("https://picasaweb.google.com/data/feed/api/user/massimo.cristofori/albumid/default"),
                function win(r) {
                    alert("Code = " + r.responseCode);
                    alert("Response = " + r.response);
                    alert("Sent = " + r.bytesSent);
                },
                function fail(error) {
                    alert(error);
                    alert("An error has occurred: Code = " + error.code);
                    alert("upload error source " + error.source);
                    alert("upload error target " + error.target);
                    alert("upload error status " + error.http_status);
                }, options);
            alert("end upload");
        }
    }
]);