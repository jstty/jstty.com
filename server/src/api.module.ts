import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { AppController } from './app/app.controller';
import { JsttyResumeController } from './jstty/controllers/jstty.resume.controller';
import { JsttyProfileController } from './jstty/controllers/jstty.profile.controller';
import { PhotosController } from './photos/controllers/photos.controller';
import { JsttyModel } from './jstty/model/jstty.model';
import { PhotosModel } from './photos/model/photos.model';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
  ],
  controllers: [
    AppController,
    JsttyResumeController,
    JsttyProfileController,
    PhotosController
  ],
  providers: [
    JsttyModel,
    PhotosModel
  ],
})
export class ApiModule {}
