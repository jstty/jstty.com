'use strict';

/**
 * Manager for Services
 *
 * Module dependencies:
 *  lodash     - https://github.com/lodash/lodash
 *  when       - https://github.com/cujojs/when
 *  express    - https://github.com/visionmedia/express
 *  multiparty - https://github.com/superjoe30/node-multiparty
 *
 */
var fs         = require('fs');
var http       = require('http');
var path       = require('path');
var _          = require('lodash');
var when       = require('when');
var express    = require('express');

//var Util       = require('./util.js');

module.exports = ServiceManager;


function ServiceManager(config){
    this._config = _.merge({

    }, config);

    //this.stats     = new Util.Stats(this.options, "ServiceManager");
    this._servicesConfig = this._config.services;
    this._services  = {};
    this._routes    = {}
}

// load all services
ServiceManager.prototype.load = function(app) {
    this.app = app;

    console.log('---------------------------------------------');
    console.log("ServiceManager: Loading Services...");
    _.forEach(this._servicesConfig, function(service, key) {
        this._services[key] = {};
        this._services[key].name = key;
        this._services[key].config = service;
        this._services[key].controller = {};
        this._services[key].directory = "";

        // directory default: "lib/<service key name in service list>"
        if(!service.directory) {
            this._services[key].directory = "lib" + path.sep + key;
        } else {
            this._services[key].directory = service.directory;
        }

        // module default: "./<directory>/service.js"
        if(!service.module) {
            var moduleFile = process.cwd() +path.sep + this._services[key].directory + path.sep+"service."+key+".js";

            // check if file exists
            if(fs.existsSync(moduleFile)) {
                this._services[key].module = require(moduleFile);
            } else {
                // not valid no longer needed
                delete this._services[key];
                console.warn("ServiceManager: Service \""+key+"\" module file missing ("+moduleFile+")");
                return; // end loop
            }
        }

        if(service.module) {
            console.log("   Service "+key+"");
            this._services[key].instance = new service.module(service.options);
            this.setupRoutes(this._services[key]);
        }

    }.bind(this));

    this.setupDefaultRoute(this._config.default);

    console.log('---------------------------------------------');
};

ServiceManager.prototype.setupRoutes = function(service) {

    console.log('   ------------------------------------------');
    _.forEach(service.config.routes, function(route) {

        this.setupController(service, route);

        if(route.hasOwnProperty('api')) {
            this.setupApiRoute(service, route);
        }
        else if(route.hasOwnProperty('view')) {
            this.setupViewRoute(service, route);
        }
        else if(route.hasOwnProperty('static')) {
            this.setupStaticRoute(service, route);
        }
        else {
            console.warn("ServiceManager: Service \""+service.name+"\" has invalid route", route);
        }

    }.bind(this));
    console.log('   ------------------------------------------');

};

ServiceManager.prototype.setupController = function(service, route) {
    var controller, controllerName;

    if(_.isString(route.controller) ) {
        controllerName = route.controller;
    }
    else if(_.isObject(route.controller) &&
            route.controller.hasOwnProperty('name') ) {
        controllerName = route.controller.name;
    } else {
        console.warn("ServiceManager: Service \""+service.name+"\" controller ("+route.controller+") invalid");
        return;
    }

    if(service.controller[controllerName]) {
        // controller already loaded
        return;
    }

    console.log("      Loading Controller: "+controllerName);
    // controller default: "<service.directory>/controllers/<controller>.js"
    if(_.isString(route.controller) ) {
        // try to load controller as file
        var file = route.controller;
        if(fs.existsSync(file)) {
            controller = require(file);
        } else {
            file = service.directory + path.sep+"controllers"+path.sep + route.controller + ".js";
            if(fs.existsSync(file)) {
                // need to add the current cwd because require is relative to this file
                controller = require(process.cwd() + path.sep + file);
            } else {
                // error
                console.warn("ServiceManager: Service \""+service.name+"\" controller ("+route.controller+") invalid");
                return;
            }
        }
    }
    else if(_.isObject(route.controller) ) {
        controller = route.controller;
    } else {
        // error
        console.warn("ServiceManager: Service \""+service.name+"\" controller ("+route.controller+") invalid");
        return;
    }

    // TODO: dependancy injection
    service.controller[controllerName] = new controller();
};


ServiceManager.prototype.setupApiRoute = function(service, route) {
    //console.log("      Route API -", route.api);
    // TODO
};


ServiceManager.prototype.setupViewRoute = function(service, route) {
    // TODO
};


ServiceManager.prototype.setupStaticRoute = function(service, route) {
    console.log("      Static -", route);
    // TODO
};

ServiceManager.prototype.setupDefaultRoute = function(defaultConfig) {
    var fullPathStaticContent = path.resolve(defaultConfig.staticContentPath);
    var fullPathStaticFile = path.resolve(defaultConfig.staticContentPath + "/" + defaultConfig.static);

    console.log("Static Dir Content -", fullPathStaticContent);
    this.app.use( express.static(fullPathStaticContent) );

    /*
    console.log("Root -", fullPathStaticFile);
    // root
    this.app.get("/", function(req, res){
        res.sendfile( fullPathStaticFile );
    }.bind(this));
    */

    /*
    console.log("Default -", fullPathStaticFile);
    // all others -> DEFAULT
    this.app.use(function defaultRoute(req, res) {
        res.sendfile( fullPathStaticFile );
    }.bind(this));
    */
};

/*
ServiceManager.prototype.add = function(lib) {
    if(lib.ServiceName) {
        if( !this.services.hasOwnProperty(lib.ServiceName) ) {

            this.services[lib.ServiceName] = {
                lib: lib
            };
        } else {
            console.warn("ServiceManager: Service", lib.ServiceName, "Already added");
        }
    }
};

ServiceManager.prototype.get = function(name) {
    if( this.services.hasOwnProperty(name) ) {
        return this.services[name];
    } else {
        return undefined;
    }
};

ServiceManager.prototype.setupRoutes = function() {

    // api routes from map
    this.setupApiRoutes();

    // static routes from map
    this.setupStaticRoutes();

    // webapp routes
    this.setupWebAppRoutes();

    // final default routes
    this.setupDefaultRoutes();
};

ServiceManager.prototype.setupWebAppRoutes = function() {
    var fullPath = path.resolve(this.options.webapp.staticContentPath);

    console.log("Static Dir Content -", fullPath);
    this.app.use( express.static(fullPath) );
};


ServiceManager.prototype.setupDefaultRoutes = function() {

    // root
    this.app.get("/", function(req, res){
        //console.log("static root:", req.originalUrl);
        this.stats.increment("info", "Route.Static.Root");

        var fullPath = path.resolve(this.options.webapp.staticContentPath + "/" + this.routesMap.index);
        res.sendfile( fullPath );
    }.bind(this));

    // all others -> DEFAULT
    this.app.use(function defaultRoute(req, res) {
        this.stats.increment("info", "Route.Default");

        // server up index
        //console.log("defaultRoute:", req.originalUrl);
        //res.redirect("/");
        var fullPath = path.resolve(this.options.webapp.staticContentPath + "/" + this.routesMap.index);
        res.sendfile( fullPath );
    }.bind(this));
};


ServiceManager.prototype.setupStaticRoutes = function() {
    // add static routes
    _.forEach(this.routesMap.statics, function(s){

        _.forEach(s.routes, function(route) {
            var file = "";
            if(s.file == 'index') {
                file = this.routesMap.index;
            } else {
                file = s.file;
            }
            var fullPath = path.resolve(this.options.webapp.staticContentPath + "/" + file);

            if(s.requireAuth) {
                console.log("Auth Static Route -", route, "->", file);

                this.app.get(route, function(req, res, next) {
                    this.stats.increment("info", "Route.AuthCheck");

                    // auth
                    if( req.isAuthenticated() ) {
                        this.stats.increment("info", "Route.Auth.Ok");
                        res.sendfile( fullPath );
                    } else {
                        //
                        this.stats.increment("error", "Route.Auth.Fail");
                        // error in auth, redirect back to login
                        //console.log("headers:", req.headers);
                        console.error("Not Authenticated");

                        res.clearCookie('connect.sid', { path: '/' });
                        res.redirect("/login");
                    }
                }.bind(this));

            } else {
                console.log("Static Route -", route, "->", file);
                this.app.get(route, function(req, res) {
                    res.sendfile( fullPath );
                }.bind(this));
            }
        }.bind(this));

    }.bind(this));
};


ServiceManager.prototype.setupApiRoutes = function() {
    // add apis routes
    _.forEach(this.routesMap.apis, function(a) {
        // does not include the min required
        if(!(a.api && a.service && a.controller && a.method)) { return; }

        // ignore services that are not added
        if( this.services.hasOwnProperty(a.service) ) {
            var service        = this.services[a.service].service;
            var ControllerList = this.services[a.service].lib.Controller;
            var controller     = {};

            if( ControllerList &&
                ControllerList.hasOwnProperty(a.controller) ) {
                controller = ControllerList[a.controller];
            }

            // add each method
            _.forEach(a.method, function(funcName, m) {
                var func = function(){};

                if( controller &&
                    controller[ funcName ] ) {
                    func = controller[ funcName ];

                    // save route in list for route lookup
                    this.routeList[ a.api ] = {
                        service: service,
                        func:    func
                    };
                    // if require auth
                    if(a.requireAuth) {
                        console.log("Auth API Route -", a.api, "-> ctrl:", a.controller, ", method:", m, ", func:", funcName);

                        // add wrapper function to check auth
                        this.app[ m ](a.api, function(req, res, next) {
                            this.stats.increment("info", "Route.AuthCheck");

                            // auth
                            if( req.isAuthenticated() ) {
                                this.stats.increment("info", "Route.Auth.Ok");
                                func.call(service, req, res, next, this);
                            } else {
                                //
                                this.stats.increment("error", "Route.Auth.Fail");
                                // error in auth, redirect back to login
                                //console.log("headers:", req.headers);
                                console.error("Not Authenticated");

                                // if an api then return 401
                                if(req.originalUrl.indexOf("/api") != -1) {
                                    res.status(401).end();
                                } else {
                                    res.clearCookie('connect.sid', { path: '/' });
                                    res.redirect("/login");
                                }
                            }
                        }.bind(this));
                    } else {
                        console.log("API Route -", a.api, "-> ctrl:", a.controller, ", method:", m, ", func:", funcName);

                        // no login required
                        this.app[ m ](a.api, function(req, res, next) {
                            //this.stats.increment("info", "Route.Auth");
                            func.call(service, req, res, next, this);
                        }.bind(this));
                    }
                }
            }.bind(this));
        }
    }.bind(this));
};

ServiceManager.prototype.initServices = function() {
// add promise wrapper
    return when.promise(function(resolve, reject) {
// ------------------------------------------------

        for(var s in this.services) {
            var service = new this.services[s].lib.Service(this.options);
            // save service
            this.services[s].service = service;

            // run app config if one exists
            if(service.appConfig) {
                service.appConfig(this.app);
            }
        }

        resolve();

// ------------------------------------------------
    }.bind(this));
// end promise wrapper
};

ServiceManager.prototype.start = function() {

    // start express (session store,...), then start services
    this.initExpress()
        .then(function(){
            console.log('Initilizing Services...');
            return this.initServices();
        }.bind(this))
        .then(function() {

            console.log('Starting Services...');
            console.log('----------------------------');
            // start all services
            var promiseList = [];
            for(var s in this.services) {
                if( this.services[s].service &&
                    this.services[s].service.start) {
                    promiseList.push( this.services[s].service.start() );
                }
            }

            // wait until all services are ready
            when.all(promiseList)
                .then(function(){
                    console.log('----------------------------');
                    console.log('Services Started');
                    console.log("Setting Up Routes...");
                    console.log('----------------------------');

                    // setup routes
                    this.setupRoutes();
                    console.log('----------------------------');
                    console.log('Routes Setup');

                    // start server
                    http.createServer(this.app).listen(this.app.get('port'), function createServer(){
                        console.log('ServiceManager: Server listening on port ' + this.app.get('port'));
                        console.log('---------------------------------------------');
                        this.stats.increment("info", "ServerStarted");
                    }.bind(this));
                }.bind(this))

                .then(null, function(err){
                    console.error("ServiceManager: Service Error -", err);
                }.bind(this));

        }.bind(this))
        // catch all
        .then(null, function(err){
            console.error("ServiceManager: Start Error -", err);
        }.bind(this));
};
*/