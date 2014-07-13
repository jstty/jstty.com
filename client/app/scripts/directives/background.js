define(['angular'], function (angular) {
    'use strict';

    angular.module('app.directive.Background', [])
      .directive('jsBackground', function () {
        return {
          templateUrl: 'views/directives/background.html',
          restrict: 'A',
          link: function postLink(scope, element, attrs) {

          }
        };
      });
});