
// Jstty Service
var jsttyService = {
    directory:   "lib/jstty", // default "lib/<service key name in service list>"
    description: "jstty Service",
    options: {
    },
    routes: [
        {
        }
    ]
};

module.exports = {
    services: {
        jstty: jsttyService
    },
    // all else fails
    default: {
        staticContentPath: "../client/app",
        static: "index.html"
    }
};
