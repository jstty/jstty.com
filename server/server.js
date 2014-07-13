'use strict';

var framework = require('./lib/_framework/index.js');

/*
 * Load's config files
 */
var app = framework({
    configs: [
        '$config.js',           // framework dir
        'config.jstty.js',      // current dir
        '~config.custom.js'     // home dir
    ]
});

/*
 * Look in config.myapp.js for routes
 */


/*
 * Start web server
 */
app.start();
