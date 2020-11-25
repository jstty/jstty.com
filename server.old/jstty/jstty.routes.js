
// Routes
module.exports = [
    {
        api: "/api/resume/showcase",
        controller: "resume", // default "<service.directory>/controllers/<controller>.js"
        method: {
            get: "showcase" // defined in controller module"
        }
    },
    {
        api: "/api/resume/full",
        controller: "resume", // default "<service.directory>/controllers/<controller>.js"
        method: {
            get: "full" // defined in controller module"
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
        api: "/api/projects/showcase",
        controller: "projects",
        method: {
            get: "showcase"
        }
    }
];
