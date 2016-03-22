System.register(['bootstrap'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging();

    aurelia.use.plugin('aurelia-animator-css');

    aurelia.use.plugin('aurelia-html-import-template-loader');

    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }

  return {
    setters: [function (_bootstrap) {}],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRU8sV0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFO0FBQ2pDLFdBQU8sQ0FBQyxHQUFHLENBQ1IscUJBQXFCLEVBQUUsQ0FDdkIsa0JBQWtCLEVBQUUsQ0FBQzs7QUFHeEIsV0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs7QUFJM0MsV0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMscUNBQXFDLENBQUMsQ0FBQTs7QUFFekQsV0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7YUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO0tBQUEsQ0FBQyxDQUFDO0dBQ3hDIiwiZmlsZSI6ImFwcC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdib290c3RyYXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEpIHtcbiAgYXVyZWxpYS51c2VcbiAgICAuc3RhbmRhcmRDb25maWd1cmF0aW9uKClcbiAgICAuZGV2ZWxvcG1lbnRMb2dnaW5nKCk7XG5cbiAgLy9VbmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cgdG8gZW5hYmxlIGFuaW1hdGlvbi5cbiAgYXVyZWxpYS51c2UucGx1Z2luKCdhdXJlbGlhLWFuaW1hdG9yLWNzcycpO1xuICAvL2lmIHRoZSBjc3MgYW5pbWF0b3IgaXMgZW5hYmxlZCwgYWRkIHN3YXAtb3JkZXI9XCJhZnRlclwiIHRvIGFsbCByb3V0ZXItdmlldyBlbGVtZW50c1xuXG4gIC8vQW55b25lIHdhbnRpbmcgdG8gdXNlIEhUTUxJbXBvcnRzIHRvIGxvYWQgdmlld3MsIHdpbGwgbmVlZCB0byBpbnN0YWxsIHRoZSBmb2xsb3dpbmcgcGx1Z2luLlxuICBhdXJlbGlhLnVzZS5wbHVnaW4oJ2F1cmVsaWEtaHRtbC1pbXBvcnQtdGVtcGxhdGUtbG9hZGVyJylcblxuICBhdXJlbGlhLnN0YXJ0KCkudGhlbihhID0+IGEuc2V0Um9vdCgpKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
