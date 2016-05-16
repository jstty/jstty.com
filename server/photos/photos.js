module.exports = Photos;

function Photos($logger, $resource) {
    $logger.log('Jstty - Init');
    $resource.add('db',  require('./photos.datastore.js'));
}

