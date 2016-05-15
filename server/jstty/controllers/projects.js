var _ = require('lodash');

module.exports = ProjectsCtrl;

function ProjectsCtrl($logger){
    $logger.log('JStty - Projects Ctrl Init');
}

// http://localhost:8000/api/projects
ProjectsCtrl.prototype.index = function($done, db)
{
  db.getShowcaseProjects()
    .then(function(projects){
        var output = {
            total: 0,
            offset: 0,
            limit: 100,
            items: []
        };

        _.forEach(projects, function(company){

            _.forEach(company.Projects, function(p){
                var project = {
                    links: []
                };

                project.companyName = company.Company;
                project.companyLink = company.Link;
                project.title = p.Title;
                project.description = p.Description || p.Title;
                project.version = p.Version;
                project.labels = p.Labels;

                if(p.links && _.isArray(p.links)) {
                    project.links = p.links;
                } else {
                    if(_.isString(company.Link)) {
                        project.links = [
                            {
                                "name": company.Company,
                                "type": "link",
                                "image": "/projects/link.jpg",
                                "url": company.Link
                            }
                        ];
                    }
                }

                output.items.push(project);
            });

        });

        output.total = output.items.length;
        setTimeout(function(){
            $done( output );
        }, 1*1000);
    });
};
