System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'lodash', 'moment'], function (_export) {
  'use strict';

  var inject, HttpClient, _, moment, Projects;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}, function (_lodash) {
      _ = _lodash['default'];
    }, function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      Projects = (function () {
        function Projects(http) {
          _classCallCheck(this, _Projects);

          this.heading = 'Projects';
          this.projects = {};
          this.isLoading = true;

          http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('http://localhost:8000/');
          });

          this.http = http;
        }

        _createClass(Projects, [{
          key: 'activate',
          value: function activate() {
            var _this = this;

            this.isLoading = true;
            this.http.fetch('api/projects').then(function (response) {
              return response.json();
            }).then(function (projects) {
              _this.projects = _this.processProject(projects);
              _this.isLoading = false;
            });
          }
        }, {
          key: 'processProject',
          value: function processProject(projects) {
            var list = _.filter(projects, { 'Category': 'Industry', 'Showcase': true });

            list.sort(function (a, b) {
              return moment(b.StartDate, 'MM/YYYY').diff(moment(a.StartDate, 'MM/YYYY'));
            });
            _.forEach(list, function (item) {
              item.Projects = _.filter(item.Projects, { 'Showcase': true });
            });

            return projects;
          }
        }, {
          key: 'delay',
          value: function delay(time) {
            return new Promise(function (fulfill) {
              setTimeout(fulfill, time);
            });
          }
        }]);

        var _Projects = Projects;
        Projects = inject(HttpClient)(Projects) || Projects;
        return Projects;
      })();

      _export('Projects', Projects);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZWN0aW9ucy9wcm9qZWN0cy9wcm9qZWN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUNBT2EsUUFBUTs7Ozs7Ozs7aUNBUGIsTUFBTTs7dUNBQ04sVUFBVTs7Ozs7OztBQU1MLGNBQVE7QUFLUixpQkFMQSxRQUFRLENBS1AsSUFBSSxFQUFFOzs7ZUFKbEIsT0FBTyxHQUFHLFVBQVU7ZUFDcEIsUUFBUSxHQUFHLEVBQUU7ZUFDYixTQUFTLEdBQUcsSUFBSTs7QUFHZCxjQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ3ZCLGtCQUFNLENBQ0gsd0JBQXdCLEVBQUUsQ0FDMUIsV0FBVyxDQUFDLHdCQUF3QixDQUFDLENBQUM7V0FDMUMsQ0FBQyxDQUFDOztBQUVILGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCOztxQkFiVSxRQUFROztpQkFlWCxvQkFBRzs7O0FBQ1QsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FDNUIsSUFBSSxDQUFDLFVBQUEsUUFBUTtxQkFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2FBQUEsQ0FBQyxDQUNqQyxJQUFJLENBQUMsVUFBQSxRQUFRLEVBQUk7QUFDaEIsb0JBQUssUUFBUSxHQUFHLE1BQUssY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLG9CQUFLLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1dBQ047OztpQkFFYSx3QkFBQyxRQUFRLEVBQ3ZCO0FBQ0UsZ0JBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUUsQ0FBQzs7QUFFNUUsZ0JBQUksQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQ3RCLHFCQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQzVFLENBQUMsQ0FBQztBQUNILGFBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVMsSUFBSSxFQUFDO0FBQzVCLGtCQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFDO2FBQ2hFLENBQUMsQ0FBQzs7QUFHSCxtQkFBTyxRQUFRLENBQUM7V0FDakI7OztpQkFFSSxlQUFDLElBQUksRUFBRTtBQUNWLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFO0FBQ3BDLHdCQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNCLENBQUMsQ0FBQztXQUNKOzs7d0JBNUNVLFFBQVE7QUFBUixnQkFBUSxHQURwQixNQUFNLENBQUMsVUFBVSxDQUFDLENBQ04sUUFBUSxLQUFSLFFBQVE7ZUFBUixRQUFRIiwiZmlsZSI6ImFwcC9zZWN0aW9ucy9wcm9qZWN0cy9wcm9qZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcbmltcG9ydCAnZmV0Y2gnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuQGluamVjdChIdHRwQ2xpZW50KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzIHtcbiAgaGVhZGluZyA9ICdQcm9qZWN0cyc7XG4gIHByb2plY3RzID0ge307XG4gIGlzTG9hZGluZyA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoaHR0cCkge1xuICAgIGh0dHAuY29uZmlndXJlKGNvbmZpZyA9PiB7XG4gICAgICBjb25maWdcbiAgICAgICAgLnVzZVN0YW5kYXJkQ29uZmlndXJhdGlvbigpXG4gICAgICAgIC53aXRoQmFzZVVybCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwLycpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5odHRwID0gaHR0cDtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmh0dHAuZmV0Y2goJ2FwaS9wcm9qZWN0cycpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihwcm9qZWN0cyA9PiB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2Nlc3NQcm9qZWN0KHByb2plY3RzKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc1Byb2plY3QocHJvamVjdHMpXG4gIHtcbiAgICB2YXIgbGlzdCA9IF8uZmlsdGVyKHByb2plY3RzLCB7J0NhdGVnb3J5JzogJ0luZHVzdHJ5JywgJ1Nob3djYXNlJzogdHJ1ZSB9ICk7XG4gICAgLy8gc29ydCBsaXN0XG4gICAgbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIG1vbWVudChiLlN0YXJ0RGF0ZSwgJ01NL1lZWVknKS5kaWZmKG1vbWVudChhLlN0YXJ0RGF0ZSwgJ01NL1lZWVknKSk7XG4gICAgfSk7XG4gICAgXy5mb3JFYWNoKGxpc3QsIGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgaXRlbS5Qcm9qZWN0cyA9IF8uZmlsdGVyKGl0ZW0uUHJvamVjdHMsIHsgJ1Nob3djYXNlJzogdHJ1ZSB9ICk7XG4gICAgfSk7XG4gICAgLy9cblxuICAgIHJldHVybiBwcm9qZWN0cztcbiAgfTtcblxuICBkZWxheSh0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChmdWxmaWxsKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bGZpbGwsIHRpbWUpO1xuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
