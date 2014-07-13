define(['angular'], function (angular) {
    'use strict';

    angular.module('app.directive.NavBar', [])
      .directive('jsNavbar', function () {
        return {
          templateUrl: 'views/directives/navbar.html',
          restrict: 'A',
          link: function postLink(scope, element, attrs) {

          }
        };
      });
});