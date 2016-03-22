import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import _ from 'lodash';
import moment from 'moment';

@inject(HttpClient)
export class Projects {
  heading = 'Projects';
  projects = {};
  isLoading = true;

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:8000/');
    });

    this.http = http;
  }

  activate() {
    this.isLoading = true;
    this.http.fetch('api/projects')
      .then(response => response.json())
      .then(projects => {
        this.projects = this.processProject(projects);
        this.isLoading = false;
      });
  }

  processProject(projects)
  {
    var list = _.filter(projects, {'Category': 'Industry', 'Showcase': true } );
    // sort list
    list.sort(function(a, b){
      return moment(b.StartDate, 'MM/YYYY').diff(moment(a.StartDate, 'MM/YYYY'));
    });
    _.forEach(list, function(item){
      item.Projects = _.filter(item.Projects, { 'Showcase': true } );
    });
    //

    return projects;
  };

  delay(time) {
    return new Promise(function (fulfill) {
      setTimeout(fulfill, time);
    });
  }
}
