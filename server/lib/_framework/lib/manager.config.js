'use strict';

var fs   = require('fs');
var path = require('path');
var _    = require('lodash');

module.exports = ConfigManager;

function ConfigManager(options){
    this._options = _.merge({
        basePath: __dirname
    }, options);

    // if missing sep at end, then add it
    if(this._options.basePath.slice(-1) != path.sep) {
        this._options.basePath += path.sep;
    }

    this._config = {};
}

ConfigManager.prototype.loadSync = function(files) {
    if(_.isString(files)) {
        files = [files];
    }

    if(_.isArray(files)) {
        var data = "";
        var file = "";
        var fileExt = "";
        try {
            for(var i = 0; i < files.length; i++) {
                file    = files[i];
                fileExt = this.getFileExtension(file);

                if(file.charAt(0) == "~") {
                    file = this.getUserHomeDir() + path.sep + file.slice(1);
                }
                else if(file.charAt(0) == "$") {
                    file = this._options.basePath + file.slice(1);
                }
                // if not home or base dir but also js file extension
                else if(fileExt == "js") {
                    // this is so require will load from the current dir's path
                    file = process.cwd() + path.sep + file;
                }

                if(fs.existsSync(file)) {
                    if(fileExt == "json") {
                            data = fs.readFileSync(file);

                            // merge in next
                            this._config = _.merge(
                                this._config,
                                JSON.parse(data)
                            );
                    }
                    else if(fileExt == "js") {
                        this._config = _.merge(
                            this._config,
                            require(file)
                        );
                    } else {
                        console.info("ConfigManager: Invalid file type for \"" + file + "\"");
                    }
                } else {
                    console.info("ConfigManager: Loading file \"" + file + "\" failed");
                }
            }

            if(_.isElement(this._config)) {
                return null;
            } else {
                return this._config;
            }
        } catch(err){
            console.error("ConfigManager: Error loading config files (",files,"):", err);
        }
    } else {
        console.error("ConfigManager: Files input not array or string");
    }

    return null;
};

ConfigManager.prototype.get = function() {
    return this._config;
};

ConfigManager.prototype.getFileExtension = function(filename) {
    return path.extname(filename).slice(1);
};

ConfigManager.prototype.getUserHomeDir = function() {
    var dir = process.env.HOME ||
              process.env.HOMEPATH ||
              process.env.USERPROFILE;

    // no dir and is not windows
    if( !dir &&
        process.platform != "win32"
        ) {
        dir = path.sep + "root";
    }

    return dir;
};
