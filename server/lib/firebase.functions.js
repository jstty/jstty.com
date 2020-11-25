"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = require("firebase-functions");
const main_1 = require("./main");
const admin = require("firebase-admin");
const serviceAccount = require("../.cert/fbServiceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jstty-com-8aff9.firebaseio.com"
});
process.env.AWS_ACCESS_ID = functions.config().aws.accessid;
process.env.AWS_SECRET_KEY = functions.config().aws.secretkey;
exports.api = functions.https.onRequest(main_1.default);
//# sourceMappingURL=firebase.functions.js.map