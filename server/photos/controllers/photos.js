module.exports = PhotosCtrl;

function PhotosCtrl($logger){
    $logger.log('JStty - Photos Ctrl Init');
}

// localhost:8000/api/photos
PhotosCtrl.prototype.index = function($done)
{
    // TODO: list all photos/dirs
    $done(  );
};
