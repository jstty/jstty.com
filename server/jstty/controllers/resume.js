'use strict';

module.exports = ResumeCtrl;

function ResumeCtrl($logger){
    $logger.log('JStty - Resume Ctrl Init');
}

// localhost:8000/api/resume
ResumeCtrl.prototype.index = function($done, db, pdf)
{
    db.getProjects()
      .then(function(projects) {
        return pdf.resume(projects);
      } )
      .then(function(data) {
        return $done( data );
      } );
};
