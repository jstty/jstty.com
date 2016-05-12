module.exports = ProjectsCtrl;

function ProjectsCtrl($logger){
    $logger.log('JStty - Projects Ctrl Init');
}

// localhost:8000/api/projects
ProjectsCtrl.prototype.index = function($done, db)
{
  db.getShowcaseProjects()
    .then(function(projects){
        var output = [];
        _(projects).forEach(function(company){

            _(company.Projects).forEach(function(p){
                var project = {};

                project.companyName = company.Company;
                project.companyLink = company.Link;
                project.title = p.Title;
                project.description = p.Description;
                project.version = p.Version;
                project.labels = p.Labels;
                project.links = p.Links || { "link": company.Link };

                output.push(project);
            });

        });

        $done( output );
    });
};
