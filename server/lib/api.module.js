"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app/app.controller");
const jstty_resume_controller_1 = require("./jstty/controllers/jstty.resume.controller");
const jstty_profile_controller_1 = require("./jstty/controllers/jstty.profile.controller");
const photos_controller_1 = require("./photos/controllers/photos.controller");
const jstty_model_1 = require("./jstty/model/jstty.model");
const photos_model_1 = require("./photos/model/photos.model");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [config_1.ConfigModule.forRoot({
                envFilePath: ['.env.dev.local', '.env.dev'],
            })],
        controllers: [
            app_controller_1.AppController,
            jstty_resume_controller_1.JsttyResumeController,
            jstty_profile_controller_1.JsttyProfileController,
            photos_controller_1.PhotosController
        ],
        providers: [
            jstty_model_1.JsttyModel,
            photos_model_1.PhotosModel
        ],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map