
module.exports = Jstty;

function Jstty($logger, $resource){
    $logger.log('Jstty - Init');

    var db  = $resource.add('db',  require('./jstty.datastore.js'));
    var pdf = $resource.add('pdf', require('./jstty.pdfgen.js'));

    return db.getCV().then(function(cv) {
        return pdf.resume(cv);
    }).then(function(cvFile){
        pdf.writeToFile(cvFile);
    });
}
