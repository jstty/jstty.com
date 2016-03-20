'use strict';

module.exports = ResumeCtrl;

function ResumeCtrl($logger){
    $logger.log('JStty - Resume Ctrl Init');
}

// localhost:8000/api/resume
ResumeCtrl.prototype.index = function($custom, db, pdf)
{
    db.getCV()
      .then(function(cv) {
        return pdf.resume(cv);
      } )
      .then(function(data) {
        $custom( data );
      } );
};
