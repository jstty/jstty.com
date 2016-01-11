module.exports = DataStore;

var logger = null;

function DataStore($logger){
  logger = $logger;
}

DataStore.prototype.$init = function() {
  this._projects = require('./data/projects.json');
};

DataStore.prototype.getProjects = function()
{
  return Promise.resolve(this._projects);
};
