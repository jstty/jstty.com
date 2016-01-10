
module.exports = Jstty;

function Jstty($logger, $resource){
    $logger.log('Jstty - Init');

    $resource.add('db', require('./jstty.datastore.js'));
}
