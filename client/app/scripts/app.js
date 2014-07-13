/*jshint unused: vars */
define([
    'angular',
    'controllers/home',
    'controllers/portfolio',
    'directives/navbar',
    'directives/background',
]/*deps*/,
    function (angular, HomeCtrl, PortfolioCtrl) {
  'use strict';

  return angular.module('jsttyApp', [
      'app.controllers.HomeCtrl',
      'app.controllers.PortfolioCtrl',
      'app.directive.NavBar',
      'app.directive.Background',
/*angJSDeps*/
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        })
        .when('/portfolio', {
          templateUrl: 'views/portfolio.html',
          controller: 'PortfolioCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});
