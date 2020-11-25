"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var JsttyProfileController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsttyProfileController = void 0;
const common_1 = require("@nestjs/common");
const jstty_model_1 = require("../model/jstty.model");
let JsttyProfileController = JsttyProfileController_1 = class JsttyProfileController {
    constructor(jsttyModel) {
        this.jsttyModel = jsttyModel;
        this.logger = new common_1.Logger(JsttyProfileController_1.name);
    }
    projectsAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jsttyModel.getProjectsAll();
        });
    }
    projectsShowcase() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jsttyModel.getProjectsShowcase();
        });
    }
};
__decorate([
    common_1.Get('/api/projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JsttyProfileController.prototype, "projectsAll", null);
__decorate([
    common_1.Get('/api/projects/showcase'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JsttyProfileController.prototype, "projectsShowcase", null);
JsttyProfileController = JsttyProfileController_1 = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [jstty_model_1.JsttyModel])
], JsttyProfileController);
exports.JsttyProfileController = JsttyProfileController;
//# sourceMappingURL=jstty.profile.controller.js.map