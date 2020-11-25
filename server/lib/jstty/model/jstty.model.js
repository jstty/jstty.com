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
exports.JsttyModel = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const jstty_datastore_1 = require("../datastore/jstty.datastore");
class JsttyModel {
    constructor() {
        this.logger = new common_1.Logger(JsttyModel.name);
        this.jsttyDB = new jstty_datastore_1.default(this.logger);
        this.jsttyDB.$init();
    }
    getShowcaseCV() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jsttyDB.getShowcaseCV();
        });
    }
    getFullCV() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jsttyDB.getFullCV();
        });
    }
    getProjectsAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let projects = yield this.jsttyDB.getProjects();
            var output = {
                total: 0,
                offset: 0,
                limit: 100,
                items: []
            };
            lodash_1.default.forEach(projects, function (company) {
                lodash_1.default.forEach(company.Projects, function (p) {
                    var project = {
                        companyName: company.Company,
                        companyLink: company.Link,
                        title: p.Title,
                        description: p.Description || p.Title,
                        version: p.Version,
                        labels: p.Labels,
                        links: null
                    };
                    if (p.links && lodash_1.default.isArray(p.links)) {
                        project.links = p.links;
                    }
                    output.items.push(project);
                });
            });
            output.total = output.items.length;
            return output;
        });
    }
    getProjectsShowcase() {
        return __awaiter(this, void 0, void 0, function* () {
            let projects = yield this.jsttyDB.getShowcaseProjects();
            var output = {
                total: 0,
                offset: 0,
                limit: 100,
                items: []
            };
            lodash_1.default.forEach(projects, function (company) {
                lodash_1.default.forEach(company.Projects, function (p) {
                    var project = {
                        companyName: company.Company,
                        companyLink: company.Link,
                        title: p.Title,
                        description: p.Description || p.Title,
                        version: p.Version,
                        labels: p.Labels,
                        links: null
                    };
                    if (p.links && lodash_1.default.isArray(p.links)) {
                        project.links = p.links;
                    }
                    output.items.push(project);
                });
            });
            output.total = output.items.length;
            return output;
        });
    }
}
exports.JsttyModel = JsttyModel;
//# sourceMappingURL=jstty.model.js.map