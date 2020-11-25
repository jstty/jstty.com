"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require('aws-sdk');
var _ = require('lodash');
var co = require('co');
var rp = require('request-promise');
function DataStore($logger) {
    this.L = $logger;
    this.files = [];
    this.tree = {};
}
DataStore.prototype.$init = function ($config) {
    var config = {
        region: "us-west-1",
        accessKeyId: '',
        secretAccessKey: '',
        batchSize: null,
        bucket: 'jstty-photos'
    };
    config.accessKeyId = $config.aws.accessKeyId;
    config.secretAccessKey = $config.aws.secretAccessKey;
    return this._initGetAllFiles(config)
        .then(function (data) {
        this.baseUrl = data.baseUrl;
        this.rawFiles = data.rawFiles;
        this.infoFiles = data.infoFiles;
        this.infoTree = data.infoTree;
        this.allFiles = data.allFiles;
        this.allTree = data.allTree;
    }.bind(this));
};
DataStore.prototype.getFileList = function () {
    var files = _.cloneDeep(this.allFiles);
    files = _(files)
        .values()
        .sortBy(function (item) {
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
DataStore.prototype.getTree = function () {
    var output = {
        baseUrl: this.baseUrl,
        tree: _.cloneDeep(this.allTree)
    };
    return output;
};
DataStore.prototype._initGetAllFiles = function (config) {
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
        .then(function (files) {
        var data = {};
        var baseUrl = "https://s3-" + config.region + ".amazonaws.com/" + config.bucket + "/";
        var infoFiles = _.filter(files, function (file) {
            return (file.path.indexOf('images-info.json') >= 0);
        });
        return this._getAllFilesInfo(baseUrl, infoFiles, files)
            .then(function (allFilesInfo) {
            data.baseUrl = baseUrl;
            data.rawFiles = files;
            data.infoFiles = infoFiles;
            data.infoTree = this._buildFullTree(infoFiles);
            data.allFiles = allFilesInfo;
            data.allTree = this._buildFullTree(data.allFiles);
            data.allTree = data.allTree.photos;
            return data;
        }.bind(this));
    }.bind(this));
};
function Capitalize(str) {
    return str.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}
DataStore.prototype._getAllFilesInfo = function (baseUrl, infoFiles, allRawFiles) {
    var plist = _.map(infoFiles, function (infoFile) {
        return rp(baseUrl + infoFile.path).then(JSON.parse);
    }.bind(this));
    return Promise.all(plist)
        .then(function (list) {
        return _.reduce(list, function (allFiles, files) {
            _.forEach(files, function (file, fkey) {
                files[fkey].id = fkey;
                var parts = fkey.split('/');
                var filename = parts.pop().split('.')[0];
                filename = filename.replace(/_/g, ' ');
                files[fkey].title = Capitalize(filename);
            });
            return _.merge(allFiles, files);
        }, {});
    }.bind(this));
};
DataStore.prototype._buildFullTree = function (files) {
    var tree = {};
    _.forEach(files, function (file, key) {
        var pathA = [];
        if (_.isString(key)) {
            pathA = key.split('/');
        }
        else if (_.isString(file.path)) {
            pathA = file.path.split('/');
        }
        var fileName = pathA.pop();
        var treeN = tree;
        _.forEach(pathA, function (name, i) {
            if (name === '..')
                return;
            if (!treeN.hasOwnProperty(name)) {
                treeN[name] = {};
            }
            treeN = treeN[name];
            if (i + 1 === pathA.length) {
                treeN[fileName] = file;
            }
        });
    });
    return tree;
};
DataStore.prototype._getAllFiles = function (s3, batchSize) {
    var self = this;
    return co(function* () {
        var continuationToken = null;
        var done = false;
        var batchSize = batchSize || 999;
        var files = {};
        while (!done) {
            var data = yield self._getBatchFiles(s3, batchSize, continuationToken);
            if (data.NextContinuationToken) {
                continuationToken = data.NextContinuationToken;
            }
            else {
                done = true;
            }
            data.Contents = _.filter(data.Contents, function (obj) {
                if (obj.hasOwnProperty('Key') && _.isString(obj.Key)) {
                    var fileName = obj.Key.split('/').pop();
                    return (fileName[0] !== '.');
                }
            });
            _.forEach(data.Contents, function (obj) {
                files[obj.Key] = {
                    type: "image",
                    path: obj.Key,
                    bytes: obj.Size
                };
            });
        }
        return files;
    });
};
DataStore.prototype._getBatchFiles = function (s3, batchSize, continuationToken) {
    return new Promise(function (resolve, reject) {
        s3.listObjectsV2({
            MaxKeys: batchSize,
            ContinuationToken: continuationToken
        }, function (err, data) {
            if (err) {
                this.L.error("Error:", err, err.stack);
                reject(err);
                return;
            }
            resolve(data);
        }.bind(this));
    }.bind(this));
};
exports.default = DataStore;
//# sourceMappingURL=photos.datastore.js.map