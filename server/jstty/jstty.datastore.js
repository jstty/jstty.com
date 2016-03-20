module.exports = DataStore;

var logger = null;

function DataStore($logger){
  logger = $logger;
}

DataStore.prototype.$init = function() {
  this._cv = require('./data/cv.json');
};

DataStore.prototype.getCV = function()
{
  return Promise.resolve(this._cv);
};

DataStore.prototype.getProjects = function()
{
  return Promise.resolve(this._cv.projects);
};
