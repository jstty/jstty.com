'use strict';

//var walk    = require('walk');
var fs   = require('fs');
var path = require('path');
var _    = require('lodash');
var co   = require('co');
var gm   = require('gm');
var shell = require('shelljs');
var ProgressBar = require('progress');

module.exports = PhotosProcess;

function PhotosProcess($logger, $q) {
    this.L = $logger;
    this.Q = $q;
}

/*
TODO
create manifest file in the root with the list of info files
 */

PhotosProcess.prototype.$init = function(){
    var dir = '../';
    this.L.info('Processing Images in Dir:', dir);

    var prevDir = shell.pwd();
    shell.cd(dir);

    return this.processDir('photos', '.cache')
        .then(function(){
            shell.cd(prevDir);
        });
};

PhotosProcess.prototype.processDir = function(dir, outSubDir) {
    var self = this;

    return co(function *(){
        let i, files = [], dirs = [];

        // in dir, get list of sub dir's and files
        var tFiles = fs.readdirSync(dir);
        for (i = 0; i < tFiles.length; i++) {
            // ignore DOT files
            if(tFiles[i][0] !== '.') {
                var name = dir + '/' + tFiles[i];
                if (fs.statSync(name).isDirectory()){
                    dirs.push(name);
                } else {
                    files.push(name);
                }
            }
        }

        //self.L.info('files:', files);
        //self.L.info('dirs:', dirs);

        // for all files, process image
        if(files.length) {
            //self.L.info('START - Processing Images in ', dir);

            let outDir = dir + path.sep + outSubDir;
            // make sure exists before writing the images
            shell.mkdir('-p', outDir);

            let bar = new ProgressBar('Dir: '+dir+' :bar :percent', { total: files.length });

            let imagesInfo = {};
            let imagesInfoFile = outDir + path.sep + 'images-info.json';

            // try to load previous images info file
            try {
                imagesInfo = yield self.readImageInfo(imagesInfoFile);
            } catch(err) {
                imagesInfo = {};
            }

            for (i = 0; i < files.length; i++) {
                var file = files[i];

                // was the image already processed?
                if( yield self.needToProcessImage(imagesInfo[file]) ) {

                    // the image needs to be processed
                    self.L.info('Processing Image:', file);

                    var iInfo = yield self.processImage(file, outDir);
                    imagesInfo[file] = iInfo;

                    // save updated imagesInfo
                    yield self.writeImageInfo(imagesInfoFile, imagesInfo);
                }

                bar.tick();
            }

            //self.L.info('DONE - Processing Images in ', dir);
        }

        // recursive process sub dirs
        if(dirs.length) {
            for (i = 0; i < dirs.length; i++) {
                yield self.processDir(dirs[i], outSubDir);
            }
        }

    });
};


PhotosProcess.prototype.needToProcessImage = function(imageInfo) {
    if(!imageInfo) {
        return this.Q.resolve(true);
    }

    var self = this;
    return co(function *() {
        let results = false;
        results = yield self.fileExists(imageInfo.files.small);
        if(!results) return true;

        results = yield self.fileExists(imageInfo.files.mid);
        if(!results) return true;

        results = yield self.fileExists(imageInfo.files.large);
        if(!results) return true;

        return false;
    });
};

PhotosProcess.prototype.fileExists = function(file) {
    var deferer = this.Q.defer();

    fs.access(file, fs.F_OK, function(err) {
        // file doesn't exist
        if (err) {
            deferer.resolve(false);
            return;
        }

        // file exists
        deferer.resolve(true);
    });

    return deferer.promise;
};

PhotosProcess.prototype.readImageInfo = function(imagesInfoFile) {
    var deferer = this.Q.defer();

    fs.readFile(imagesInfoFile, function (err, data) {
        if(err) {
            deferer.reject(err);
            return;
        }

        try {
            data = JSON.parse(data);
        } catch(err) {
            deferer.reject(err);
            return;
        }

        deferer.resolve(data);
    });


    return deferer.promise;
};

PhotosProcess.prototype.writeImageInfo = function(imagesInfoFile, imagesInfo) {
    var deferer = this.Q.defer();

    fs.writeFile(imagesInfoFile, JSON.stringify(imagesInfo, null, 2), function (err) {
        if(err) {
            deferer.reject(err);
            return;
        }

        deferer.resolve({});
    });


    return deferer.promise;
};


PhotosProcess.prototype.processImage = function(file, outDir) {
    var self = this;

    return co(function *() {

        var imageInfo = yield self.getImageInfo(file, outDir);

        yield self.writeImage(imageInfo.files.original, imageInfo.files.small, imageInfo.size.small);
        yield self.writeImage(imageInfo.files.original, imageInfo.files.mid,   imageInfo.size.mid);
        yield self.writeImage(imageInfo.files.original, imageInfo.files.large, imageInfo.size.large);

        return imageInfo;
    });
};


PhotosProcess.prototype.writeImage = function(originalFile, newFile, size) {
    return this.fileExists(newFile)
        .then(function(exists){
            var deferer = this.Q.defer();

            // file doesn't exist, create it
            if (!exists) {
                this.L.info('Resizing Image:', originalFile, '->', newFile);

                gm(originalFile)
                    .resize(size.width, size.height)
                    .quality(85)
                    .write(newFile, function (err) {
                        if (err) {
                            deferer.reject(err);
                            return;
                        }

                        deferer.resolve();
                    });
            } else {
                // file already exist
                deferer.resolve();
            }

            return deferer.promise;
        }.bind(this));
};


PhotosProcess.prototype.getImageInfo = function(filepath, outDir) {
    var deferer = this.Q.defer();

    var fileParts  = path.parse(filepath);
    var filePrefix = outDir + path.sep + fileParts.name;

    var imageInfo = {
        files: {
            original: filepath, // original
            small: filePrefix + "-s" + fileParts.ext, // small
            mid:   filePrefix + "-m" + fileParts.ext, // mid
            large: filePrefix + "-l" + fileParts.ext  // large
        },
        format: '',
        size: {
            original: { width: -1,   height: -1 },
            small:    { width: 320,  height: -1 },
            mid:      { width: 640,  height: -1 },
            large:    { width: 1280, height: -1 }
        },
        exif: {},
        bytes: 0
    };

    /*
        TODO
        Add title, '_' -> ' ' and Capitalize words
        Add Create date, mod date
        Add MD5/SAH1 check sum?
    */

    var stats = fs.statSync(filepath)
    imageInfo.bytes = stats["size"];

    gm(filepath).identify(function(err, features) {
        if (err) {
            deferer.reject(err);
            return;
        }

        imageInfo.format = features.format;
        imageInfo.exif = _.cloneDeep(features['Profile-EXIF']);

        imageInfo.size.original.width = features.size.width;
        imageInfo.size.original.height = features.size.height;
        var ratio = imageInfo.size.original.height/imageInfo.size.original.width;

        imageInfo.size.small.height = Math.round(ratio * imageInfo.size.small.width);
        imageInfo.size.mid.height   = Math.round(ratio * imageInfo.size.mid.width);
        imageInfo.size.large.height = Math.round(ratio * imageInfo.size.large.width);

        //console.log('imageInfo:', imageInfo);
        deferer.resolve(imageInfo);
    });

    return deferer.promise;
};