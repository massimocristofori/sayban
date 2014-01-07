var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/list', {
        templateUrl: 'list.html',
        controller: 'listCntrl'
    })
    .when('/home', {
        templateUrl: 'home.html',
        controller: 'homeCntrl'
    })
    .otherwise({ 
        redirectTo: '/list' 
    });
    
}]);
              

myApp.factory('transiti', function() {
    
    var data = [{
        numeroRapporto: 0,
        pedaggio: 3.50,
        active: false
    }, {
        numeroRapporto: 1,
        pedaggio: 2.70,
        active: false
    }, {
        numeroRapporto: 2,
        pedaggio: 5.10,
        active: false
    }, {
        numeroRapporto: 3,
        pedaggio: 2.00,
        active: false
    }, {
        numeroRapporto: 4,
        pedaggio: 3.00,
        active: false
    }, {
        numeroRapporto: 5,
        pedaggio: 2.70,
        active: false
    }, {
        numeroRapporto: 6,
        pedaggio: 3.00,
        active: false
    }];
    
    return {
        list: function() {
            return data;
        },
        get: function(numeroRapporto) {
            return data[numeroRapporto];
        }
    }
});


myApp.controller("homeCntrl", ['$scope', '$route'
    function($scope, $route) {
        $scope.$route = $route;
    }
]);

myApp.controller("listCntrl", ['$scope', 'transiti', '$routeParams'
    function($scope, transiti, $routeParams) {
                               
        $scope.params = $routeParams;
        $scope.transiti = transiti.list();
                               
        $scope.toggleActive = function(t) {
            t.active = !t.active;
        };
        $scope.total = function() {
            var total = 0;
            angular.forEach(transiti.list(), function(t) {
                if(t.active) {
                    total += t.pedaggio;
                }
            });
            return total;
        };
    }
]);