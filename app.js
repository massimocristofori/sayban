var myApp = angular.module('myApp', ['ngRoute', 'myCntrl']);

myApp.config(['$routeProvider', function($routeProvider) {
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
    .when('/payment', {
        templateUrl: 'templates/payment.html'
    })
    .otherwise({ 
        redirectTo: '/home' 
    });
    
}]);