var myCntrl = angular.module('myCntrl', []);
/*myCntrl.factory('transiti', ['$http', '$log',
    function($http, $log) {
        var url = "transiti.json";
        $log.info(url);
        var _transiti = $http.get(url).then(function(data) {
            $log.info("-----" + data);
            return data;
        });
        $log.info("++++" + _transiti);
        return _transiti;
    }
]);*/
myCntrl.controller('homeCntrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.search = "";
        $http.get("transiti.json").then(function(response) {
            $scope.informative = response.data;
        });
        $scope.list = function() {
            $http.get('/list/');
        };
        $scope.capturePhotoEdit = function() {
            
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 20,
                allowEdit: true,
                destinationType: destinationType.DATA_URL
            });
        }

        $scope.onFail = function(message) {
            alert('Failed because: ' + message);
        }

        $scope.onPhotoDataSuccess = function(imageData) {
            // Uncomment to view the base64-encoded image data
            // console.log(imageData);
            // Get image handle
            //
            //
            alert("onphoto");
            $location.path("/add");
            var saybanImage = document.getElementById('saybanImage');
            // Unhide image elements
            //
            saybanImage.style.display = 'block';
            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            saybanImage.src = "data:image/jpeg;base64," + imageData;
        }
    }
]);
myCntrl.controller("listCntrl", ['$scope', '$http', '$log', '$routeParams',
    function($scope, $http, $log, $routeParams) {
        $scope.search = $routeParams.search;
        $http.get("transiti.json").then(function(response) {
            $scope.transiti = response.data;
        });
        $scope.toggleActive = function(t) {
            t.active = !t.active;
        };
        $scope.sum = function() {
            var total = 0;
            angular.forEach($scope.transiti, function(t) {
                if(t.active) {
                    total += t.pedaggio;
                }
            });
            return total;
        };
    }
]);
myCntrl.controller('addCntrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.search = "";
        $http.get("transiti.json").then(function(response) {
            $scope.informative = response.data;
        });
        $scope.list = function() {
            $http.get('/list/');
        };
    }
]);