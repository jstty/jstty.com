var Hyper = require('hyper.io');

// load config and routes
var hyper = new Hyper();

// Start web server
hyper.load([
    'jstty',
    {
        routes: [
            {
                otherwise: {
                    static: "../frontend/dist"
                }
            }
        ]
    }
])
    .then(function(){
        hyper.httpFramework()
            .app()
            .use(function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
                res.setHeader('Access-Control-Allow-Credentials', true);
                next();
            });
        hyper.start();
    });
