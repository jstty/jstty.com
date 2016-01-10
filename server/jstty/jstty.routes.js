
// Routes
module.exports = [
    {
        api: "/api/resume",
        controller: "resume", // default "<service.directory>/controllers/<controller>.js"
        method: {
            get: "index" // defined in controller module"
        }
    }
];
