var Hyper = require('hyper.io');

// load config and routes
var hyper = new Hyper();

// Start web server
var app = hyper.start(['jstty']);
