'use strict';

module.exports = ResumeCtrl;

function ResumeCtrl($logger){
    $logger.log('JStty - Resume Ctrl Init');
}

// localhost:8000/api/resume
ResumeCtrl.prototype.index = function($done)
{
    $done( { source: "jstty" } );
};
