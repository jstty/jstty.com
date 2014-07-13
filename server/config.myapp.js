
// Main Service
var mainService = {
    directory: "lib/main", // default "lib/<service key name in service list>"
    description: "Main Service",
    module: require('./lib/main/service.main.js'), // default "./<directory>/service.<name>.js"
    options: {
        keyboard: "cat"
    },
    routes: [
        // resolver -> controller -> OUT (json)
        {
            api: "/api/user/info",
            resolve: {
                //authResolver: authResolver
            },
            controller: "user", // default "<service.directory>/controllers/<controller>.js"
            method: {
                get: "info" // defined in controller module"
            }
        },
        {
            api: "/api/test1",
            controller: "test",
            method: {
                post: "test"
            }
        },
        // resolver -> controller -> view -> OUT (html)
        {
            view:     "/view/auth/login",
            template: "auth.ejs", // required, default "<service.directory>/views/<template>"
            resolve: {
                //authResolver: authResolver
            },
            controller: "auth",
            method: {
                get: "login"
            }
        },
        {
            view: "/view/test1",
            template:   "test1.ejs",
            controller: "test",
            method: {
                get: "test"
            }
        },
        // resolver -> OUT
        // static file
        {
            static: [
                "/auth",
                "/protected.html"
            ],  // list of routes, for each applying resolver
            resolve: {
                //authResolver: authResolver
            }
        },
        {
            static: "/test1"
        },
        {
            dir: "../client"
        }
    ]
};

module.exports = {
    services: {
        main: mainService
    },
    // all else fails
    default: {
        static: "index.html"
        // redirectTo: '/home'
    }
};
