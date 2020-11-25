"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
let result = null;
result = require('dotenv').config({ override: true, path: path_1.resolve(__dirname, '.env/dev') });
const main_1 = require("./main");
main_1.default.listen(3000);
//# sourceMappingURL=server.js.map