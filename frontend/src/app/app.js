export class App {
  configureRouter(config, router) {
    config.title = 'jstty.com';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',  moduleId: 'sections/welcome/welcome',  nav: true, title: 'Welcome!' },
      { route: 'projects',      name: 'projects', moduleId: 'sections/projects/projects', nav: true, title: 'Projects' },
      { route: 'photos',        name: 'photos', moduleId: 'sections/photos/photos', nav: true, title: 'Photos' }
      // { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }

  downloadResume() {
    "/api/resume"
  }
}
