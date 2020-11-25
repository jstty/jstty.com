

// Routes
module.exports = [
    {
        api: "/api/photos",
        controller: "main",
        method: {
            get: "index"
        }
    },
    {
        api: "/api/photos/tree",
        controller: "main",
        method: {
            get: "tree"
        }
    },
    {
        api: "/api/photos/tree/map",
        controller: "main",
        method: {
            get: "treeMap"
        }
    }

    // TODO: add oauth2 google login
    //,{
    //    oAuth2: {
    //        route: "/api/photos/auth/google",
    //        controller: "photos",
    //        handler: "googleAuth", // gets called after redirect
    //
    //        "authUri": "https://accounts.google.com/o/oauth2/auth",
    //        "tokenUri": "https://accounts.google.com/o/oauth2/token",
    //        // "redirect": "/api/photos/auth/google/oauth2Callback", // default: {api route}+'/oauth2Callback'
    //
    //        "clientId": "13861287169-i1mndu7et35eq6q2rgvg02supme5iegt.apps.googleusercontent.com",
    //        "clientSecret": "3dj4XAZVOmeGxLHeIZrfhdIm"
    //    }
    //}
];
