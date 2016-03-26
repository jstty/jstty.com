
// Routes
module.exports = [
    {
        api: "/api/resume",
        controller: "resume", // default "<service.directory>/controllers/<controller>.js"
        method: {
            get: "index" // defined in controller module"
        }
    },
    {
        api: "/api/projects",
        controller: "projects",
        method: {
            get: "index"
        }
    },
    {
        "otherwise": {
            "static": "../frontend/dist"
        }
    }
];
