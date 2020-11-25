import _ from 'lodash';
import { Logger } from '@nestjs/common';
import JsttyDataStore from '../datastore/jstty.datastore';

export class JsttyModel {
    private readonly logger = new Logger(JsttyModel.name);
    private jsttyDB;

    constructor() {
        this.jsttyDB = new JsttyDataStore(this.logger);
        this.jsttyDB.$init();
    }

    async getShowcaseCV() {
        return await this.jsttyDB.getShowcaseCV();
    }

    async getFullCV() {
        return await this.jsttyDB.getFullCV();
    }

    async getProjectsAll() {
        let projects = await this.jsttyDB.getProjects();
        
        var output = {
            total: 0,
            offset: 0,
            limit: 100,
            items: []
        };

        _.forEach(projects, function(company){

            _.forEach(company.Projects, function(p){
                var project = {
                    companyName: company.Company,
                    companyLink: company.Link,
                    title:       p.Title,
                    description: p.Description || p.Title,
                    version:     p.Version,
                    labels:      p.Labels,
                    links:       null
                };

                if(p.links && _.isArray(p.links)) {
                    project.links = p.links;
                }

                output.items.push(project);
            });

        });

        output.total = output.items.length;
            
        
        return output;
    }

    async getProjectsShowcase() {
        let projects = await this.jsttyDB.getShowcaseProjects();

        var output = {
            total: 0,
            offset: 0,
            limit: 100,
            items: []
        };

        _.forEach(projects, function(company){

            _.forEach(company.Projects, function(p){
                var project = {
                    companyName: company.Company,
                    companyLink: company.Link,
                    title:       p.Title,
                    description: p.Description || p.Title,
                    version:     p.Version,
                    labels:      p.Labels,
                    links:       null
                };

                if(p.links && _.isArray(p.links)) {
                    project.links = p.links;
                }

                output.items.push(project);
            });

        });

        output.total = output.items.length;
        return output;
    }

}
