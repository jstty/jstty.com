module.exports = DataStore;

function DataStore($logger, $q){
  this._projects = require('./data/projects.json');
}

DataStore.prototype.getProjects = function()
{
  return Promise.resolve(this._projects);
}
