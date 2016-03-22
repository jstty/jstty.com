System.register([], function (_export) {
  'use strict';

  var App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      App = (function () {
        function App() {
          _classCallCheck(this, App);
        }

        _createClass(App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'jstty.com';
            config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'sections/welcome/welcome', nav: true, title: 'Welcome!' }, { route: 'projects', name: 'projects', moduleId: 'sections/projects/projects', nav: true, title: 'Projects' }, { route: 'photos', name: 'photos', moduleId: 'sections/photos/photos', nav: true, title: 'Photos' }]);

            this.router = router;
          }
        }, {
          key: 'downloadResume',
          value: function downloadResume() {
            "/api/resume";
          }
        }]);

        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BQWEsR0FBRzs7Ozs7Ozs7O0FBQUgsU0FBRztpQkFBSCxHQUFHO2dDQUFILEdBQUc7OztxQkFBSCxHQUFHOztpQkFDQyx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGtCQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztBQUMzQixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNULEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUcsUUFBUSxFQUFFLDBCQUEwQixFQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNqSCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQU8sSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xILEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBUyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FFM0csQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN0Qjs7O2lCQUVhLDBCQUFHO0FBQ2YseUJBQWEsQ0FBQTtXQUNkOzs7ZUFmVSxHQUFHIiwiZmlsZSI6ImFwcC9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBwIHtcbiAgY29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKSB7XG4gICAgY29uZmlnLnRpdGxlID0gJ2pzdHR5LmNvbSc7XG4gICAgY29uZmlnLm1hcChbXG4gICAgICB7IHJvdXRlOiBbJycsICd3ZWxjb21lJ10sIG5hbWU6ICd3ZWxjb21lJywgIG1vZHVsZUlkOiAnc2VjdGlvbnMvd2VsY29tZS93ZWxjb21lJywgIG5hdjogdHJ1ZSwgdGl0bGU6ICdXZWxjb21lIScgfSxcbiAgICAgIHsgcm91dGU6ICdwcm9qZWN0cycsICAgICAgbmFtZTogJ3Byb2plY3RzJywgbW9kdWxlSWQ6ICdzZWN0aW9ucy9wcm9qZWN0cy9wcm9qZWN0cycsIG5hdjogdHJ1ZSwgdGl0bGU6ICdQcm9qZWN0cycgfSxcbiAgICAgIHsgcm91dGU6ICdwaG90b3MnLCAgICAgICAgbmFtZTogJ3Bob3RvcycsIG1vZHVsZUlkOiAnc2VjdGlvbnMvcGhvdG9zL3Bob3RvcycsIG5hdjogdHJ1ZSwgdGl0bGU6ICdQaG90b3MnIH1cbiAgICAgIC8vIHsgcm91dGU6ICdjaGlsZC1yb3V0ZXInLCAgbmFtZTogJ2NoaWxkLXJvdXRlcicsIG1vZHVsZUlkOiAnY2hpbGQtcm91dGVyJywgbmF2OiB0cnVlLCB0aXRsZTogJ0NoaWxkIFJvdXRlcicgfVxuICAgIF0pO1xuXG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gIH1cblxuICBkb3dubG9hZFJlc3VtZSgpIHtcbiAgICBcIi9hcGkvcmVzdW1lXCJcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
