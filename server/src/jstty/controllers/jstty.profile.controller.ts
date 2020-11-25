import { 
    Controller, 
    Get, 
    Logger } from '@nestjs/common';
  import { JsttyModel } from '../model/jstty.model';
  
  @Controller()
  export class JsttyProfileController {
    private readonly logger = new Logger(JsttyProfileController.name);
  
    constructor(private readonly jsttyModel: JsttyModel) {
    }

    @Get('/api/projects')
    async projectsAll(): Promise<object> {
      // this.logger.log('projects all');

      return await this.jsttyModel.getProjectsAll();
    }

    
    @Get('/api/projects/showcase')
    async projectsShowcase(): Promise<object> {
      // this.logger.log('projects showcase');

      return await this.jsttyModel.getProjectsShowcase();
    }
  
}
