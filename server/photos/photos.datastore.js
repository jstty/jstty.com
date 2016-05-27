var AWS = require('aws-sdk');
var _   = require('lodash');
var co  = require('co');
var rp  = require('request-promise');


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
            this.allFiles = data.allFiles;
            this.infoFiles = data.infoFiles;
            this.tree = data.tree;
            this.baseUrl = data.baseUrl;
        }.bind(this));
};

DataStore.prototype.getFileList = function() {
    var files = _.cloneDeep(this.allFiles);
    files = _(files)
        .values()
        .sortBy(function(item) {
          return item.size.large.height;
        })
        .value();

    var output = {
        total: 0,
        offset: 0,
        baseUrl: this.baseUrl,
        items: files
    };
    output.total = output.items.length;

    return output;
};

DataStore.prototype.getTree = function() {
    var output = {
        baseUrl: this.baseUrl,
        tree: _.cloneDeep(this.allTree)
    };

    return output;
};

/*
TODO: add more image tools
upload images
create thumb, midsize images
create json file with image meta data
    https://github.com/bwindels/exif-parser
    https://github.com/gomfunkel/node-exif

Maybe?
store image data in SQLite DB for fast Q's (tree map)
*/


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
            var baseUrl = "https://s3-"+config.region+".amazonaws.com/"+config.bucket+"/";
            var infoFiles = _.filter(files, function(file){
                return (file.path.indexOf('images-info.json') >= 0);
            });
            //data.infoTree = this._buildFullTree(data.infoFiles);
            //this.L.info("infoFiles:", JSON.stringify(data.infoFiles, null, 2));
            //this.L.info("tree:", JSON.stringify(data.tree, null, 2));
            //this.L.info("infoTree:", JSON.stringify(data.infoTree, null, 2));

            return this._getAllFilesInfo(baseUrl, infoFiles, files)
                .then(function(allFilesInfo) {
                    data.baseUrl   = baseUrl;

                    data.rawFiles  = files;
                    data.infoFiles = infoFiles;
                    data.infoTree  = this._buildFullTree( infoFiles );

                    data.allFiles  = allFilesInfo;
                    data.allTree   = this._buildFullTree(data.allFiles);

                    return data;
                }.bind(this));
        }.bind(this));
};


// http://stackoverflow.com/questions/2332811/capitalize-words-in-string
function Capitalize(str) {
    return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

DataStore.prototype._getAllFilesInfo = function(baseUrl, infoFiles, allRawFiles) {
    var plist = _.map(infoFiles, function(infoFile){
        //this.L.info('_buildFlatTree infoFile:', infoFile);
        return rp(baseUrl + infoFile.path).then(JSON.parse)
    }.bind(this));

    return this.Q.all(plist)
        .then(function(list){

            //return _.reduce(list, _.merge);

            // temp to remove '../' in front of all files
            return _.reduce(list, function(allFiles, files){
                files = _.mapKeys(files, function(file, key){
                    var pkey = key.split('../');
                    return pkey[1];
                });

                _.forEach(files, function(file, fkey){
                    files[fkey].files = _.mapValues(file.files, function(filePath){
                        var pfilePath = filePath.split('../');
                        return pfilePath[1];
                    });

                    files[fkey].id = fkey;

                    var parts = fkey.split('/');
                    var filename = parts.pop().split('.')[0];
                    // replace all underscores with spaces
                    filename = filename.replace('_', ' ');
                    files[fkey].title = Capitalize(filename);

                    files[fkey].bytes = allRawFiles[fkey].bytes;
                });

                return _.merge(allFiles, files);
            }, {});
        }.bind(this));
};


DataStore.prototype._buildFullTree = function(files) {
    var tree = {};

    _.forEach(files, function(file, key){
        var pathA = [];
        if( _.isString(key) ){
            pathA = key.split('/');
        }
        else if( _.isString(file.path) ) {
            pathA = file.path.split('/');
        }

        var fileName = pathA.pop();

        var treeN  = tree;
        _.forEach(pathA, function(name, i){
            if(name === '..') return;

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
        var files = {};

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

            _.forEach(data.Contents, function(obj){
                files[obj.Key] = {
                    type: "image",
                    path:  obj.Key,
                    bytes: obj.Size
                };
            });
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