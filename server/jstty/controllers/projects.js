module.exports = ProjectsCtrl;

function ProjectsCtrl($logger){
    $logger.log('JStty - Projects Ctrl Init');
}

// localhost:8000/api/projects
ProjectsCtrl.prototype.index = function($done, db)
{
  db.getProjects()
    .then(function(data){
      $done( data );
    });
};
