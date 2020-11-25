import * as functions from 'firebase-functions';
import server from './main';

// const firebase = require('firebase');
import * as admin from 'firebase-admin';

const serviceAccount = require("../.cert/fbServiceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jstty-com-8aff9.firebaseio.com"
});

process.env.AWS_ACCESS_ID  = functions.config().aws.accessid;
process.env.AWS_SECRET_KEY = functions.config().aws.secretkey;

export const api = functions.https.onRequest(server);
