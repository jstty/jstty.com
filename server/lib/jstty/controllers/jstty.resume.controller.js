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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var JsttyResumeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsttyResumeController = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const jstty_model_1 = require("../model/jstty.model");
const pdf_1 = require("../pdf");
let JsttyResumeController = JsttyResumeController_1 = class JsttyResumeController {
    constructor(jsttyModel) {
        this.jsttyModel = jsttyModel;
        this.logger = new common_1.Logger(JsttyResumeController_1.name);
        let resume_template = require('../resume-templates/template');
        let fontsDir = path_1.resolve(__dirname, '../pdf-fonts');
        let fonts = {
            Roboto: {
                normal: fontsDir + '/Roboto-Regular.ttf',
                bold: fontsDir + '/Roboto-Medium.ttf',
                italics: fontsDir + '/Roboto-Italic.ttf',
                bolditalics: fontsDir + '/Roboto-Italic.ttf'
            }
        };
        this.pdf = new pdf_1.default(this.logger);
        this.pdf.$init(resume_template, fonts);
    }
    resumeShowcase(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cv = yield this.jsttyModel.getShowcaseCV();
            let cvPDF = yield this.pdf.resume(cv, 'sp');
            let headers = {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${cvPDF.filename}`,
                'Content-Length': cvPDF.data.length,
            };
            res.set(headers);
            res.end(cvPDF.data);
        });
    }
    resumeFull(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cv = yield this.jsttyModel.getFullCV();
            let cvPDF = yield this.pdf.resume(cv, 'full');
            let headers = {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${cvPDF.filename}`,
                'Content-Length': cvPDF.data.length,
            };
            res.set(headers);
            res.end(cvPDF.data);
        });
    }
};
__decorate([
    common_1.Get('/api/resume/showcase'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JsttyResumeController.prototype, "resumeShowcase", null);
__decorate([
    common_1.Get('/api/resume/full'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JsttyResumeController.prototype, "resumeFull", null);
JsttyResumeController = JsttyResumeController_1 = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [jstty_model_1.JsttyModel])
], JsttyResumeController);
exports.JsttyResumeController = JsttyResumeController;
//# sourceMappingURL=jstty.resume.controller.js.map