var sayban = angular.module('sayban', ['ngRoute', 'myCntrl']);

sayban.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeCntrl'
    })
    .when('/list', {
        templateUrl: 'templates/list.html',
        controller: 'listCntrl'
    })
    .when('/list/:search', {
        templateUrl: 'templates/list.html',
        controller: 'listCntrl'
    })
    .when('/add', {
        templateUrl: 'templates/add.html',
        controller: 'addCntrl'
    })
    .when('/detail', {
        templateUrl: 'templates/detail.html'
    })
    .otherwise({ 
        redirectTo: '/home' 
    });
    
}]);