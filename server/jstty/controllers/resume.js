'use strict';

module.exports = ResumeCtrl;

function ResumeCtrl($logger){
    $logger.log('JStty - Resume Ctrl Init');
}

// localhost:8000/api/resume/showcase
ResumeCtrl.prototype.showcase = function($custom, db, pdf)
{
    db.getShowcaseCV()
      .then(function(cv) {
        return pdf.resume(cv, 'sp');
      } )
      .then(function(data) {
        $custom( data );
      } );
};

// localhost:8000/api/resume/full
ResumeCtrl.prototype.full = function($custom, db, pdf)
{
    db.getFullCV()
        .then(function(cv) {
            return pdf.resume(cv, 'full');
        } )
        .then(function(data) {
            $custom( data );
        } );
};
