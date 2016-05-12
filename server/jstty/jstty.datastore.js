var _ = require('lodash');

module.exports = DataStore;

var logger = null;

function DataStore($logger){
  logger = $logger;
}

DataStore.prototype.$init = function() {
  this._cv = require('./data/cv.json');
};

DataStore.prototype.getFullCV = function()
{
  return Promise.resolve(this._cv);
};

DataStore.prototype.getShowcaseCV = function()
{
  var cv = _.cloneDeep(this._cv);

  return this.getShowcaseProjects(cv.projects)
      .then(function(projects){
        cv.projects = projects;
        return cv;
      });
};


DataStore.prototype.getProjects = function()
{
  return Promise.resolve(this._cv.projects);
};

DataStore.prototype.getShowcaseProjects = function(projects)
{
  if(!projects) {
      projects = _.cloneDeep(this._cv.projects);
  }

  projects = _(projects)
      .filter({ Showcase: true })
      .map(function(project){
        project.Projects = _(project.Projects).filter({ Showcase: true }).value();
        return project;
      })
      .value();

  return Promise.resolve(projects);
};

