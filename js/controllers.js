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

myCntrl.controller('homeCntrl', ['$scope', '$http',
    function($scope, $http) {
        
        $scope.search = "";
        
        $http.get("transiti.json").then(function(response) {
            $scope.informative = response.data;
        });
        
         $scope.list = function() {
            $http.get('/list/');                         
        };
                                 
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

myCntrl.controller('addCntrl', ['$scope', '$http',
    function($scope, $http) {
        
        $scope.search = "";
        
        $http.get("transiti.json").then(function(response) {
            $scope.informative = response.data;
        });
        
         $scope.list = function() {
            $http.get('/list/');                         
        };
                                 
    }
                                 
]);