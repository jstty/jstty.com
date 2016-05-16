var AWS = require('aws-sdk');
var _   = require('lodash');
var co  = require('co');


module.exports = DataStore;

function DataStore($logger, $q){
    this.L = $logger;
    this.Q = $q;
    this.files = [];
    this.tree = {};
}

DataStore.prototype.$init = function($config){
    var config = {
        region: "us-west-1",
        accessKeyId: '',
        secretAccessKey: '',
        batchSize: null,
        bucket: 'jstty-photos'
    };
    config.accessKeyId     = process.env.AWS_ACCESS_ID  || $config.aws.accessKeyId;
    config.secretAccessKey = process.env.AWS_SECRET_KEY || $config.aws.secretAccessKey;

    return this._initGetAllFiles(config)
        .then(function(data){
            this.files = data.files;
            this.tree = data.tree;
            this.urlBase = data.urlBase;
        }.bind(this));
};

DataStore.prototype.getFileList = function() {
    var output = {
        total: 0,
        offset: 0,
        urlBase: this.urlBase,
        items: _.cloneDeep(this.files)
    };
    output.items.total = output.items.length;

    return output;
};

DataStore.prototype.getTree = function() {
    var output = {
        urlBase: this.urlBase,
        tree: _.cloneDeep(this.tree)
    };

    return output;
};



// TODO move this to it's own module
DataStore.prototype._initGetAllFiles = function(config) {
    // https://s3-us-west-1.amazonaws.com/jstty-photos/photos/2006/_best/lady_in_white.jpg
    var s3 = new AWS.S3({
        sslEnabled: true,
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        params: {
            Bucket: config.bucket
        }
    });

    return this._getAllFiles(s3, config.batchSize)
        .then(function(files){
            var data =  {};

            data.urlBase = "https://s3-"+config.region+".amazonaws.com/"+config.bucket+"/";
            data.files = files;
            data.tree = this._buildTree(files);

            //this.L.info("tree:", JSON.stringify(data.tree, null, 2));

            return data;
        }.bind(this));
};

DataStore.prototype._buildTree = function(files) {
    var tree = {};

    _.forEach(files, function(file){
        var pathA = file.name.split('/');
        var fileName = pathA.pop();

        var treeN  = tree;
        _.forEach(pathA, function(name, i){
            if(!treeN.hasOwnProperty(name)) {
                treeN[name] = {};
            }
            treeN = treeN[name];

            // end of path, set file
            if(i+1 === pathA.length) {
                treeN[fileName] = file;
            }
        });
    });

    return tree;
};


DataStore.prototype._getAllFiles = function(s3, batchSize) {
    var self = this;

    return co(function *(){
        var continuationToken = null;
        var done = false;
        var batchSize = batchSize || 999;
        var files = [];

        while(!done) {
            var data = yield self._getBatchFiles(s3, batchSize, continuationToken);
            if(data.NextContinuationToken) {
                continuationToken = data.NextContinuationToken;
            } else {
                done = true;
            }

            // filter DOT files
            data.Contents = _.filter(data.Contents, function(obj) {
                if(obj.hasOwnProperty('Key') && _.isString(obj.Key)) {
                    var fileName = obj.Key.split('/').pop();
                    return (fileName[0] !== '.');
                }
            });

            files = files.concat(
                _.map(data.Contents, function(obj){
                    return {
                        type: "image",
                        name: obj.Key,
                        size: obj.Size
                    };
                })
            );
        }

        return files;
    });
};

DataStore.prototype._getBatchFiles = function(s3, batchSize, continuationToken){
    var deferred = this.Q.defer();

    s3.listObjectsV2({
        MaxKeys: batchSize,
        ContinuationToken: continuationToken
    }, function(err, data) {
        if (err) {
            this.L.error("Error:", err, err.stack);
            deferred.reject(err);
            return;
        }

        //this.L.log("S3 Data:", JSON.stringify(data, null, 2));
        deferred.resolve(data);
    }.bind(this));

    return deferred.promise;
};


//    var google = require('googleapis');
//    var OAuth2Client = google.auth.OAuth2;
//    var createAPIRequest = require('googleapis/lib/apirequest');
//
//// Client ID and client secret are available at
//// https://code.google.com/apis/console
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