module.exports = PhotosCtrl;

function PhotosCtrl($logger){
    $logger.log('JStty - Photos Ctrl Init');
}

// localhost:8000/api/photos
PhotosCtrl.prototype.index = function(db, $done)
{
    return db.getFileList();
};

// localhost:8000/api/photos/tree
PhotosCtrl.prototype.tree = function(db, $done)
{
    return db.getTree();
};
