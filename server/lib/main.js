"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const api_module_1 = require("./api.module");
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
const startNestApplication = (expressInstance) => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield core_1.NestFactory.create(api_module_1.ApiModule, new platform_express_1.ExpressAdapter(expressInstance));
    yield app.init();
    console.log('NestJS Ready!');
    return app;
});
const nestApp = startNestApplication(server);
exports.default = server;
//# sourceMappingURL=main.js.map