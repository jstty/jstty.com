import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Projects {
  heading = 'Projects';
  projects = {};
  isLoading = true;

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://localhost:8000/');
    });

    this.http = http;
  }

  activate() {
    this.isLoading = true;
    this.http.fetch('api/projects')
      .then(response => {
        return this.delay(5000).then(r => response.json());
      })
      .then(projects => {
        this.projects = projects;
        this.isLoading = false;
      });
  }

  delay(time) {
    return new Promise(function (fulfill) {
      setTimeout(fulfill, time);
    });
  }
}
