module.exports = Photos;

function Photos($logger, $resource){


//    var google = require('googleapis');
//    var OAuth2Client = google.auth.OAuth2;
//    var createAPIRequest = require('googleapis/lib/apirequest');
//
//// Client ID and client secret are available at
//// https://code.google.com/apis/console
//    var CLIENT_ID = '13861287169-i1mndu7et35eq6q2rgvg02supme5iegt.apps.googleusercontent.com'; // i used one provided by google
//    var CLIENT_SECRET = '3dj4XAZVOmeGxLHeIZrfhdIm'; // i used one provided by google
//    var REDIRECT_URL = 'http://jstty.com/oauth2Callback';
//
//    var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//
//    function getAccessToken(oauth2Client, callback) {
//        // generate consent page url
//        var url = oauth2Client.generateAuthUrl({
//            access_type: 'offline', // will return a refresh token
//            scope: 'https://picasaweb.google.com/data/' // can be a space-delimited string or an array of scopes
//        });
//
//        var code = "";
//        // request access token
//        oauth2Client.getToken(code, function(err, tokens) {
//            // set tokens to the client
//            // TODO: tokens should be set by OAuth2 client.
//            oauth2Client.setCredentials(tokens);
//            callback();
//        });
//    }
//
//// retrieve an access token
//    getAccessToken(oauth2Client, function() {
//        // UNTIL HERE EVERYTHING WORKS!
//
//        google.options({ auth: oauth2Client });
//
//        console.info(oauth2Client);
//        var parameters = {
//            options: {
//                url: 'https://picasaweb.google.com/data/feed/api/user/{userId}?kind=photo&tag={tag}',
//                method: 'GET'
//            },
//            params: { userId: '104094916837036848285', auth: oauth2Client, tag: 'best' },
//            requiredParams: ['userId', 'tag'],
//            pathParams: ['userId', 'tag'],
//            context: {
//                _options: {},
//                google: {_options: {}}
//            }
//        };
//
//        //var createAPIRequest = new google.apirequest;
//        createAPIRequest(parameters, function (data) {
//            console.info('response', data); // DATA IS null :(
//        });
//
//    });
}