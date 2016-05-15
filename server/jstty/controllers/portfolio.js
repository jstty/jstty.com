var _ = require('lodash');

module.exports = PortfolioCtrl;

function PortfolioCtrl($logger){
    $logger.log('JStty - Portfolio Ctrl Init');
}

// localhost:8000/api/portfolio
PortfolioCtrl.prototype.index = function($done, db)
{
    // TODO: create portfilo function
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
                var project = {};

                project.companyName = company.Company;
                project.companyLink = company.Link;
                project.title = p.Title;
                project.description = p.Description || p.Title;
                project.version = p.Version;
                project.labels = p.Labels;
                project.images = p.Images || [];
                project.links = p.Links || { "link": company.Link };

                output.items.push(project);
            });

        });

        output.total = output.items.length;
        //setTimeout(function(){
        $done( output );
        //}, 2*1000);
    });
};
