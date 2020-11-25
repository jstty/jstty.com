import { 
    Controller, 
    Get, 
    Logger } from '@nestjs/common';
  import { PhotosModel } from '../model/photos.model';
  
  @Controller()
  export class PhotosController {
    private readonly logger = new Logger(PhotosController.name);
  
    constructor(private readonly photoModel: PhotosModel) {
    }

    @Get('/api/photos')
    async all(): Promise<object> {
      this.logger.log('photos all');

      return await this.photoModel.getAll();
    }

    
    @Get('/api/photos/tree')
    async tree(): Promise<object> {
      this.logger.log('projects tree');

      return await this.photoModel.getTree();
    }

    @Get('/api/photos/tree/map')
    async treeMap(): Promise<object> {
      this.logger.log('projects showcase');

      return await this.photoModel.getTreeMap();
    }  
}
