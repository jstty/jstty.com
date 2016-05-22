module.exports = Photos;

function Photos($logger, $q, $resource) {
    $logger.log('Jstty - Init');
    $resource.add('db',  require('./photos.datastore.js'));

    // only used to preprocess images
    // TODO: sync images to S3
    //$resource.add('photosProcess',  require('./photos.process.js'));

    //var PhotosProcess = require('./photos.process.js');
    //var photosProcess = new PhotosProcess($logger, $q);
    //photosProcess.$init();
}

