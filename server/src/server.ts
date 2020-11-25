import { resolve } from "path";
let result = null;
result = require('dotenv').config({ override: true, path: resolve(__dirname, '.env/dev') });
// console.log('dotenv:', result.parsed);
// console.log('AWS_ACCESS_ID:', process.env.AWS_ACCESS_ID);
// console.log('AWS_SECRET_KEY:', process.env.AWS_SECRET_KEY);

import server from './main';

server.listen(3000);
